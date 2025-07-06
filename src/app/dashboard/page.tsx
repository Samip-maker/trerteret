
"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Search, MapPin, Calendar, Users, Star, Plane, Hotel, Car, Camera, TrendingUp, Award, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Link from 'next/link';

const Index = () => {
  const popularDestinations = [
    {
      id: 1,
      name: "Gangtok",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      packages: 25,
      rating: 4.8,
      price: "₹12,999"
    },
    {
      id: 2,
      name: "Darjeeling",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      packages: 18,
      rating: 4.7,
      price: "₹9,999"
    },
    {
      id: 3,
      name: "Pelling",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      packages: 15,
      rating: 4.6,
      price: "₹15,999"
    }
  ];

  const trendingPackages = [
    {
      id: 1,
      title: "Sikkim Complete Circuit",
      duration: "7 Days 6 Nights",
      price: 28999,
      originalPrice: 35999,
      rating: 4.9,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Best Seller"
    },
    {
      id: 2,
      title: "Yumthang Valley Explorer",
      duration: "5 Days 4 Nights",
      price: 18999,
      originalPrice: 24999,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Limited Offer"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sikkim Trails</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/packages" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Packages</Link>
              <Link href="/hotels" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Hotels</Link>
              <Link href="/flights" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Flights</Link>
              <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Login</Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Discover the
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> Magic </span>
              of Sikkim
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Experience breathtaking landscapes, ancient monasteries, and adventure like never before
            </p>
          </motion.div>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="max-w-4xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-2xl border-0">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input placeholder="Where to?" className="pl-10 h-12 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600" />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input placeholder="Check-in" className="pl-10 h-12 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600" />
                  </div>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input placeholder="Guests" className="pl-10 h-12 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600" />
              </div>
                  <Button className="h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold">
                    <Search className="h-5 w-5 mr-2" />
                    Search
              </Button>
                </div>
            </CardContent>
          </Card>
          </motion.div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-green-200 dark:bg-green-800 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              { icon: Hotel, title: "Hotels", desc: "Comfortable stays", color: "blue" },
              { icon: Plane, title: "Flights", desc: "Best flight deals", color: "green" },
              { icon: Car, title: "Cabs", desc: "Local transport", color: "purple" },
              { icon: Camera, title: "Activities", desc: "Things to do", color: "orange" }
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`h-8 w-8 text-${item.color}-600 dark:text-${item.color}-400`} />
              </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </CardContent>
          </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Popular Destinations</h2>
            <p className="text-gray-600 dark:text-gray-400">Explore the most loved places in Sikkim</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <div className="relative h-64 overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image 
                        src={destination.image} 
                        alt={destination.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-900">{destination.packages} packages</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{destination.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{destination.rating}</span>
                      </div>
              </div>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">Starting from {destination.price}</p>
                    <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
                      Explore Packages
              </Button>
            </CardContent>
          </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Packages */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Trending Packages</h2>
              <p className="text-gray-600 dark:text-gray-400">Hot deals that everyone&apos;s booking</p>
            </div>
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">Trending Now</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {trendingPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <div className="md:flex">
                    <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden">
                      <Image 
                        src={pkg.image} 
                        alt={pkg.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-4 left-4 bg-red-500 text-white">{pkg.badge}</Badge>
                    </div>
                    <div className="md:w-1/2 p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{pkg.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{pkg.duration}</p>
                      <div className="flex items-center space-x-1 mb-4">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{pkg.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400">({pkg.reviews} reviews)</span>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600 dark:text-green-400">₹{pkg.price.toLocaleString()}</span>
                          <span className="text-gray-500 dark:text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400">Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()}</p>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
                        Book Now
              </Button>
                    </div>
                  </div>
          </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Sikkim Trails?</h2>
            <p className="text-blue-100">Your trusted partner for unforgettable adventures</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Best Price Guarantee", desc: "We match any competitor's price" },
              { icon: Users, title: "Expert Local Guides", desc: "Experienced guides who know every trail" },
              { icon: Star, title: "5-Star Rated Service", desc: "Consistently rated excellent by travelers" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-blue-100">{feature.desc}</p>
              </motion.div>
            ))}
        </div>
      </div>
      </section>
    </div>
  );
};

export default Index;
