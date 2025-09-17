import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Package, LayoutDashboard, PackagePlus, History, BarChart3, Users, LogOut, Menu, X } from "lucide-react";
const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };
  const navigation = [{
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  }, {
    name: "Equipment",
    href: "/equipment",
    icon: Package
  }, {
    name: "Add Equipment",
    href: "/add-equipment",
    icon: PackagePlus
  }, {
    name: "History",
    href: "/history",
    icon: History
  }, {
    name: "Reports",
    href: "/reports",
    icon: BarChart3
  }, {
    name: "Users",
    href: "/users",
    icon: Users
  }];
  const isActivePath = (path: string) => location.pathname === path;
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        {/* Government Header with Logos */}
        <div className="bg-white border-b border-border">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* County Government Logo - Left */}
              <div className="flex items-center">
                <img src="/src/assets/nyeri-county-logo.png" alt="County Government of Nyeri" className="w-16 h-16 object-contain" />
              </div>
              
              {/* Centered Headings */}
              <div className="text-center flex-1 mx-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">The County Government of Nyeri</h1>
                <h2 className="text-lg font-semibold text-gray-700 mb-1">Department of Public Service and Solid Waste Management</h2>
                <h3 className="text-base font-medium text-primary">Inventory Manager</h3>
              </div>
              
              {/* Kenya Coat of Arms - Right */}
              <div className="flex items-center">
                <img src="/src/assets/kenya-coat-of-arms.png" alt="Kenya National Government" className="w-16 h-16 object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Header */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden mr-2 py-[10px] px-[20px] mx-[10px] my-0">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            {/* User menu */}
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        AD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Admin User</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        admin@company.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map(item => {
            const Icon = item.icon;
            return <Button key={item.name} variant={isActivePath(item.href) ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => {
              navigate(item.href);
              setIsMobileMenuOpen(false);
            }}>
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>;
          })}
            </div>
          </div>}
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow bg-card border-r border-border pt-5 pb-4 overflow-y-auto">
              <div className="flex-grow flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  {navigation.map(item => {
                  const Icon = item.icon;
                  return <Button key={item.name} variant={isActivePath(item.href) ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => navigate(item.href)}>
                        <Icon className="mr-3 h-4 w-4" />
                        {item.name}
                      </Button>;
                })}
                </nav>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6 px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>;
};
export default Layout;