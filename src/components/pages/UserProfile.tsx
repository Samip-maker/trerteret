
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import {
  MapPin,
  Calendar,
  Star,
  Heart,
  Camera,
  Edit
} from "lucide-react";
import Image from "next/image";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const userProfile = {
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Delhi, India",
    memberSince: "January 2023",
    totalBookings: 8,
    wishlistItems: 12
  };

  const bookingHistory = [
    {
      id: "BK001",
      title: "Gangtok Adventure Tour",
      type: "Package",
      date: "2024-06-15",
      status: "Completed",
      amount: 12999,
      rating: 5,
      image: "photo-1472396961693-142e6e269027"
    },
    {
      id: "BK002",
      title: "Himalayan Heritage Resort",
      type: "Hotel",
      date: "2024-05-20",
      status: "Completed",
      amount: 9000,
      rating: 4,
      image: "photo-1649972904349-6e44c42644a7"
    },
    {
      id: "BK003",
      title: "Yumthang Valley Trek",
      type: "Package",
      date: "2024-07-25",
      status: "Upcoming",
      amount: 18999,
      rating: null,
      image: "photo-1500673922987-e212871fec22"
    }
  ];

  const wishlistItems = [
    {
      id: 1,
      title: "Pelling Kanchenjunga View Trek",
      type: "Package",
      price: 15999,
      image: "photo-1482938289607-e9573fc25ebb",
      location: "Pelling, West Sikkim"
    },
    {
      id: 2,
      title: "Peaceful Valley Homestay",
      type: "Homestay",
      price: 1800,
      image: "photo-1470071459604-3b5ec3a7fe05",
      location: "Lachung, North Sikkim"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Upcoming": return "bg-blue-100 text-blue-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" alt={userProfile.name} />
                  <AvatarFallback className="text-xl font-semibold bg-green-100 text-green-600">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
                    <p className="text-gray-600 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {userProfile.location}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Member since {userProfile.memberSince}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
                
                <div className="flex space-x-6 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{userProfile.totalBookings}</div>
                    <div className="text-sm text-gray-600">Total Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{userProfile.wishlistItems}</div>
                    <div className="text-sm text-gray-600">Wishlist Items</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile Details</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={userProfile.name} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={userProfile.email} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue={userProfile.phone} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue={userProfile.location} disabled={!isEditing} />
                  </div>
                </div>
                {isEditing && (
                  <div className="flex space-x-2 mt-6">
                    <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="grid gap-6">
              {bookingHistory.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-20 h-20">
                        <Image
                          src={`https://images.unsplash.com/${booking.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`}
                          alt={booking.title}
                          fill
                          className="rounded-lg object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{booking.title}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline">{booking.type}</Badge>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Booking ID: {booking.id} • Date: {booking.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600">
                              ₹{booking.amount.toLocaleString()}
                            </div>
                            {booking.rating && (
                              <div className="flex items-center mt-1">
                                <span className="text-sm text-gray-600 mr-1">Your Rating:</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < booking.rating
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative">
                    <div className="relative w-full h-40">
                      <Image
                        src={`https://images.unsplash.com/${item.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {item.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-green-600">
                        ₹{item.price.toLocaleString()}
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>My Reviews</CardTitle>
                <CardDescription>Reviews you&apos;ve written for bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Star className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-600">Complete your bookings to leave reviews</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
