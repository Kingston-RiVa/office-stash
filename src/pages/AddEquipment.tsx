import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const AddEquipment = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    serialNumber: "",
    quantity: "",
    condition: "",
    location: "",
    assignedTo: "",
    description: "",
    purchaseDate: "",
    purchasePrice: "",
    warranty: ""
  });
  const categories = ["Computer", "Laptop", "Monitor", "Printer", "Scanner", "Projector", "Communication", "Furniture", "Network Equipment", "Other"];
  const conditions = ["Excellent", "Good", "Fair", "Poor"];
  const locations = ["Office Floor 1", "Office Floor 2", "Office Floor 3", "Storage Room A", "Storage Room B", "IT Office", "Conference Room"];
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.category || !formData.quantity) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would save to database via Supabase
    console.log("Equipment data:", formData);
    toast({
      title: "Equipment Added",
      description: `${formData.name} has been successfully added to inventory.`
    });
    navigate("/equipment");
  };
  return <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/equipment")} className="hover:bg-muted">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Equipment
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Equipment</h1>
          <p className="text-muted-foreground mt-2">
            Add a new item to your inventory system
          </p>
        </div>
      </div>

      <Card className="shadow-card max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Equipment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Equipment Name *</Label>
                  <Input id="name" placeholder="e.g., Dell OptiPlex 7090" value={formData.name} onChange={e => handleInputChange("name", e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={value => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => <SelectItem key={category} value={category}>{category}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input id="quantity" type="number" min="1" placeholder="1" value={formData.quantity} onChange={e => handleInputChange("quantity", e.target.value)} required />
                </div>
              </div>

              {/* Location and Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Location & Status</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select value={formData.condition} onValueChange={value => handleInputChange("condition", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map(condition => <SelectItem key={condition} value={condition}>{condition}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                

                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Issued To</Label>
                  <Input id="assignedTo" placeholder="e.g., IT Department" value={formData.assignedTo} onChange={e => handleInputChange("assignedTo", e.target.value)} />
                </div>

                
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Additional Information</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                

                
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Additional notes about this equipment..." value={formData.description} onChange={e => handleInputChange("description", e.target.value)} rows={3} />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-gradient-primary hover:bg-primary-hover">
                <Save className="w-4 h-4 mr-2" />
                Add Equipment
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/equipment")}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>;
};
export default AddEquipment;