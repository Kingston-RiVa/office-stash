import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users as UsersIcon, Plus, Edit, Trash2, Shield, User } from "lucide-react";

const Users = () => {
  const users = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@company.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15",
      initials: "AU"
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@company.com", 
      role: "staff",
      status: "active",
      lastLogin: "2024-01-14",
      initials: "JS"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "staff", 
      status: "active",
      lastLogin: "2024-01-13",
      initials: "SJ"
    },
    {
      id: 4,
      name: "Mike Davis",
      email: "mike.davis@company.com",
      role: "viewer",
      status: "inactive",
      lastLogin: "2024-01-10",
      initials: "MD"
    }
  ];

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: "destructive",
      staff: "default", 
      viewer: "secondary"
    } as const;
    
    return <Badge variant={variants[role as keyof typeof variants]}>{role}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "active" ? "default" : "secondary"}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage system users and their access permissions
          </p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-primary" />
            System Users ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Last login: {user.lastLogin}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    {getRoleBadge(user.role)}
                    {getStatusBadge(user.status)}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    {user.role !== "admin" && (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Role Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium text-destructive">Admin</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Full system access</li>
                <li>• User management</li>
                <li>• Equipment management</li>
                <li>• Reports generation</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-primary">Staff</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Equipment management</li>
                <li>• Add/edit equipment</li>
                <li>• View reports</li>
                <li>• History tracking</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-muted-foreground">Viewer</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• View equipment only</li>
                <li>• Basic reports</li>
                <li>• No editing permissions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;