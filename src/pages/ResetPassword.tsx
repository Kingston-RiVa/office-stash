import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Shield, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!token) {
      toast({
        title: "Invalid Link",
        description: "This password reset link is invalid or has expired.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [token, navigate, toast]);

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 10) strength += 25;
    if (password.length >= 12) strength += 10;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 20;
    return Math.min(strength, 100);
  };

  const passwordStrength = calculatePasswordStrength(newPassword);

  // Password validation rules
  const validations = {
    length: newPassword.length >= 10,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^a-zA-Z0-9]/.test(newPassword),
  };

  const allValid = Object.values(validations).every(v => v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!allValid) {
      toast({
        title: "Password Requirements Not Met",
        description: "Please ensure your password meets all the requirements.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure both passwords are identical.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke('reset-password', {
        body: { token, newPassword }
      });

      if (error) {
        toast({
          title: "Reset Failed",
          description: error.message || "Failed to reset password. The link may have expired.",
          variant: "destructive",
        });
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const ValidationItem = ({ valid, text }: { valid: boolean; text: string }) => (
    <div className="flex items-center gap-2 text-sm">
      {valid ? (
        <CheckCircle2 className="w-4 h-4 text-green-600" />
      ) : (
        <XCircle className="w-4 h-4 text-muted-foreground" />
      )}
      <span className={valid ? "text-green-600" : "text-muted-foreground"}>{text}</span>
    </div>
  );

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
                  {isSuccess ? "Password Reset Successful" : "Reset Password"}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  {isSuccess 
                    ? "Your password has been successfully reset. Redirecting to sign in..."
                    : "Enter your new password below."
                  }
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="h-11 pr-10"
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    
                    {newPassword && (
                      <div className="space-y-2 mt-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Password Strength:</span>
                          <span className={
                            passwordStrength < 40 ? "text-red-600" :
                            passwordStrength < 70 ? "text-yellow-600" :
                            "text-green-600"
                          }>
                            {passwordStrength < 40 ? "Weak" :
                             passwordStrength < 70 ? "Medium" :
                             "Strong"}
                          </span>
                        </div>
                        <Progress value={passwordStrength} className="h-2" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-11"
                      disabled={isLoading}
                    />
                  </div>

                  {newPassword && (
                    <div className="bg-muted p-3 rounded-lg space-y-2">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Password Requirements:</p>
                      <ValidationItem valid={validations.length} text="At least 10 characters" />
                      <ValidationItem valid={validations.uppercase} text="One uppercase letter" />
                      <ValidationItem valid={validations.lowercase} text="One lowercase letter" />
                      <ValidationItem valid={validations.number} text="One number" />
                      <ValidationItem valid={validations.special} text="One special character" />
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-primary hover:bg-primary-hover"
                    disabled={isLoading || !allValid}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    {isLoading ? "Resetting..." : "Set New Password"}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You will be redirected to the sign in page shortly...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
