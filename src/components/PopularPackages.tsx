import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, MapPin } from "lucide-react";
import Image from "next/image";


export interface Package {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  originalPrice: string;
  duration: string;
  rating: number;
  reviews: number;
  destinations: string[];
  highlights: string[];
  badge?: string;
  difficulty?: string;
  partnerVerified?: boolean;
  maxGuests?: number;
}

interface PopularPackagesProps {
  packages: Package[];
}

export const PopularPackages = ({ packages = [] }: PopularPackagesProps) => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 text-emerald-600 border-emerald-200">
            Curated Experiences
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Handcrafted Sikkim Adventures
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the best of Sikkim with our expertly designed packages, 
            crafted by local guides and verified partners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {packages.map((pkg, index) => (
            <Card 
              key={pkg.id} 
              className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border-0 rounded-2xl bg-white"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Badge */}
                {pkg.badge && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg">
                      {pkg.badge}
                    </Badge>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {pkg.title}
                </h3>
                
                {/* Package Info */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  {pkg.maxGuests && (
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Up to {pkg.maxGuests}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{pkg.rating} ({pkg.reviews} reviews)</span>
                  </div>
                </div>

                {/* Locations */}
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>{pkg.destinations.join(" • ")}</span>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {pkg.highlights.map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-100">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                {/* Price and Action */}
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <span className="text-2xl font-bold text-emerald-600">{pkg.price}</span>
                        <span className="ml-2 text-sm text-gray-500 line-through">{pkg.originalPrice}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">per person</span>
                  </div>
                  <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    Book Now
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
            View All Packages
          </Button>
        </div>
      </div>
    </section>
  );
};
