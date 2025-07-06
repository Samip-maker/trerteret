"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Calendar, 
  DollarSign, 
  Star, 
  Eye, 
  Edit, 
  Plus,
  Search,
  Filter,
  Download,
  Users,
  Settings,
  Bell
} from "lucide-react";

const PartnerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for partner dashboard
  const stats = [
    { title: "Total Properties", value: "12", change: "+2", icon: Building2, color: "text-blue-600" },
    { title: "Active Bookings", value: "89", change: "+15%", icon: Calendar, color: "text-green-600" },
    { title: "Monthly Revenue", value: "₹8.5L", change: "+28%", icon: DollarSign, color: "text-purple-600" },
    { title: "Average Rating", value: "4.7", change: "+0.2", icon: Star, color: "text-orange-600" },
  ];

  const properties = [
    {
      id: "PROP001",
      name: "Mountain View Resort",
      type: "Hotel",
      location: "Gangtok, Sikkim",
      rating: 4.8,
      reviews: 156,
      bookings: 23,
      revenue: "₹2.4L",
      status: "active"
    },
    {
      id: "PROP002",
      name: "Tea Garden Homestay",
      type: "Homestay",
      location: "Darjeeling, WB",
      rating: 4.6,
      reviews: 89,
      bookings: 15,
      revenue: "₹1.2L",
      status: "active"
    },
    {
      id: "PROP003",
      name: "Adventure Lodge",
      type: "Lodge",
      location: "Lachung, Sikkim",
      rating: 4.9,
      reviews: 234,
      bookings: 31,
      revenue: "₹3.1L",
      status: "pending"
    }
  ];

  const recentBookings = [
    {
      id: "BK001",
      customer: "Priya Sharma",
      property: "Mountain View Resort",
      checkIn: "2024-07-15",
      checkOut: "2024-07-18",
      amount: "₹12,999",
      status: "confirmed"
    },
    {
      id: "BK002",
      customer: "Rajesh Kumar",
      property: "Tea Garden Homestay",
      checkIn: "2024-07-20",
      checkOut: "2024-07-22",
      amount: "₹8,999",
      status: "pending"
    },
    {
      id: "BK003",
      customer: "Anita Patel",
      property: "Adventure Lodge",
      checkIn: "2024-07-25",
      checkOut: "2024-07-28",
      amount: "₹15,999",
      status: "confirmed"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Partner Dashboard</h1>
              <p className="text-gray-600">Manage your properties and bookings</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Properties & Bookings */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="properties" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="properties">My Properties</TabsTrigger>
                <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
              </TabsList>

              <TabsContent value="properties">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>My Properties</CardTitle>
                      <div className="flex space-x-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search properties..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-64"
                          />
                        </div>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {properties.map((property) => (
                        <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Building2 className="h-6 w-6 text-blue-600" />
                              </div>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{property.name}</p>
                              <p className="text-sm text-gray-600">{property.location}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">{property.type}</Badge>
                                {getStatusBadge(property.status)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6">
                            <div className="text-right">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{property.rating}</span>
                                <span className="text-xs text-gray-500">({property.reviews})</span>
                              </div>
                              <p className="text-sm text-gray-600">{property.bookings} bookings</p>
                              <p className="text-sm font-medium text-green-600">{property.revenue}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Bookings</CardTitle>
                      <div className="flex space-x-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search bookings..."
                            className="pl-10 w-64"
                          />
                        </div>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-green-600" />
                              </div>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{booking.customer}</p>
                              <p className="text-sm text-gray-600">{booking.property}</p>
                              <p className="text-xs text-gray-500">{booking.checkIn} - {booking.checkOut}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-medium text-gray-900">{booking.amount}</p>
                              {getStatusBadge(booking.status)}
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Quick Actions & Analytics */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Property
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  View All Bookings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Financial Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Manage Reviews
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Property Settings
                </Button>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Occupancy Rate</span>
                    <span className="text-sm font-medium text-green-600">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Revenue Growth</span>
                    <span className="text-sm font-medium text-blue-600">+28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Customer Satisfaction</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">4.7/5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Response Rate</span>
                    <span className="text-sm font-medium text-purple-600">95%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">New booking received</p>
                    <p className="text-gray-600">Mountain View Resort - 2 guests</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Review posted</p>
                    <p className="text-gray-600">Tea Garden Homestay - 5 stars</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Payment received</p>
                    <p className="text-gray-600">₹12,999 - Adventure Lodge</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard; 