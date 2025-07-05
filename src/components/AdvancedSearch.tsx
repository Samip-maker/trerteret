
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  Star,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Waves,
  Mountain,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface SearchFilters {
  query: string;
  location: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: number;
  rooms: number;
  priceRange: [number, number];
  rating: number;
  amenities: string[];
  propertyType: string[];
  mealPlans: string[];
  cancellation: boolean;
  instantBook: boolean;
  verified: boolean;
  sortBy: string;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onReset: () => void;
  initialFilters?: Partial<SearchFilters>;
}

const AdvancedSearch = ({ onSearch, onReset, initialFilters = {} }: AdvancedSearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    location: '',
    checkIn: undefined,
    checkOut: undefined,
    guests: 2,
    rooms: 1,
    priceRange: [1000, 50000],
    rating: 0,
    amenities: [],
    propertyType: [],
    mealPlans: [],
    cancellation: false,
    instantBook: false,
    verified: false,
    sortBy: 'popular',
    ...initialFilters
  });

  const amenitiesList = [
    { id: 'wifi', label: 'Free WiFi', icon: Wifi },
    { id: 'parking', label: 'Free Parking', icon: Car },
    { id: 'breakfast', label: 'Breakfast', icon: Coffee },
    { id: 'restaurant', label: 'Restaurant', icon: Utensils },
    { id: 'pool', label: 'Swimming Pool', icon: Waves },
    { id: 'mountain_view', label: 'Mountain View', icon: Mountain },
  ];

  const propertyTypes = [
    'Hotel', 'Resort', 'Homestay', 'Lodge', 'Guesthouse', 'Apartment'
  ];


  const locations = [
    'Gangtok', 'Pelling', 'Lachung', 'Yuksom', 'Ravangla', 'Namchi', 'Zuluk'
  ];

  const handleFilterChange = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayFilterToggle = (key: keyof Pick<SearchFilters, 'amenities' | 'propertyType' | 'mealPlans'>, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(value)
        ? (prev[key] as string[]).filter(item => item !== value)
        : [...(prev[key] as string[]), value]
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
      query: '',
      location: '',
      checkIn: undefined,
      checkOut: undefined,
      guests: 2,
      rooms: 1,
      priceRange: [1000, 50000],
      rating: 0,
      amenities: [],
      propertyType: [],
      mealPlans: [],
      cancellation: false,
      instantBook: false,
      verified: false,
      sortBy: 'popular'
    });
    onReset();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.query) count++;
    if (filters.location) count++;
    if (filters.checkIn) count++;
    if (filters.checkOut) count++;
    if (filters.rating > 0) count++;
    if (filters.amenities.length > 0) count += filters.amenities.length;
    if (filters.propertyType.length > 0) count += filters.propertyType.length;
    if (filters.mealPlans.length > 0) count += filters.mealPlans.length;
    if (filters.cancellation) count++;
    if (filters.instantBook) count++;
    if (filters.verified) count++;
    return count;
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Search & Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()} active
              </Badge>
            )}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <X className="h-4 w-4 mr-1" />
            Reset All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Search */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-900 dark:text-white">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search packages, hotels, locations..."
                value={filters.query}
                onChange={(e) => handleFilterChange('query', e.target.value)}
                className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-900 dark:text-white">Location</Label>
            <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location.toLowerCase()}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Date Range */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-900 dark:text-white">Check-in Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600",
                    !filters.checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.checkIn ? format(filters.checkIn, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.checkIn}
                  onSelect={(date: Date | undefined) => handleFilterChange('checkIn', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-900 dark:text-white">Check-out Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600",
                    !filters.checkOut && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.checkOut ? format(filters.checkOut, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.checkOut}
                  onSelect={(date: Date | undefined) => handleFilterChange('checkOut', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Guests and Rooms */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-900 dark:text-white">Guests</Label>
            <Select value={filters.guests.toString()} onValueChange={(value) => handleFilterChange('guests', parseInt(value))}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-900 dark:text-white">Rooms</Label>
            <Select value={filters.rooms.toString()} onValueChange={(value) => handleFilterChange('rooms', parseInt(value))}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Room' : 'Rooms'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <Label className="text-gray-900 dark:text-white">Price Range</Label>
          <div className="px-3">
            <Slider
              value={filters.priceRange}
              onValueChange={(value: number[]) => handleFilterChange('priceRange', value as [number, number])}
              max={100000}
              min={500}
              step={500}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
              <span>₹{filters.priceRange[0].toLocaleString()}</span>
              <span>₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <Label className="text-gray-900 dark:text-white">Minimum Rating</Label>
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                variant={filters.rating === rating ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('rating', rating)}
                className="flex items-center space-x-1"
              >
                <Star className="h-3 w-3" />
                <span>{rating === 0 ? 'Any' : `${rating}+`}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-3">
          <Label className="text-gray-900 dark:text-white">Amenities</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {amenitiesList.map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity.id}
                  checked={filters.amenities.includes(amenity.id)}
                  onCheckedChange={() => handleArrayFilterToggle('amenities', amenity.id)}
                />
                <Label
                  htmlFor={amenity.id}
                  className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-1 cursor-pointer"
                >
                  <amenity.icon className="h-4 w-4" />
                  <span>{amenity.label}</span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-3">
          <Label className="text-gray-900 dark:text-white">Property Type</Label>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <Button
                key={type}
                variant={filters.propertyType.includes(type) ? "default" : "outline"}
                size="sm"
                onClick={() => handleArrayFilterToggle('propertyType', type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Additional Filters */}
        <div className="space-y-3">
          <Label className="text-gray-900 dark:text-white">Additional Options</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cancellation"
                checked={filters.cancellation}
                onCheckedChange={(checked: boolean) => handleFilterChange('cancellation', checked)}
              />
              <Label htmlFor="cancellation" className="text-sm text-gray-600 dark:text-gray-400">
                Free Cancellation
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="instantBook"
                checked={filters.instantBook}
                onCheckedChange={(checked: boolean) => handleFilterChange('instantBook', checked)}
              />
              <Label htmlFor="instantBook" className="text-sm text-gray-600 dark:text-gray-400">
                Instant Booking Available
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="verified"
                checked={filters.verified}
                onCheckedChange={(checked: boolean) => handleFilterChange('verified', checked)}
              />
              <Label htmlFor="verified" className="text-sm text-gray-600 dark:text-gray-400">
                Verified Properties Only
              </Label>
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <Label className="text-gray-900 dark:text-white">Sort By</Label>
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
            <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button onClick={handleSearch} className="w-full bg-green-600 hover:bg-green-700 text-white">
          <Search className="h-4 w-4 mr-2" />
          Search with Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdvancedSearch;
