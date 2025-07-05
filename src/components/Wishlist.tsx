
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, Star, MapPin, Calendar, Trash2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

interface WishlistItem {
  id: string;
  type: 'package' | 'hotel';
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  location: string;
  dateAdded: string;
  availability?: string;
}

interface WishlistProps {
  items: WishlistItem[];
  onRemoveItem: (id: string) => void;
  onBookNow: (item: WishlistItem) => void;
}

const Wishlist = ({ items, onRemoveItem, onBookNow }: WishlistProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { toast } = useToast();

  const handleRemoveItem = (id: string) => {
    onRemoveItem(id);
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Sikkim Trails Wishlist',
        text: 'Check out my travel wishlist on Sikkim Trails!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Wishlist link copied to clipboard.",
      });
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleBulkRemove = () => {
    selectedItems.forEach(id => onRemoveItem(id));
    setSelectedItems([]);
    toast({
      title: "Items Removed",
      description: `${selectedItems.length} items removed from wishlist.`,
    });
  };

  if (items.length === 0) {
    return (
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="pt-16 pb-16 text-center">
          <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Your Wishlist is Empty
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start adding packages and hotels you love to keep track of them
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Explore Packages
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Wishlist Header */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              My Wishlist ({items.length} items)
            </CardTitle>
            <div className="flex space-x-2">
              {selectedItems.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkRemove}
                  className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove Selected ({selectedItems.length})
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="text-gray-600 dark:text-gray-400"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share Wishlist
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Wishlist Items */}
      <div className="grid gap-6">
        {items.map((item) => (
          <Card key={item.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
            <CardContent className="p-0">
              <div className="md:flex">
                <div className="relative md:w-80">
                  <div className="relative w-full h-48 md:h-full">
                    <Image
                      src={`https://images.unsplash.com/${item.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className={`${item.type === 'package' ? 'bg-blue-600' : 'bg-green-600'} text-white`}>
                      {item.type === 'package' ? 'Package' : 'Hotel'}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      className="w-5 h-5 text-green-600 bg-white rounded border-gray-300 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Added {item.dateAdded}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </Button>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{item.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">({item.reviews} reviews)</span>
                      </div>
                      {item.availability && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {item.availability}
                        </Badge>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ₹{item.price.toLocaleString()}
                      </div>
                      {item.originalPrice && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.type === 'package' ? 'per person' : 'per night'}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={() => onBookNow(item)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Wishlist Actions */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
        <CardContent className="pt-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Never Miss a Deal!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Get notified when prices drop on your wishlist items
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Enable Price Alerts
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wishlist;
