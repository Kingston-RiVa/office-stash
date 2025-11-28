import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ForgotPassword = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke('forgot-password', {
        body: { emailOrUsername: emailOrUsername.trim() }
      });

      if (error) {
        console.error('Forgot password error:', error);
      }

      // Always show success message (avoid user enumeration)
      setIsSubmitted(true);
    } catch (error) {
      console.error('Unexpected error:', error);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      {/* Government Header */}
      <div className="bg-white border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 min-h-[120px]">
            <div className="flex items-center mb-4 sm:mb-0">
              <img src="/src/assets/nyeri-county-logo.png" alt="County Government of Nyeri" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
            </div>
            
            <div className="text-center flex-1 mx-4 sm:mx-8 mb-4 sm:mb-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">The County Government of Nyeri</h1>
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-700 mb-3">Department of Solid Waste Management</h2>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">Inventory Manager</h3>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <img src="/src/assets/kenya-coat-of-arms.png" alt="Kenya National Government" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-elevated border-0">
            <CardHeader className="text-center space-y-4">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {isSubmitted ? "Check Your Email" : "Forgot Your Password?"}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  {isSubmitted 
                    ? "If an account exists, we've sent a password reset link to the registered email address."
                    : "Enter your email or username and we'll send you a link to reset your password."
                  }
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="emailOrUsername">Email or Username</Label>
                    <Input
                      id="emailOrUsername"
                      type="text"
                      placeholder="Enter your email or username"
                      value={emailOrUsername}
                      onChange={(e) => setEmailOrUsername(e.target.value)}
                      required
                      className="h-11"
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-primary hover:bg-primary-hover"
                    disabled={isLoading}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Check your email inbox and click the link to reset your password. 
                      The link will expire in 1 hour.
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Didn't receive an email? Check your spam folder or contact support at{" "}
                    <a href="mailto:support@nyeri.go.ke" className="text-primary hover:underline">
                      support@nyeri.go.ke
                    </a>
                  </p>
                </div>
              )}
              
              <div className="mt-6 text-center">
                <Link to="/">
                  <Button
                    type="button"
                    variant="link"
                    className="text-primary hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
