"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, Edit, Save, Shield, Bell, CreditCard, Star } from "lucide-react";
import { CustomerNavigation } from "@/components/CustomerNavigation";

const CustomerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Samip Pokharel",
    email: "samip@example.com",
    phone: "9841234567",
    location: "Kathmandu, Nepal",
    bio: "Avid traveler and explorer. Loves mountains and coding.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile saved:", profileData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      <CustomerNavigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-col items-center text-center p-4 sm:p-6">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Profile Avatar" />
                  <AvatarFallback>SP</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 text-lg sm:text-xl font-semibold">{profileData.name}</CardTitle>
                <p className="text-gray-500 text-sm sm:text-base">{profileData.location}</p>
                <Badge variant="secondary" className="mt-2">
                  <Star className="mr-2 h-4 w-4" />
                  Elite Traveler
                </Badge>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <a href={`mailto:${profileData.email}`} className="text-sm text-gray-600 hover:text-gray-800 break-all">
                      {profileData.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{profileData.phone}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-4">{profileData.bio}</p>
                </div>
                <Button variant="outline" className="mt-4 w-full justify-center" onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg font-semibold">Profile Details</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <Tabs defaultValue="account" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                    <TabsTrigger value="account" className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 p-2 text-xs sm:text-sm">
                      <User className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Account</span>
                      <span className="sm:hidden">Acc</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 p-2 text-xs sm:text-sm">
                      <Shield className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Security</span>
                      <span className="sm:hidden">Sec</span>
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 p-2 text-xs sm:text-sm">
                      <Bell className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Notifications</span>
                      <span className="sm:hidden">Not</span>
                    </TabsTrigger>
                    <TabsTrigger value="payment" className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 p-2 text-xs sm:text-sm">
                      <CreditCard className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Payment</span>
                      <span className="sm:hidden">Pay</span>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                        <Input id="name" name="name" value={profileData.name} onChange={handleChange} disabled={!isEditing} className="text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input id="email" name="email" type="email" value={profileData.email} onChange={handleChange} disabled={!isEditing} className="text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                        <Input id="phone" name="phone" value={profileData.phone} onChange={handleChange} disabled={!isEditing} className="text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                        <Input id="location" name="location" value={profileData.location} onChange={handleChange} disabled={!isEditing} className="text-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                      <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleChange} disabled={!isEditing} className="text-sm min-h-[80px]" />
                    </div>
                    {isEditing && (
                      <Button onClick={handleSave} className="w-full justify-center">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    )}
                  </TabsContent>
                  <TabsContent value="security" className="p-4 text-center text-gray-500">
                    <p className="text-sm">Security settings will be available soon.</p>
                  </TabsContent>
                  <TabsContent value="notifications" className="p-4 text-center text-gray-500">
                    <p className="text-sm">Notification settings will be available soon.</p>
                  </TabsContent>
                  <TabsContent value="payment" className="p-4 text-center text-gray-500">
                    <p className="text-sm">Payment settings will be available soon.</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile; 