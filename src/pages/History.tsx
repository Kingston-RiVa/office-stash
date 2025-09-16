import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History as HistoryIcon, Package, User, Calendar } from "lucide-react";

const History = () => {
  const historyData = [
    {
      id: 1,
      action: "Equipment Added",
      item: "Dell OptiPlex 7090",
      user: "John Smith",
      date: "2024-01-15",
      time: "10:30 AM",
      details: "Added 5 units to inventory"
    },
    {
      id: 2,
      action: "Equipment Assigned",
      item: "MacBook Pro 16\"",
      user: "Sarah Johnson",
      date: "2024-01-14",
      time: "2:15 PM",
      details: "Assigned to Development Team"
    },
    {
      id: 3,
      action: "Maintenance Started",
      item: "HP LaserJet Pro 4025",
      user: "IT Team",
      date: "2024-01-13",
      time: "9:00 AM",
      details: "Routine maintenance scheduled"
    },
    {
      id: 4,
      action: "Equipment Returned",
      item: "Logitech Webcam",
      user: "Mike Davis",
      date: "2024-01-12",
      time: "4:45 PM",
      details: "Returned from conference room"
    }
  ];

  const getActionColor = (action: string) => {
    const colors = {
      "Equipment Added": "bg-success text-success-foreground",
      "Equipment Assigned": "bg-primary text-primary-foreground",
      "Maintenance Started": "bg-warning text-warning-foreground",
      "Equipment Returned": "bg-secondary text-secondary-foreground"
    };
    return colors[action as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Equipment History</h1>
        <p className="text-muted-foreground mt-2">
          Track all equipment movements, assignments, and maintenance activities
        </p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HistoryIcon className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {historyData.map((entry) => (
              <div key={entry.id} className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="flex-shrink-0">
                  <Badge className={getActionColor(entry.action)}>
                    {entry.action}
                  </Badge>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="font-medium">{entry.item}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{entry.details}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {entry.user}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {entry.date} at {entry.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;