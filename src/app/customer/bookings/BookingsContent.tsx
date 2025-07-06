"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, Filter, Eye } from "lucide-react";
import Image from 'next/image';

const BookingsContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');

  const bookings = [
    {
      id: 1,
      destination: "Sikkim Adventure",
      date: "2024-07-15",
      time: "10:00 AM",
      guests: 2,
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1571407972469-c792f1939cc4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      destination: "Darjeeling Retreat",
      date: "2024-08-20",
      time: "2:00 PM",
      guests: 4,
      status: "completed",
      image: "https://images.unsplash.com/photo-1617941382988-35457604a271?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      destination: "Gangtok Exploration",
      date: "2024-09-10",
      time: "11:30 AM",
      guests: 3,
      status: "cancelled",
      image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const filteredBookings = bookings.filter(booking =>
    booking.destination.toLowerCase().includes(searchQuery.toLowerCase()) &&
    booking.status === activeTab
  );

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-100 via-purple-50 to-emerald-100 mix-blend-multiply animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <Card className="shadow-lg backdrop-blur-md bg-white/80 dark:bg-gray-800/80 dark:text-white">
          <CardHeader className="flex flex-col space-y-1.5 p-6">
            <CardTitle className="text-2xl font-semibold tracking-tight">My Bookings</CardTitle>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3 items-center">
                <div className="col-span-2">
                  <Input
                    type="search"
                    placeholder="Search bookings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
                <Button variant="outline" className="justify-start w-full md:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </CardHeader>

          <CardContent className="p-6">
            <Tabs defaultValue="upcoming" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">Upcoming</TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">Completed</TabsTrigger>
                <TabsTrigger value="cancelled" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">Cancelled</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming">
                {filteredBookings.length > 0 ? (
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBookings.map((booking) => (
                      <Card key={booking.id} className="bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <Image src={booking.image} alt={booking.destination} width={600} height={192} className="w-full h-48 object-cover rounded-t-md" unoptimized />
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg font-semibold">{booking.destination}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            {booking.date}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-2" />
                            {booking.time}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Users className="h-4 w-4 mr-2" />
                            {booking.guests} Guests
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary">{booking.status}</Badge>
                            <Button variant="ghost" size="sm">
                              View Details <Eye className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No upcoming bookings found.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="completed">
                {filteredBookings.length > 0 ? (
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBookings.map((booking) => (
                      <Card key={booking.id} className="bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <Image src={booking.image} alt={booking.destination} width={600} height={192} className="w-full h-48 object-cover rounded-t-md" unoptimized />
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg font-semibold">{booking.destination}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            {booking.date}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-2" />
                            {booking.time}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Users className="h-4 w-4 mr-2" />
                            {booking.guests} Guests
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary">{booking.status}</Badge>
                            <Button variant="ghost" size="sm">
                              View Details <Eye className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No completed bookings found.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="cancelled">
                {filteredBookings.length > 0 ? (
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBookings.map((booking) => (
                      <Card key={booking.id} className="bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <Image src={booking.image} alt={booking.destination} width={600} height={192} className="w-full h-48 object-cover rounded-t-md" unoptimized />
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg font-semibold">{booking.destination}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            {booking.date}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-2" />
                            {booking.time}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Users className="h-4 w-4 mr-2" />
                            {booking.guests} Guests
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary">{booking.status}</Badge>
                            <Button variant="ghost" size="sm">
                              View Details <Eye className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No cancelled bookings found.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingsContent; 