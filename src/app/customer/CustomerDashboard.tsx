"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Star, Search, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CustomerDashboard = () => {
  const [searchData, setSearchData] = useState({
    destination: "Sikkim, India",
    checkIn: "12 Jul",
    checkOut: "14 Jul",
    travelers: "2 travellers, 1 room"
  });

  const deals = [
    {
      id: 1,
      title: "FabHotel Liwa International",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 8.0,
      ratingText: "Very good",
      reviews: "1 review",
      price: "₹3,483",
      originalPrice: "₹6,966",
      total: "₹7,802 total",
      memberPrice: true
    },
    {
      id: 2,
      title: "Fabexpress Le Continental",
      location: "New Delhi",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 10,
      ratingText: "Exceptional",
      reviews: "2 reviews",
      price: "₹1,757",
      originalPrice: "₹3,711",
      total: "₹3,937 total",
      memberPrice: true
    },
    {
      id: 3,
      title: "Empire Platinum Suites",
      location: "New Delhi",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 9.8,
      ratingText: "Exceptional",
      reviews: "10 reviews",
      price: "₹5,240",
      originalPrice: "₹12,995",
      total: "₹11,737 total",
      memberPrice: true
    },
    {
      id: 4,
      title: "FabHotel Prime Elite Janakpuri",
      location: "New Delhi",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 8.0,
      ratingText: "Very good",
      reviews: "1 review",
      price: "₹3,055",
      originalPrice: "₹6,110",
      total: "₹6,843 total",
      memberPrice: true
    }
  ];

  return (
    <>
      {/* Search Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <Tabs defaultValue="stays" className="w-full">
            <TabsList className="grid w-full max-w-sm sm:max-w-md grid-cols-4 mb-4 lg:mb-6">
              <TabsTrigger value="stays" className="text-xs sm:text-sm">Stays</TabsTrigger>
              <TabsTrigger value="flights" className="text-xs sm:text-sm">Flights</TabsTrigger>
              <TabsTrigger value="cars" className="text-xs sm:text-sm">Cars</TabsTrigger>
              <TabsTrigger value="packages" className="text-xs sm:text-sm">Packages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stays" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Where to?</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={searchData.destination}
                      onChange={(e) => setSearchData(prev => ({...prev, destination: e.target.value}))}
                      className="pl-10 text-sm"
                      placeholder="Destination"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Dates</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={`${searchData.checkIn} - ${searchData.checkOut}`}
                      className="pl-10 text-sm"
                      placeholder="Check-in - Check-out"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Travellers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={searchData.travelers}
                      className="pl-10 text-sm"
                      placeholder="Guests and rooms"
                    />
                  </div>
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Add a flight</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Add a car</span>
                </label>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative">
        <div 
          className="h-64 sm:h-80 lg:h-96 bg-cover bg-center relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xs sm:max-w-sm lg:max-w-lg">
                <div className="bg-yellow-400 text-black p-4 sm:p-6 rounded-lg">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">The Halfway There Sale: save 25%+</h2>
                  <p className="text-xs sm:text-sm mb-3 sm:mb-4">
                    Make the most of summer and save 25% or more on selected hotels with Member Prices. 
                    Book by 21 July, travel by 31 October 2025.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Member Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="bg-yellow-400 p-4 sm:p-6 flex-1">
                <h3 className="font-bold text-base sm:text-lg mb-2">Members save 10% or more on over 100,000 hotels worldwide</h3>
                <Button variant="link" className="text-black p-0 font-semibold text-sm">
                  Treat yourself <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="w-full sm:w-32 h-32 sm:h-auto relative">
                <Image 
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Beach destination"
                  fill
                  sizes="(max-width: 640px) 100vw, 8rem"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Card>
          
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/customer/bookings">
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  View My Bookings
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                Explore Destinations
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <Star className="h-4 w-4 mr-2" />
                Rate Your Stay
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Deals Section */}
        <div className="space-y-4 lg:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Save 25% or more: book by 21 July</h2>
              <p className="text-gray-600 text-sm sm:text-base">Showing deals for: 25 Jul - 27 Jul</p>
            </div>
            <Button variant="outline" className="self-start sm:self-center text-sm">
              See more deals
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {deals.map((deal) => (
              <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="relative w-full h-40 sm:h-48">
                    <Image 
                      src={deal.image}
                      alt={deal.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  {deal.memberPrice && (
                    <Badge className="absolute top-3 left-3 bg-yellow-400 text-black text-xs">
                      Member Price
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        deal.rating >= 9 ? 'bg-green-600' : 
                        deal.rating >= 8 ? 'bg-green-500' : 
                        'bg-blue-500'
                      } text-white`}
                    >
                      {deal.rating}
                    </Badge>
                    <span className="text-xs sm:text-sm font-medium">{deal.ratingText}</span>
                    <span className="text-xs text-gray-500">({deal.reviews})</span>
                  </div>
                  
                  <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-2">{deal.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">{deal.location}</p>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg sm:text-xl font-bold">{deal.price}</span>
                      <span className="text-xs sm:text-sm text-gray-500 line-through">{deal.originalPrice}</span>
                    </div>
                    <p className="text-xs text-gray-500">{deal.total}</p>
                    <p className="text-xs text-gray-500">includes taxes & fees</p>
                  </div>
                  
                  <Badge variant="secondary" className="mt-2 bg-yellow-100 text-yellow-800 text-xs">
                    Member Price • Save 25%+
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard; 