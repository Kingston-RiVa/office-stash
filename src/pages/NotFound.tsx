import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Package } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="shadow-elevated border-0 max-w-md w-full">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
            <Package className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-4xl font-bold">404</CardTitle>
            <p className="text-muted-foreground mt-2">
              Oops! The page you're looking for doesn't exist.
            </p>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={() => navigate("/")}
            className="bg-gradient-primary hover:bg-primary-hover"
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
