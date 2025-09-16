import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, FileText, PieChart } from "lucide-react";

const Reports = () => {
  const reports = [
    {
      title: "Equipment Inventory Report",
      description: "Complete list of all equipment with current status and locations",
      icon: FileText,
      lastGenerated: "2024-01-15"
    },
    {
      title: "Low Stock Alert Report",
      description: "Items that are running low and need restocking",
      icon: BarChart3,
      lastGenerated: "2024-01-14"
    },
    {
      title: "Equipment Assignment Report",
      description: "Overview of equipment assignments by department and user",
      icon: PieChart,
      lastGenerated: "2024-01-13"
    },
    {
      title: "Maintenance Schedule Report",
      description: "Upcoming and overdue maintenance tasks",
      icon: BarChart3,
      lastGenerated: "2024-01-12"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground mt-2">
          Generate and export various inventory reports
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reports.map((report, index) => (
          <Card key={index} className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <report.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Last generated: {report.lastGenerated}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{report.description}</p>
              <div className="flex gap-2">
                <Button className="bg-gradient-primary hover:bg-primary-hover">
                  Generate Report
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;