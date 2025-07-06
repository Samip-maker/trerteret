"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Users, 
  Clock, 
  BookOpen,
  Hotel,
  Mountain,
  Sun,
  Building2,
  TreePine,
  Heart,
  Share2,
  Eye
} from "lucide-react";

const Packages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock packages data
  const packages = [
    {
      id: "PKG001",
      title: "Goa Beach Paradise",
      description: "Experience the perfect blend of sun, sand, and Portuguese heritage",
      location: "Goa, India",
      duration: "5 Days / 4 Nights",
      price: "₹25,999",
      originalPrice: "₹32,000",
      rating: 4.8,
      reviews: 156,
      category: "beach",
      image: "/placeholder.svg",
      highlights: ["Beach Resort", "Water Sports", "Portuguese Heritage", "Seafood"],
      groupSize: "2-8 people",
      difficulty: "Easy"
    },
    {
      id: "PKG002",
      title: "Kerala Backwaters",
      description: "Cruise through serene backwaters and experience authentic Kerala culture",
      location: "Kerala, India",
      duration: "6 Days / 5 Nights",
      price: "₹28,500",
      originalPrice: "₹35,000",
      rating: 4.9,
      reviews: 203,
      category: "cultural",
      image: "/placeholder.svg",
      highlights: ["Houseboat Stay", "Ayurveda", "Tea Gardens", "Traditional Dance"],
      groupSize: "2-6 people",
      difficulty: "Easy"
    },
    {
      id: "PKG003",
      title: "Rajasthan Heritage Tour",
      description: "Explore the royal heritage and magnificent forts of Rajasthan",
      location: "Rajasthan, India",
      duration: "7 Days / 6 Nights",
      price: "₹35,000",
      originalPrice: "₹42,000",
      rating: 4.7,
      reviews: 189,
      category: "heritage",
      image: "/placeholder.svg",
      highlights: ["Palace Hotels", "Desert Safari", "Folk Music", "Camel Ride"],
      groupSize: "2-10 people",
      difficulty: "Moderate"
    },
    {
      id: "PKG004",
      title: "Himalayan Adventure",
      description: "Trek through pristine mountains and experience local culture",
      location: "Himachal Pradesh, India",
      duration: "8 Days / 7 Nights",
      price: "₹45,000",
      originalPrice: "₹52,000",
      rating: 4.6,
      reviews: 134,
      category: "adventure",
      image: "/placeholder.svg",
      highlights: ["Mountain Trek", "Local Villages", "Camping", "River Rafting"],
      groupSize: "4-12 people",
      difficulty: "Challenging"
    },
    {
      id: "PKG005",
      title: "Varanasi Spiritual Journey",
      description: "Experience the spiritual essence of India's holiest city",
      location: "Varanasi, India",
      duration: "4 Days / 3 Nights",
      price: "₹18,500",
      originalPrice: "₹22,000",
      rating: 4.5,
      reviews: 98,
      category: "spiritual",
      image: "/placeholder.svg",
      highlights: ["Ganga Aarti", "Temple Visits", "Meditation", "Boat Rides"],
      groupSize: "2-6 people",
      difficulty: "Easy"
    },
    {
      id: "PKG006",
      title: "Andaman Island Escape",
      description: "Discover pristine beaches and underwater wonders",
      location: "Andaman Islands, India",
      duration: "6 Days / 5 Nights",
      price: "₹38,000",
      originalPrice: "₹45,000",
      rating: 4.9,
      reviews: 167,
      category: "beach",
      image: "/placeholder.svg",
      highlights: ["Scuba Diving", "Beach Resorts", "Coral Reefs", "Island Hopping"],
      groupSize: "2-8 people",
      difficulty: "Moderate"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Packages', icon: BookOpen },
    { id: 'beach', name: 'Beach Getaways', icon: Sun },
    { id: 'adventure', name: 'Adventure', icon: Mountain },
    { id: 'cultural', name: 'Cultural', icon: Building2 },
    { id: 'heritage', name: 'Heritage', icon: Hotel },
    { id: 'spiritual', name: 'Spiritual', icon: TreePine }
  ];

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData?.icon || BookOpen;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Easy: "bg-green-100 text-green-800",
      Moderate: "bg-yellow-100 text-yellow-800",
      Challenging: "bg-red-100 text-red-800"
    };
    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Travel Packages</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover handpicked travel experiences across India. From pristine beaches to majestic mountains, 
              we have the perfect package for your next adventure.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search packages by destination or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                  <category.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => {
            const Icon = getCategoryIcon(pkg.category);
            return (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {Icon && React.createElement(Icon, { className: "h-12 w-12 text-gray-400" })}
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className={getDifficultyColor(pkg.difficulty)}>
                      {pkg.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{pkg.title}</CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{pkg.location}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{pkg.groupSize}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{pkg.rating}</span>
                        <span className="text-sm text-gray-500">({pkg.reviews})</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {pkg.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {pkg.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {pkg.highlights.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{pkg.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-green-600">{pkg.price}</span>
                      </div>
                      <p className="text-xs text-gray-500">per person</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all packages.</p>
          </div>
        )}

        {/* Load More */}
        {filteredPackages.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Packages
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages; 