
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, MapPin, Camera, Utensils, Mountain } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  description: string;
  guide: {
    name: string;
    rating: number;
    reviews: number;
    avatar: string;
  };
  duration: string;
  groupSize: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  location: string;
  highlights: string[];
  availability: string;
}

const LocalExperiences = () => {
  const [experiences] = useState<Experience[]>([
    {
      id: '1',
      title: 'Traditional Sikkimese Cooking Class',
      description: 'Learn to cook authentic Sikkimese dishes with a local family. Experience includes market visit, cooking session, and traditional dining.',
      guide: {
        name: 'Pema Sherpa',
        rating: 4.9,
        reviews: 156,
        avatar: 'photo-1507003211169-0a1dd7228f2d'
      },
      duration: '4 hours',
      groupSize: '2-8 people',
      price: 2500,
      originalPrice: 3000,
      image: 'photo-1556909114-f6e7ad7d3136',
      category: 'Culinary',
      location: 'Gangtok',
      highlights: ['Market tour', 'Traditional recipes', 'Family dining', 'Recipe booklet'],
      availability: 'Available today'
    },
    {
      id: '2',
      title: 'Monastery Sunrise Photography Tour',
      description: 'Capture the golden hour at ancient monasteries with a professional photographer guide. Perfect for all skill levels.',
      guide: {
        name: 'Tenzin Norbu',
        rating: 4.8,
        reviews: 203,
        avatar: 'photo-1472099645785-5658abf4ff4e'
      },
      duration: '3 hours',
      groupSize: '1-6 people',
      price: 3500,
      image: 'photo-1518709268805-4e9042af2176',
      category: 'Photography',
      location: 'Rumtek Monastery',
      highlights: ['Professional guidance', 'Sunrise views', 'Monastery access', 'Photo editing tips'],
      availability: 'Available tomorrow'
    },
    {
      id: '3',
      title: 'Alpine Trekking with Local Guide',
      description: 'Explore hidden trails known only to locals. Experience pristine nature, local flora, and breathtaking mountain views.',
      guide: {
        name: 'Karma Lepcha',
        rating: 4.9,
        reviews: 89,
        avatar: 'photo-1539571696357-5a69c17a67c6'
      },
      duration: '6 hours',
      groupSize: '3-10 people',
      price: 4500,
      originalPrice: 5200,
      image: 'photo-1506905925346-21bda4d32df4',
      category: 'Adventure',
      location: 'Yumthang Valley',
      highlights: ['Hidden trails', 'Local flora guide', 'Mountain views', 'Traditional lunch'],
      availability: 'Limited spots'
    }
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Culinary': return <Utensils className="h-4 w-4" />;
      case 'Photography': return <Camera className="h-4 w-4" />;
      case 'Adventure': return <Mountain className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Culinary': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'Photography': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Adventure': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <MapPin className="h-6 w-6 text-green-600" />
            Local Experiences & Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Discover authentic experiences with local guides who know the hidden gems of Sikkim
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Authentic</Badge>
            <Badge variant="outline">Local Guides</Badge>
            <Badge variant="outline">Small Groups</Badge>
            <Badge variant="outline">Unique Experiences</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {experiences.map((experience) => (
          <Card key={experience.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
            <CardContent className="p-0">
              <div className="md:flex">
                <div className="relative md:w-80">
                  <img
                    src={`https://images.unsplash.com/${experience.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                    alt={experience.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={getCategoryColor(experience.category)}>
                      <span className="flex items-center gap-1">
                        {getCategoryIcon(experience.category)}
                        {experience.category}
                      </span>
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className={`${experience.availability === 'Available today' ? 'bg-green-600' : experience.availability === 'Available tomorrow' ? 'bg-blue-600' : 'bg-orange-600'} text-white`}>
                      {experience.availability}
                    </Badge>
                  </div>
                </div>

                <div className="flex-1 p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {experience.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{experience.groupSize}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {experience.description}
                    </p>
                  </div>

                  {/* Guide Info */}
                  <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <img
                      src={`https://images.unsplash.com/${experience.guide.avatar}?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                      alt={experience.guide.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">{experience.guide.name}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{experience.guide.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">({experience.guide.reviews} reviews)</span>
                      </div>
                    </div>
                    <Badge variant="outline">Local Guide</Badge>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What's included:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {experience.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ₹{experience.price.toLocaleString()}
                      </div>
                      {experience.originalPrice && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ₹{experience.originalPrice.toLocaleString()}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 dark:text-gray-400">per person</div>
                    </div>

                    <div className="flex space-x-3">
                      <Button variant="outline">
                        View Details
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Book Experience
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Guide Application */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Become a Local Guide
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Share your local knowledge and earn money by guiding travelers
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Apply as Guide
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalExperiences;
