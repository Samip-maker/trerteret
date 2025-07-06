
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock } from "lucide-react";
import Image from "next/image";

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  duration: string;
  highlights: string[];
}

interface FeaturedDestinationsProps {
  destinations: Destination[];
}

export const FeaturedDestinations = ({ destinations = [] }: FeaturedDestinationsProps) => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 text-emerald-600 border-emerald-200">
            Sikkim Destinations
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore the Heart of the Himalayas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the four districts of Sikkim, each offering unique experiences from 
            sacred monasteries to pristine alpine valleys
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <Card 
              key={destination.id} 
              className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 rounded-2xl bg-white"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                

                {/* Bottom overlay content */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-gray-700">{destination.rating}</span>
                      <span className="text-sm text-gray-400">({destination.reviews} reviews)</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold">{destination.name}</h3>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
                
                {/* Duration */}
                <div className="flex items-center space-x-2 mb-4 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{destination.duration}</span>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {destination.highlights.slice(0, 2).map((highlight, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs bg-emerald-50 text-emerald-700">
                      {highlight}
                    </Badge>
                  ))}
                  {destination.highlights.length > 2 && (
                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                      +{destination.highlights.length - 2} more
                    </Badge>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold text-emerald-600">
                      {destination.price}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300"
                  >
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300"
          >
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};
