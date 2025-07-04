"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import {
  MapPin,
  Star,
  Calendar,
  Users,
  Heart,
  Filter,
  Search,
  Mountain,
  Camera,
  Snowflake
} from "lucide-react";

const Packages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [filterCategory, setFilterCategory] = useState("all");

  const sikkimPackages = [
    {
      id: 1,
      title: "Gangtok & Tsomgo Lake Adventure",
      description: "Explore Sikkim's capital and the sacred high-altitude lake with stunning mountain views",
      price: 12999,
      originalPrice: 16999,
      duration: "4 days 3 nights",
      rating: 4.8,
      reviews: 156,
      image: "photo-1472396961693-142e6e269027",
      location: "Gangtok, East Sikkim",
      category: "Adventure",
      highlights: ["MG Road", "Tsomgo Lake", "Baba Mandir", "Cable Car Ride"],
      groupSize: "2-12 people"
    },
    {
      id: 2,
      title: "North Sikkim Yumthang Valley",
      description: "Experience the Valley of Flowers and zero point with breathtaking Himalayan landscapes",
      price: 18999,
      originalPrice: 24999,
      duration: "6 days 5 nights",
      rating: 4.9,
      reviews: 203,
      image: "photo-1509316975850-ff9c5deb0cd9",
      location: "Lachung, North Sikkim",
      category: "Nature",
      highlights: ["Yumthang Valley", "Zero Point", "Lachung Monastery", "Rhododendron Sanctuary"],
      groupSize: "4-10 people"
    },
    {
      id: 3,
      title: "Pelling Kanchenjunga View Trek",
      description: "Witness the world's third highest peak and explore ancient monasteries in West Sikkim",
      price: 15999,
      originalPrice: 19999,
      duration: "5 days 4 nights",
      rating: 4.7,
      reviews: 134,
      image: "photo-1469474968028-56623f02e42e",
      location: "Pelling, West Sikkim",
      category: "Trekking",
      highlights: ["Kanchenjunga View", "Pemayangtse Monastery", "Skywalk", "Khecheopalri Lake"],
      groupSize: "2-8 people"
    },
    {
      id: 4,
      title: "Ravangla Buddha Park & Culture",
      description: "Spiritual journey through South Sikkim's monasteries and the giant Buddha statue",
      price: 10999,
      originalPrice: 13999,
      duration: "3 days 2 nights",
      rating: 4.6,
      reviews: 89,
      image: "photo-1482938289607-e9573fc25ebb",
      location: "Ravangla, South Sikkim",
      category: "Cultural",
      highlights: ["Buddha Park", "Ralang Monastery", "Bon Monastery", "Tea Gardens"],
      groupSize: "2-15 people"
    },
    {
      id: 5,
      title: "Silk Route & Aritar Lake",
      description: "Historic trade route exploration with pristine lakes and offbeat destinations",
      price: 14999,
      originalPrice: 18999,
      duration: "4 days 3 nights",
      rating: 4.5,
      reviews: 76,
      image: "photo-1470071459604-3b5ec3a7fe05",
      location: "Aritar, East Sikkim",
      category: "Offbeat",
      highlights: ["Aritar Lake", "Silk Route", "Zuluk", "Nathang Valley"],
      groupSize: "4-12 people"
    },
    {
      id: 6,
      title: "Complete Sikkim Circuit",
      description: "Grand tour covering all four districts of Sikkim with major attractions",
      price: 28999,
      originalPrice: 35999,
      duration: "10 days 9 nights",
      rating: 4.9,
      reviews: 234,
      image: "photo-1472396961693-142e6e269027",
      location: "All Sikkim",
      category: "Complete Tour",
      highlights: ["All 4 Districts", "Gurudongmar Lake", "Nathula Pass", "Yuksom"],
      groupSize: "6-16 people"
    }
  ];

  const categories = [
    { value: "all", label: "All Packages" },
    { value: "Adventure", label: "Adventure" },
    { value: "Nature", label: "Nature & Wildlife" },
    { value: "Trekking", label: "Trekking" },
    { value: "Cultural", label: "Cultural" },
    { value: "Offbeat", label: "Offbeat" },
    { value: "Complete Tour", label: "Complete Tours" }
  ];

  const filteredPackages = sikkimPackages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || pkg.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "duration": return parseInt(a.duration) - parseInt(b.duration);
      default: return b.reviews - a.reviews; // popular
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-700 dark:to-blue-700 text-white py-16 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
              Explore Beautiful Sikkim
            </h1>
            <p className="text-xl text-green-100 dark:text-green-200 mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Discover the Land of Mystic Splendor with our curated travel packages
            </p>
            
            {/* Search and Filter Bar */}
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                  <Input
                    placeholder="Search packages or destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
                
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <SelectItem value="popular" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Most Popular</SelectItem>
                    <SelectItem value="price-low" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Price: Low to High</SelectItem>
                    <SelectItem value="price-high" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Price: High to Low</SelectItem>
                    <SelectItem value="rating" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Highest Rated</SelectItem>
                    <SelectItem value="duration" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {sortedPackages.length} Travel Packages Found
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Filter className="h-4 w-4" />
              <span>Showing results for Sikkim</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPackages.map((pkg, index) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group hover-lift bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/${pkg.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                    alt={pkg.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-green-600 text-white">
                    {pkg.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
                  >
                    <Heart className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </Button>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {pkg.duration}
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors text-gray-900 dark:text-white">
                      {pkg.title}
                    </CardTitle>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">₹{pkg.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{pkg.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{pkg.groupSize}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {pkg.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          {highlight}
                        </Badge>
                      ))}
                      {pkg.highlights.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          +{pkg.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{pkg.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">({pkg.reviews} reviews)</span>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {sortedPackages.length === 0 && (
            <div className="text-center py-12">
              <Mountain className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No packages found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;