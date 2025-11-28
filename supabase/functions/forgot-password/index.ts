import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In-memory rate limiting (per IP)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  
  // Remove old requests outside the window
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

function generateSecureToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIp = req.headers.get("x-forwarded-for") || "unknown";
    
    // Rate limiting
    if (!checkRateLimit(clientIp)) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ message: "If an account exists, we've sent a reset link. Check your email." }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { emailOrUsername } = await req.json();
    
    if (!emailOrUsername || !emailOrUsername.trim()) {
      return new Response(
        JSON.stringify({ message: "If an account exists, we've sent a reset link. Check your email." }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find user by email or username
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, email, username, full_name')
      .or(`email.eq.${emailOrUsername.trim()},username.eq.${emailOrUsername.trim()}`)
      .maybeSingle();

    if (!profile || profileError) {
      console.log(`No user found for: ${emailOrUsername}`);
      // Return success anyway to prevent user enumeration
      return new Response(
        JSON.stringify({ message: "If an account exists, we've sent a reset link. Check your email." }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate secure token
    const token = generateSecureToken();
    const tokenHash = await hashToken(token);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store token in database
    const { error: insertError } = await supabase
      .from('password_reset_tokens')
      .insert({
        user_id: profile.id,
        token_hash: tokenHash,
        expires_at: expiresAt.toISOString(),
        request_ip: clientIp,
      });

    if (insertError) {
      console.error('Error storing reset token:', insertError);
      throw new Error('Failed to create reset token');
    }

    // Create reset link
    const resetUrl = `${Deno.env.get("SUPABASE_URL")?.replace('//', '//').split('/')[2]}`;
    const resetLink = `https://${resetUrl}/reset-password?token=${token}`;

    // Send email
    const emailResponse = await resend.emails.send({
      from: "Inventory Manager <onboarding@resend.dev>",
      to: [profile.email],
      subject: "Inventory Manager — Password Reset Request",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #0066cc; }
            .content { padding: 30px 0; }
            .button { display: inline-block; padding: 12px 30px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { padding: 20px 0; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>County Government of Nyeri</h2>
              <p>Department of Solid Waste Management</p>
            </div>
            
            <div class="content">
              <p>Hello${profile.full_name ? ` ${profile.full_name}` : ''},</p>
              
              <p>We received a request to reset the password for your Inventory Manager account.</p>
              
              <p>Click the button below to reset your password. This link expires in <strong>1 hour</strong>.</p>
              
              <p style="text-align: center;">
                <a href="${resetLink}" class="button">Reset Password</a>
              </p>
              
              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #0066cc;">${resetLink}</p>
              
              <p><strong>If you did not request a password reset</strong>, please ignore this message or contact support at <a href="mailto:support@nyeri.go.ke">support@nyeri.go.ke</a>.</p>
            </div>
            
            <div class="footer">
              <p>Regards,<br>
              Inventory Manager<br>
              County Government of Nyeri</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Password reset email sent:", emailResponse);

    return new Response(
      JSON.stringify({ message: "If an account exists, we've sent a reset link. Check your email." }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in forgot-password function:", error);
    return new Response(
      JSON.stringify({ message: "If an account exists, we've sent a reset link. Check your email." }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
