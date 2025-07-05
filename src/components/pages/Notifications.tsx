
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import {
  Bell,
  Percent,
  Calendar,
  CheckCircle,
  Clock,
  Gift,
  MapPin
} from "lucide-react";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "booking",
      title: "Booking Confirmed",
      message: "Your booking for Gangtok Adventure Tour has been confirmed",
      time: "2 hours ago",
      read: false,
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      id: 2,
      type: "offer",
      title: "Special Offer: 25% Off",
      message: "Limited time offer on Yumthang Valley Trek packages",
      time: "1 day ago",
      read: false,
      icon: Percent,
      color: "text-orange-600"
    },
    {
      id: 3,
      type: "reminder",
      title: "Trip Reminder",
      message: "Your Pelling adventure starts in 3 days. Get ready for an amazing experience!",
      time: "2 days ago",
      read: true,
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      id: 4,
      type: "offer",
      title: "Weekend Flash Sale",
      message: "Grab 30% discount on all homestays this weekend only",
      time: "3 days ago",
      read: true,
      icon: Gift,
      color: "text-purple-600"
    },
    {
      id: 5,
      type: "booking",
      title: "Payment Successful",
      message: "Payment of ₹12,999 received for your Sikkim package booking",
      time: "5 days ago",
      read: true,
      icon: CheckCircle,
      color: "text-green-600"
    }
  ];

  const offers = [
    {
      id: 1,
      title: "Early Bird Special",
      description: "Book 30 days in advance and save 20% on all packages",
      discount: "20% OFF",
      validUntil: "2024-08-31",
      image: "photo-1472396961693-142e6e269027",
      partner: "Sikkim Travel Co."
    },
    {
      id: 2,
      title: "Group Booking Discount",
      description: "Special rates for groups of 6 or more travelers",
      discount: "25% OFF",
      validUntil: "2024-09-15",
      image: "photo-1500673922987-e212871fec22",
      partner: "Mountain Adventures"
    },
    {
      id: 3,
      title: "Monsoon Special",
      description: "Experience the beauty of Sikkim during monsoon season",
      discount: "15% OFF",
      validUntil: "2024-07-31",
      image: "photo-1482938289607-e9573fc25ebb",
      partner: "Himalayan Stays"
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.type === activeTab;
  });

  const markAsRead = (id: number) => {
    // This would update the notification status in a real app
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    // This would mark all notifications as read in a real app
    console.log("Marking all notifications as read");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Bell className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={markAllAsRead}
            className="text-green-600 border-green-600 hover:bg-green-50"
          >
            Mark All as Read
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="booking">Bookings</TabsTrigger>
            <TabsTrigger value="offer">Offers</TabsTrigger>
            <TabsTrigger value="reminder">Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-all duration-200 ${
                    !notification.read ? 'border-green-200 bg-green-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full bg-gray-100 ${notification.color}`}>
                        <notification.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <Badge className="bg-green-600 text-white text-xs">New</Badge>
                            )}
                            <span className="text-sm text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unread" className="mt-6">
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className="border-green-200 bg-green-50 cursor-pointer transition-all duration-200 hover:shadow-md"
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full bg-gray-100 ${notification.color}`}>
                        <notification.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-600 text-white text-xs">New</Badge>
                            <span className="text-sm text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="booking" className="mt-6">
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card key={notification.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full bg-gray-100 ${notification.color}`}>
                        <notification.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                          <span className="text-sm text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="offer" className="mt-6">
            <div className="space-y-6">
              {offers.map((offer) => (
                <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="relative w-full h-48 md:h-full">
                        <Image
                          src={`https://images.unsplash.com/${offer.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                          alt={offer.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className="bg-orange-100 text-orange-800 font-semibold">
                              {offer.discount}
                            </Badge>
                            <Badge variant="outline">Limited Time</Badge>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                          <p className="text-gray-600 mb-4">{offer.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{offer.partner}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Valid until {offer.validUntil}</span>
                            </div>
                          </div>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700 ml-4">
                          Claim Offer
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reminder" className="mt-6">
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card key={notification.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full bg-gray-100 ${notification.color}`}>
                        <notification.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                          <span className="text-sm text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Notifications;
