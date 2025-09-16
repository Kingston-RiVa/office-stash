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
      name: "Dell OptiPlex 7090",
      category: "Computer",
      serialNumber: "DL789012345",
      quantity: 15,
      condition: "Good",
      location: "Office Floor 2",
      assignedTo: "IT Department",
      status: "active"
    },
    {
      id: "EQ002", 
      name: "HP LaserJet Pro 4025",
      category: "Printer",
      serialNumber: "HP456789123",
      quantity: 3,
      condition: "Excellent",
      location: "Office Floor 1", 
      assignedTo: "Admin",
      status: "active"
    },
    {
      id: "EQ003",
      name: "Samsung 32\" Monitor",
      category: "Monitor",
      serialNumber: "SM987654321",
      quantity: 25,
      condition: "Good",
      location: "Storage Room A",
      assignedTo: "Unassigned",
      status: "active"
    },
    {
      id: "EQ004",
      name: "MacBook Pro 16\"",
      category: "Laptop",
      serialNumber: "AP123456789",
      quantity: 8,
      condition: "Excellent",
      location: "IT Office",
      assignedTo: "Development Team",
      status: "active"
    },
    {
      id: "EQ005",
      name: "Cisco IP Phone",
      category: "Communication",
      serialNumber: "CS456123789",
      quantity: 2,
      condition: "Poor",
      location: "Office Floor 3",
      assignedTo: "Sales Department",
      status: "in repair"
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
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
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
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="font-mono text-sm">{item.serialNumber}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.quantity}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={getConditionColor(item.condition)}>
                        {item.condition}
                      </span>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.assignedTo}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
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