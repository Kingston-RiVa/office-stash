import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Shield, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { loginSchema, signupSchema } from "@/lib/validations";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    signIn,
    signUp,
    user
  } = useAuth();
  const {
    toast
  } = useToast();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignUp) {
        const validation = signupSchema.safeParse({
          email,
          password,
          fullName: username
        });
        if (!validation.success) {
          toast({
            title: "Validation Error",
            description: validation.error.errors[0].message,
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
        const {
          error
        } = await signUp(email, password, username);
        if (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Account Created",
            description: "Welcome! Redirecting to dashboard..."
          });
        }
      } else {
        const validation = loginSchema.safeParse({
          email,
          password
        });
        if (!validation.success) {
          toast({
            title: "Validation Error",
            description: validation.error.errors[0].message,
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
        const {
          error
        } = await signIn(email, password);
        if (error) {
          toast({
            title: "Sign In Failed",
            description: error.message,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-gradient-subtle flex flex-col">
      {/* Government Header with Logos */}
      <div className="bg-white border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 min-h-[120px]">
            {/* County Government Logo - Left */}
            <div className="flex items-center mb-4 sm:mb-0">
              <img alt="County Government of Nyeri" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" src="/lovable-uploads/0e421e84-b65b-43cc-8cd0-d1345080202f.png" />
            </div>
            
            {/* Centered Headings */}
            <div className="text-center flex-1 mx-4 sm:mx-8 mb-4 sm:mb-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">The County Government of Nyeri</h1>
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-700 mb-3">Department of Solid Waste Management</h2>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">Inventory Manager</h3>
            </div>
            
            {/* Kenya Coat of Arms - Right */}
            <div className="flex flex-col items-center space-y-3">
              <img alt="Kenya National Government" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" src="/lovable-uploads/443cb1e7-66e2-4f3e-979d-11aad3c1e1c2.png" />
            </div>
          </div>
        </div>
      </div>

      {/* Login Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-elevated border-0">
            <CardHeader className="text-center space-y-4">
              <div>
                <CardTitle className="text-2xl mx-[20px] px-[20px] font-bold">
                  {isSignUp ? "Create Account" : "Sign In"}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  {isSignUp ? "Create your account to access the system" : "Sign in to manage your office equipment and inventory"}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && <div className="space-y-2">
                    <Label htmlFor="username">Username (Optional)</Label>
                    <Input id="username" type="text" placeholder="Choose a username" value={username} onChange={e => setUsername(e.target.value)} className="h-11" disabled={isLoading} />
                  </div>}

                <div className="space-y-2">
                  <Label htmlFor="email">{isSignUp ? "Email" : "Email or Username"}</Label>
                  <Input id="email" type="text" placeholder={isSignUp ? "Enter your email" : "Enter your email or username"} value={email} onChange={e => setEmail(e.target.value)} required className="h-11" disabled={isLoading} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="h-11 pr-10" disabled={isLoading} />
                    <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)} disabled={isLoading}>
                      {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                    </Button>
                  </div>
                  {!isSignUp && <div className="text-right">
                      <Button type="button" variant="link" className="text-sm text-primary hover:underline p-0 h-auto min-h-[44px]" onClick={() => navigate("/forgot-password")}>
                        Forgot password?
                      </Button>
                    </div>}
                </div>

                <Button type="submit" className="w-full h-11 bg-gradient-primary hover:bg-primary-hover" disabled={isLoading}>
                  <Shield className="w-4 h-4 mr-2" />
                  {isLoading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <Button type="button" variant="link" onClick={() => setIsSignUp(!isSignUp)} className="text-primary hover:underline" disabled={isLoading}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default Login;