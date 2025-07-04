import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import PaymentGateway from "@/components/PaymentGateway";
import ReviewsRatings from "@/components/ReviewsRatings";
import Wishlist from "@/components/Wishlist";
import AdvancedSearch from "@/components/AdvancedSearch";
import {
  MapPin,
  Star,
  Users,
  Heart,
  Filter,
  Search,
  Wifi,
  Car,
  Coffee,
  Mountain
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Hotels = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [filterType, setFilterType] = useState("all");
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const { toast } = useToast();

  const accommodations = [
    {
      id: 1,
      name: "Himalayan Heritage Resort",
      type: "Hotel",
      description: "Luxury resort with panoramic mountain views and traditional Sikkimese architecture",
      pricePerNight: 4500,
      originalPrice: 6000,
      rating: 4.8,
      reviews: 234,
      image: "photo-1649972904349-6e44c42644a7",
      location: "Gangtok, East Sikkim",
      amenities: ["Free WiFi", "Restaurant", "Spa", "Mountain View"],
      roomTypes: ["Deluxe", "Suite", "Traditional"],
      capacity: "2-4 guests"
    },
    {
      id: 2,
      name: "Peaceful Valley Homestay",
      type: "Homestay",
      description: "Authentic Lepcha family homestay with home-cooked meals and cultural experiences",
      pricePerNight: 1800,
      originalPrice: 2500,
      rating: 4.9,
      reviews: 156,
      image: "photo-1472396961693-142e6e269027",
      location: "Lachung, North Sikkim",
      amenities: ["Home-cooked meals", "Cultural activities", "Garden", "Parking"],
      roomTypes: ["Traditional Room", "Family Suite"],
      capacity: "2-6 guests"
    },
    {
      id: 3,
      name: "Mountain View Lodge",
      type: "Lodge",
      description: "Cozy lodge with stunning Kanchenjunga views and modern amenities",
      pricePerNight: 3200,
      originalPrice: 4200,
      rating: 4.7,
      reviews: 189,
      image: "photo-1500673922987-e212871fec22",
      location: "Pelling, West Sikkim",
      amenities: ["Mountain View", "Restaurant", "Free WiFi", "Heating"],
      roomTypes: ["Standard", "Deluxe", "Premium"],
      capacity: "1-3 guests"
    },
    {
      id: 4,
      name: "Monastery View Guesthouse",
      type: "Hotel",
      description: "Peaceful accommodation near ancient monasteries with spiritual ambiance",
      pricePerNight: 2800,
      originalPrice: 3500,
      rating: 4.6,
      reviews: 98,
      image: "photo-1482938289607-e9573fc25ebb",
      location: "Ravangla, South Sikkim",
      amenities: ["Meditation Hall", "Garden", "Library", "Free WiFi"],
      roomTypes: ["Single", "Double", "Triple"],
      capacity: "1-4 guests"
    },
    {
      id: 5,
      name: "Silk Route Heritage Stay",
      type: "Homestay",
      description: "Historic homestay on the ancient Silk Route with traditional architecture",
      pricePerNight: 2200,
      originalPrice: 2800,
      rating: 4.5,
      reviews: 67,
      image: "photo-1470071459604-3b5ec3a7fe05",
      location: "Aritar, East Sikkim",
      amenities: ["Traditional Meals", "Bonfire", "Lake View", "Parking"],
      roomTypes: ["Traditional", "Modern"],
      capacity: "2-5 guests"
    },
    {
      id: 6,
      name: "Royal Palace Hotel",
      type: "Hotel",
      description: "Luxury hotel with royal heritage and modern amenities in the heart of Gangtok",
      pricePerNight: 6500,
      originalPrice: 8500,
      rating: 4.9,
      reviews: 345,
      image: "photo-1649972904349-6e44c42644a7",
      location: "MG Road, Gangtok",
      amenities: ["Spa", "Fine Dining", "Business Center", "Concierge"],
      roomTypes: ["Executive", "Royal Suite", "Presidential"],
      capacity: "2-6 guests"
    }
  ];

  const accommodationTypes = [
    { value: "all", label: "All Types" },
    { value: "Hotel", label: "Hotels" },
    { value: "Homestay", label: "Homestays" },
    { value: "Lodge", label: "Lodges" }
  ];

  const filteredAccommodations = accommodations.filter(acc => {
    const matchesSearch = acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         acc.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || acc.type === filterType;
    return matchesSearch && matchesType;
  });

  const sortedAccommodations = [...filteredAccommodations].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.pricePerNight - b.pricePerNight;
      case "price-high": return b.pricePerNight - a.pricePerNight;
      case "rating": return b.rating - a.rating;
      default: return b.reviews - a.reviews;
    }
  });

  const handleBookNow = (accommodation: any) => {
    setSelectedBooking({
      title: accommodation.name,
      dates: "Dec 15-18, 2024",
      guests: 2
    });
    setShowPaymentGateway(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentGateway(false);
    toast({
      title: "Booking Confirmed!",
      description: "Your hotel reservation has been successfully booked.",
    });
  };

  const handleAddToWishlist = (accommodation: any) => {
    const wishlistItem = {
      id: accommodation.id.toString(),
      type: 'hotel' as const,
      name: accommodation.name,
      description: accommodation.description,
      price: accommodation.pricePerNight,
      originalPrice: accommodation.originalPrice,
      rating: accommodation.rating,
      reviews: accommodation.reviews,
      image: accommodation.image,
      location: accommodation.location,
      dateAdded: new Date().toLocaleDateString(),
      availability: 'Available'
    };
    
    setWishlistItems(prev => [...prev, wishlistItem]);
    toast({
      title: "Added to Wishlist",
      description: `${accommodation.name} has been added to your wishlist.`,
    });
  };

  const sampleReviews = [
    {
      id: '1',
      user: {
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        verified: true
      },
      rating: 5,
      title: 'Amazing mountain views and hospitality',
      content: 'The hotel exceeded our expectations with breathtaking views of Kanchenjunga and exceptional service. The traditional Sikkimese breakfast was a highlight!',
      date: '2 days ago',
      helpful: 12,
      verified_purchase: true
    },
    {
      id: '2',
      user: {
        name: 'Rajesh Kumar',
        verified: false
      },
      rating: 4,
      title: 'Great location, good value',
      content: 'Perfect location for exploring Gangtok. Clean rooms and friendly staff. Only minor issue was the WiFi speed.',
      date: '1 week ago',
      helpful: 8,
      verified_purchase: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-700 dark:to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hotels & Homestays in Sikkim
            </h1>
            <p className="text-xl text-green-100 dark:text-green-200 mb-8">
              Find perfect accommodation for your Sikkim adventure
            </p>
            
            {/* Search and Filter Bar */}
            <div className="max-w-4xl mx-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                  <Input
                    placeholder="Search hotels or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl"
                  />
                </div>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="h-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 rounded-xl">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Hotel">Hotels</SelectItem>
                    <SelectItem value="Homestay">Homestays</SelectItem>
                    <SelectItem value="Lodge">Lodges</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 rounded-xl">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                variant="outline"
                className="w-full md:w-auto text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showAdvancedSearch ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Search */}
      {showAdvancedSearch && (
        <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdvancedSearch
              onSearch={(filters) => {
                console.log('Search filters:', filters);
                toast({
                  title: "Filters Applied",
                  description: "Search results updated based on your filters.",
                });
              }}
              onReset={() => {
                toast({
                  title: "Filters Reset",
                  description: "All filters have been cleared.",
                });
              }}
            />
          </div>
        </section>
      )}

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Accommodations Found
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Filter className="h-4 w-4" />
              <span>Showing results for Sikkim</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample hotel card with new features */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Himalayan Heritage Resort"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-green-600 text-white">
                  Hotel
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
                  onClick={() => handleAddToWishlist({
                    id: 1,
                    name: "Himalayan Heritage Resort",
                    description: "Luxury resort with panoramic mountain views",
                    pricePerNight: 4500,
                    originalPrice: 6000,
                    rating: 4.8,
                    reviews: 234,
                    image: "photo-1649972904349-6e44c42644a7",
                    location: "Gangtok, East Sikkim"
                  })}
                >
                  <Heart className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </Button>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors text-gray-900 dark:text-white">
                    Himalayan Heritage Resort
                  </CardTitle>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">₹4,500</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-through">₹6,000</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">per night</div>
                  </div>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Luxury resort with panoramic mountain views and traditional Sikkimese architecture
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>Gangtok, East Sikkim</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>2-4 guests</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      Free WiFi
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      Restaurant
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      Spa
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-900 dark:text-white">4.8</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">(234 reviews)</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleBookNow({
                        name: "Himalayan Heritage Resort",
                        pricePerNight: 4500
                      })}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <ReviewsRatings
              itemId="1"
              itemType="hotel"
              averageRating={4.7}
              totalReviews={234}
              reviews={sampleReviews}
            />
          </div>

          {/* Wishlist Section */}
          {wishlistItems.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Wishlist</h2>
              <Wishlist
                items={wishlistItems}
                onRemoveItem={(id) => setWishlistItems(prev => prev.filter(item => item.id !== id))}
                onBookNow={(item) => {
                  setSelectedBooking({
                    title: item.name,
                    dates: "Dec 15-18, 2024",
                    guests: 2
                  });
                  setShowPaymentGateway(true);
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Payment Gateway */}
      {showPaymentGateway && selectedBooking && (
        <PaymentGateway
          amount={selectedBooking.title === "Himalayan Heritage Resort" ? 4500 : 3200}
          bookingDetails={selectedBooking}
          onPaymentSuccess={handlePaymentSuccess}
          onCancel={() => setShowPaymentGateway(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Hotels;
