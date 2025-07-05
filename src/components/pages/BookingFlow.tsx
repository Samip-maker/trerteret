
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import {
  Calendar,
  Users,
  CreditCard,
  Shield,
  CheckCircle,
  ArrowLeft,
  MapPin,
  Star
} from "lucide-react";

const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    packageId: 1,
    checkIn: "",
    checkOut: "",
    guests: 2,
    roomType: "",
    specialRequests: "",
    contactInfo: {
      name: "",
      email: "",
      phone: ""
    },
    paymentMethod: ""
  });

  const packageDetails = {
    id: 1,
    title: "Gangtok & Tsomgo Lake Adventure",
    description: "Explore Sikkim's capital and the sacred high-altitude lake",
    price: 12999,
    duration: "4 days 3 nights",
    rating: 4.8,
    reviews: 156,
    image: "photo-1472396961693-142e6e269027",
    location: "Gangtok, East Sikkim",
    includes: ["Accommodation", "Meals", "Transportation", "Guide"]
  };

  const steps = [
    { id: 1, title: "Select Dates", icon: Calendar },
    { id: 2, title: "Guest Details", icon: Users },
    { id: 3, title: "Payment", icon: CreditCard },
    { id: 4, title: "Confirmation", icon: CheckCircle }
  ];

  const handleInputChange = (field: string, value: string | number) => {
    if (field.startsWith('contactInfo.')) {
      const contactField = field.split('.')[1];
      setBookingData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [contactField]: value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Select Your Travel Dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="checkin">Check-in Date</Label>
                <Input
                  id="checkin"
                  type="date"
                  value={bookingData.checkIn}
                  onChange={(e) => handleInputChange('checkIn', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkout">Check-out Date</Label>
                <Input
                  id="checkout"
                  type="date"
                  value={bookingData.checkOut}
                  onChange={(e) => handleInputChange('checkOut', e.target.value)}
                  min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Select value={bookingData.guests.toString()} onValueChange={(value) => handleInputChange('guests', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num} Guest{num > 1 ? 's' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomtype">Room Type</Label>
              <Select value={bookingData.roomType} onValueChange={(value) => handleInputChange('roomType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Room</SelectItem>
                  <SelectItem value="deluxe">Deluxe Room</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="requests">Special Requests (Optional)</Label>
              <Textarea
                id="requests"
                placeholder="Any special requirements or requests..."
                value={bookingData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Guest Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={bookingData.contactInfo.name}
                  onChange={(e) => handleInputChange('contactInfo.name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={bookingData.contactInfo.email}
                  onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={bookingData.contactInfo.phone}
                  onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                />
              </div>
            </div>
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Important Information</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Please ensure all details are accurate. A valid ID will be required during check-in.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Payment Details</h2>
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Package Price ({bookingData.guests} guests)</span>
                    <span>₹{(packageDetails.price * bookingData.guests).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Charges</span>
                    <span>₹500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>₹1,500</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-green-600">₹{((packageDetails.price * bookingData.guests) + 500 + 1500).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payment Method</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="card" />
                  <Label htmlFor="card">Credit/Debit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="upi" />
                  <Label htmlFor="upi">UPI</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="netbanking" />
                  <Label htmlFor="netbanking">Net Banking</Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Booking Confirmed!</h2>
            <p className="text-gray-600">
              Your booking has been successfully confirmed. You will receive a confirmation email shortly.
            </p>
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-lg">Booking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Booking ID:</span>
                    <span className="font-medium">BK{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Package:</span>
                    <span className="font-medium">{packageDetails.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dates:</span>
                    <span className="font-medium">{bookingData.checkIn} to {bookingData.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span className="font-medium">{bookingData.guests}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button className="bg-green-600 hover:bg-green-700">
              View Booking Details
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-6">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        currentStep >= step.id 
                          ? 'bg-green-600 border-green-600 text-white' 
                          : 'border-gray-300 text-gray-500'
                      }`}>
                        <step.icon className="h-5 w-5" />
                      </div>
                      <span className={`ml-2 text-sm font-medium ${
                        currentStep >= step.id ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </span>
                      {index < steps.length - 1 && (
                        <div className={`w-20 h-0.5 mx-4 ${
                          currentStep > step.id ? 'bg-green-600' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                {renderStepContent()}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button 
                    onClick={nextStep}
                    disabled={currentStep === 4}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {currentStep === 3 ? 'Confirm Booking' : 'Continue'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Package Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-40 rounded-lg mb-4">
                  <Image
                    src={`https://images.unsplash.com/${packageDetails.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                    alt={packageDetails.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
                <h3 className="font-semibold mb-2">{packageDetails.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{packageDetails.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{packageDetails.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{packageDetails.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                    <span>{packageDetails.rating} ({packageDetails.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="text-2xl font-bold text-green-600">
                    ₹{packageDetails.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">per person</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What&apos;s Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {packageDetails.includes.map((item, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingFlow;
