import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle, Users, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Equipment",
      value: "342",
      change: "+12%",
      icon: Package,
      color: "text-primary"
    },
    {
      title: "Low Stock Alerts",
      value: "8",
      change: "-3 from last week",
      icon: AlertTriangle,
      color: "text-warning"
    },
    {
      title: "Active Users",
      value: "24",
      change: "+2 this month",
      icon: Users,
      color: "text-success"
    },
    {
      title: "Equipment Value",
      value: "$45,230",
      change: "+5.2%",
      icon: TrendingUp,
      color: "text-primary"
    }
  ];

  const lowStockItems = [
    { name: "HP LaserJet Toner", current: 2, minimum: 5, category: "Printing" },
    { name: "Wireless Mouse", current: 3, minimum: 8, category: "Peripherals" },
    { name: "HDMI Cables", current: 1, minimum: 4, category: "Cables" },
    { name: "USB-C Adapters", current: 2, minimum: 6, category: "Adapters" }
  ];

  const recentActivity = [
    { action: "Added", item: "Dell Monitor 27\"", user: "John Smith", time: "2 hours ago" },
    { action: "Assigned", item: "MacBook Pro", user: "Sarah Johnson", time: "4 hours ago" },
    { action: "Returned", item: "Logitech Webcam", user: "Mike Davis", time: "6 hours ago" },
    { action: "Maintenance", item: "Conference Phone", user: "IT Team", time: "1 day ago" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your inventory management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Low Stock Alerts */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription>
              Items that need restocking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    {item.current}/{item.minimum}
                  </Badge>
                </div>
                <Progress 
                  value={(item.current / item.minimum) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest equipment movements and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    <span className="text-primary">{activity.action}</span> {activity.item}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    by {activity.user}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;