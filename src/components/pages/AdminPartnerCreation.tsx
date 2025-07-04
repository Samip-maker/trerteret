
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle,
  ArrowLeft,
  CreditCard,
  Shield
} from "lucide-react";

const AdminPartnerCreation = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    businessType: "",
    businessDescription: "",
    documents: "",
    bankDetails: "",
    gstNumber: "",
    establishedYear: "",
    website: "",
    socialMedia: ""
  });

  const steps = [
    { id: 1, title: "Business Info", icon: Building },
    { id: 2, title: "Contact Details", icon: User },
    { id: 3, title: "Legal & Financial", icon: FileText },
    { id: 4, title: "Review & Create", icon: CheckCircle }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Validation
    if (!formData.businessName || !formData.contactPerson || !formData.email || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Creating new partner:", formData);
      
      toast({
        title: "Success!",
        description: "Partner account created successfully! Login credentials have been sent via email.",
      });

      // Reset form
      setFormData({
        businessName: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        businessType: "",
        businessDescription: "",
        documents: "",
        bankDetails: "",
        gstNumber: "",
        establishedYear: "",
        website: "",
        socialMedia: ""
      });
      setCurrentStep(1);
      setIsLoading(false);
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  placeholder="Enter business name"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tour-operator">Tour Operator</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="homestay">Homestay</SelectItem>
                    <SelectItem value="lodge">Lodge</SelectItem>
                    <SelectItem value="transport">Transport Service</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="establishedYear">Established Year</Label>
                <Input
                  id="establishedYear"
                  placeholder="e.g., 2020"
                  value={formData.establishedYear}
                  onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="businessDescription">Business Description</Label>
              <Textarea
                id="businessDescription"
                placeholder="Describe the business and services offered"
                value={formData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Textarea
                id="address"
                placeholder="Enter complete business address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  placeholder="Primary contact person name"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="business@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="socialMedia">Social Media</Label>
                <Input
                  id="socialMedia"
                  placeholder="Facebook/Instagram handles"
                  value={formData.socialMedia}
                  onChange={(e) => handleInputChange('socialMedia', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="gstNumber">GST Number</Label>
              <Input
                id="gstNumber"
                placeholder="GST Registration Number"
                value={formData.gstNumber}
                onChange={(e) => handleInputChange('gstNumber', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="documents">Required Documents</Label>
              <Textarea
                id="documents"
                placeholder="List of documents submitted (e.g., Business License, PAN Card, Aadhar Card, etc.)"
                value={formData.documents}
                onChange={(e) => handleInputChange('documents', e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bankDetails">Bank Account Details</Label>
              <Textarea
                id="bankDetails"
                placeholder="Bank name, account number, IFSC code, account holder name"
                value={formData.bankDetails}
                onChange={(e) => handleInputChange('bankDetails', e.target.value)}
                rows={4}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-blue-800 dark:text-blue-200">Review Partner Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Business Name:</span>
                  <p className="text-gray-900 dark:text-white">{formData.businessName || "Not provided"}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Business Type:</span>
                  <p className="text-gray-900 dark:text-white">{formData.businessType || "Not provided"}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Contact Person:</span>
                  <p className="text-gray-900 dark:text-white">{formData.contactPerson || "Not provided"}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Email:</span>
                  <p className="text-gray-900 dark:text-white">{formData.email || "Not provided"}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Phone:</span>
                  <p className="text-gray-900 dark:text-white">{formData.phone || "Not provided"}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">GST Number:</span>
                  <p className="text-gray-900 dark:text-white">{formData.gstNumber || "Not provided"}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">What happens next?</h4>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Partner account will be created with the provided details</li>
                <li>• Login credentials will be sent to the provided email address</li>
                <li>• Partner can complete their profile and start adding services</li>
                <li>• Account will be marked as "Pending Verification" until documents are reviewed</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Partner</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Add a new travel partner to Sikkim Trails</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-green-600 border-green-600 text-white' 
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    Step {step.id}
                  </p>
                  <p className={`text-xs ${
                    currentStep >= step.id ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`ml-8 mr-8 flex-1 h-0.5 ${
                    currentStep > step.id ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {currentStep === 1 && <Building className="h-5 w-5 mr-2" />}
              {currentStep === 2 && <User className="h-5 w-5 mr-2" />}
              {currentStep === 3 && <Shield className="h-5 w-5 mr-2" />}
              {currentStep === 4 && <CheckCircle className="h-5 w-5 mr-2" />}
              {steps.find(s => s.id === currentStep)?.title}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Basic information about the travel business"}
              {currentStep === 2 && "Contact details of the business owner"}
              {currentStep === 3 && "Legal documents and financial information"}
              {currentStep === 4 && "Review all information before creating the account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Create Partner Account
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPartnerCreation;
