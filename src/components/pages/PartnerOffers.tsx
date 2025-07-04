
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Percent,
  Gift,
  Clock,
  Users
} from "lucide-react";

interface Offer {
  id: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  validFrom: string;
  validUntil: string;
  maxBookings: number;
  currentBookings: number;
  isActive: boolean;
  category: string;
}

const PartnerOffers = () => {
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: "1",
      title: "Early Bird Special",
      description: "Book 30 days in advance and save 20% on your stay",
      discountType: "percentage",
      discountValue: 20,
      validFrom: "2024-01-01",
      validUntil: "2024-12-31",
      maxBookings: 50,
      currentBookings: 23,
      isActive: true,
      category: "accommodation"
    },
    {
      id: "2",
      title: "Weekend Getaway",
      description: "Special weekend package with complimentary meals",
      discountType: "fixed",
      discountValue: 500,
      validFrom: "2024-01-01",
      validUntil: "2024-06-30",
      maxBookings: 25,
      currentBookings: 18,
      isActive: true,
      category: "package"
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    validFrom: "",
    validUntil: "",
    maxBookings: "",
    category: "accommodation"
  });

  const handleCreateOffer = () => {
    if (!formData.title || !formData.description || !formData.discountValue) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newOffer: Offer = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      discountType: formData.discountType as "percentage" | "fixed",
      discountValue: Number(formData.discountValue),
      validFrom: formData.validFrom,
      validUntil: formData.validUntil,
      maxBookings: Number(formData.maxBookings) || 100,
      currentBookings: 0,
      isActive: true,
      category: formData.category
    };

    setOffers([...offers, newOffer]);
    setFormData({
      title: "",
      description: "",
      discountType: "percentage",
      discountValue: "",
      validFrom: "",
      validUntil: "",
      maxBookings: "",
      category: "accommodation"
    });
    setShowCreateForm(false);

    toast({
      title: "Offer Created",
      description: "Your new offer has been created successfully.",
    });
  };

  const toggleOfferStatus = (id: string) => {
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
    ));
    
    toast({
      title: "Offer Updated",
      description: "Offer status has been updated.",
    });
  };

  const deleteOffer = (id: string) => {
    setOffers(offers.filter(offer => offer.id !== id));
    toast({
      title: "Offer Deleted",
      description: "The offer has been deleted successfully.",
    });
  };

  const getDiscountText = (offer: Offer) => {
    return offer.discountType === "percentage" 
      ? `${offer.discountValue}% OFF` 
      : `₹${offer.discountValue} OFF`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "accommodation": return "bg-blue-100 text-blue-800 border-blue-200";
      case "package": return "bg-green-100 text-green-800 border-green-200";
      case "transport": return "bg-purple-100 text-purple-800 border-purple-200";
      case "food": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Manage Offers</h1>
            <p className="text-gray-600 dark:text-gray-400">Create and manage special offers for your customers</p>
          </div>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Offer
          </Button>
        </div>

        {/* Create Offer Form */}
        {showCreateForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="h-5 w-5 mr-2" />
                Create New Offer
              </CardTitle>
              <CardDescription>Fill in the details to create a new special offer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Offer Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Summer Special Discount"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accommodation">Accommodation</SelectItem>
                      <SelectItem value="package">Tour Package</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="food">Food & Dining</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your offer in detail..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="discountType">Discount Type</Label>
                  <Select
                    value={formData.discountType}
                    onValueChange={(value) => setFormData({ ...formData, discountType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountValue">Discount Value *</Label>
                  <Input
                    id="discountValue"
                    type="number"
                    placeholder={formData.discountType === "percentage" ? "20" : "500"}
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxBookings">Max Bookings</Label>
                  <Input
                    id="maxBookings"
                    type="number"
                    placeholder="100"
                    value={formData.maxBookings}
                    onChange={(e) => setFormData({ ...formData, maxBookings: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="validFrom">Valid From</Label>
                  <Input
                    id="validFrom"
                    type="date"
                    value={formData.validFrom}
                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateOffer} className="bg-green-600 hover:bg-green-700">
                  Create Offer
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Offers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Card key={offer.id} className={`relative ${!offer.isActive ? 'opacity-60' : ''}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Badge className={getCategoryColor(offer.category)}>
                      {offer.category}
                    </Badge>
                    <CardTitle className="text-lg">{offer.title}</CardTitle>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleOfferStatus(offer.id)}
                      title={offer.isActive ? "Deactivate" : "Activate"}
                    >
                      {offer.isActive ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteOffer(offer.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {getDiscountText(offer)}
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {offer.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Valid: {offer.validFrom} to {offer.validUntil}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Bookings: {offer.currentBookings}/{offer.maxBookings}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <Badge variant={offer.isActive ? "default" : "secondary"}>
                    {offer.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {offers.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Gift className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No offers yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Create your first special offer to attract more customers
              </p>
              <Button onClick={() => setShowCreateForm(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Offer
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PartnerOffers;
