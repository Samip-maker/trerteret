
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Search } from "lucide-react";

export const SearchSection = () => {
  const [searchType, setSearchType] = useState<"hotels" | "packages">("hotels");

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Trip
          </h2>
          <p className="text-xl text-gray-600">
            Search thousands of hotels and curated travel packages
          </p>
        </div>

        <Card className="p-8 shadow-xl">
          {/* Search Type Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSearchType("hotels")}
              className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
                searchType === "hotels"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Hotel className="h-5 w-5 inline mr-2" />
              Hotels
            </button>
            <button
              onClick={() => setSearchType("packages")}
              className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
                searchType === "packages"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <MapPin className="h-5 w-5 inline mr-2" />
              Packages
            </button>
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Where to?" className="pl-10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input type="date" className="pl-10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input type="date" className="pl-10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="2 guests" className="pl-10" />
              </div>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 text-lg">
            <Search className="h-5 w-5 mr-2" />
            Search {searchType === "hotels" ? "Hotels" : "Packages"}
          </Button>
        </Card>
      </div>
    </section>
  );
};

// Helper component for Hotel icon
const Hotel = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h2M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-4a1 1 0 011-1h2a1 1 0 011 1v4m-5 0h4" />
  </svg>
);
