import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Shield, Eye, EyeOff, UserPlus } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would use Supabase authentication
    if (email && password) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      {/* Government Header with Logos */}
      <div className="bg-white border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 min-h-[120px]">
            {/* County Government Logo - Left */}
            <div className="flex items-center mb-4 sm:mb-0">
              <img src="/src/assets/nyeri-county-logo.png" alt="County Government of Nyeri" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
            </div>
            
            {/* Centered Headings */}
            <div className="text-center flex-1 mx-4 sm:mx-8 mb-4 sm:mb-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">The County Government of Nyeri</h1>
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-700 mb-3">Department of Public Service and Solid Waste Management</h2>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">Inventory Manager</h3>
            </div>
            
            {/* Kenya Coat of Arms and Button - Right */}
            <div className="flex flex-col items-center space-y-3">
              <img src="/src/assets/kenya-coat-of-arms.png" alt="Kenya National Government" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://www.kenya.go.ke', '_blank')}
                className="text-xs px-3 py-1 border-gray-400 hover:bg-gray-50"
              >
                Visit Portal
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-elevated border-0">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <Package className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">
                  {isSignUp ? "Create Account" : "Sign In"}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  {isSignUp ? "Create your account to access the system" : "Sign in to manage your office equipment and inventory"}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 bg-gradient-primary hover:bg-primary-hover">
                  <Shield className="w-4 h-4 mr-2" />
                  {isSignUp ? "Create Account" : "Sign In"}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary hover:underline"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </Button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Demo credentials: any email and password
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;