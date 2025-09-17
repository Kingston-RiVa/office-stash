import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const Equipment = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const equipmentData = [
    {
      id: "EQ001",
      name: "Dell OptiPlex 7090 Desktop Computer",
      category: "Desktop Computer",
      quantity: 15,
      condition: "Good"
    },
    {
      id: "EQ002", 
      name: "HP LaserJet Pro 4025 Printer",
      category: "Printer",
      quantity: 3,
      condition: "Excellent"
    },
    {
      id: "EQ003",
      name: "Samsung 32\" LED Monitor",
      category: "Monitor",
      quantity: 25,
      condition: "Good"
    },
    {
      id: "EQ004",
      name: "HP EliteBook 840 G8 Laptop",
      category: "Laptop",
      quantity: 8,
      condition: "Excellent"
    },
    {
      id: "EQ005",
      name: "Executive Office Desk (Wooden)",
      category: "Office Furniture",
      quantity: 12,
      condition: "Good"
    },
    {
      id: "EQ006",
      name: "Ergonomic Office Chair",
      category: "Office Furniture",
      quantity: 20,
      condition: "Good"
    },
    {
      id: "EQ007",
      name: "Canon imageCLASS MF445dw",
      category: "Multifunction Printer",
      quantity: 2,
      condition: "Excellent"
    },
    {
      id: "EQ008",
      name: "Dell OptiPlex 3080 Mini PC",
      category: "Mini PC",
      quantity: 10,
      condition: "Good"
    },
    {
      id: "EQ009",
      name: "Microsoft Surface Pro 8",
      category: "Tablet",
      quantity: 5,
      condition: "Excellent"
    },
    {
      id: "EQ010",
      name: "Filing Cabinet (4-Drawer)",
      category: "Storage Furniture",
      quantity: 8,
      condition: "Good"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      "in repair": "destructive", 
      retired: "secondary"
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants] || "default"}>{status}</Badge>;
  };

  const getConditionColor = (condition: string) => {
    const colors = {
      Excellent: "text-success",
      Good: "text-primary",
      Fair: "text-warning",
      Poor: "text-destructive"
    };
    return colors[condition as keyof typeof colors] || "text-muted-foreground";
  };

  const filteredEquipment = equipmentData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Equipment Inventory</h1>
          <p className="text-muted-foreground mt-2">
            Manage all your office equipment and assets
          </p>
        </div>
        <Button 
          onClick={() => navigate("/add-equipment")}
          className="bg-gradient-primary hover:bg-primary-hover"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Equipment
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search equipment by name, category, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Equipment Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Equipment List ({filteredEquipment.length} items)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.quantity}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={getConditionColor(item.condition)}>
                        {item.condition}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Equipment;