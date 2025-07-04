
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, TreePine, Recycle, Heart, Award, Users } from "lucide-react";

interface EcoOption {
  id: string;
  title: string;
  description: string;
  impact: string;
  carbonSaved: number;
  price: number;
  originalPrice: number;
  certified: boolean;
}

const SustainabilityFeatures = () => {
  const [carbonFootprint] = useState(2.5); // tons CO2
  const [ecoOptions] = useState<EcoOption[]>([
    {
      id: '1',
      title: 'Eco-Friendly Mountain Resort',
      description: 'Solar-powered resort with organic gardens and waste management systems',
      impact: 'Reduces carbon footprint by 60%',
      carbonSaved: 0.8,
      price: 15000,
      originalPrice: 18000,
      certified: true
    },
    {
      id: '2',
      title: 'Community Homestay Experience',
      description: 'Stay with local families and support community development projects',
      impact: 'Directly supports 5 local families',
      carbonSaved: 1.2,
      price: 8000,
      originalPrice: 10000,
      certified: true
    }
  ]);

  const [sustainabilityTips] = useState([
    'Use refillable water bottles - Save 15 plastic bottles per day',
    'Choose local transportation - Reduce emissions by 40%',
    'Support local businesses - Keep 90% of money in community',
    'Respect wildlife and nature - Help preserve biodiversity',
    'Minimize waste generation - Follow "Leave No Trace" principles'
  ]);

  return (
    <div className="space-y-6">
      {/* Carbon Footprint Calculator */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            Your Trip's Carbon Footprint
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {carbonFootprint} tons CO₂
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Estimated for your 5-day Sikkim trip
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Transportation</span>
              <span className="font-medium">1.2 tons</span>
            </div>
            <Progress value={48} className="h-2" />
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Accommodation</span>
              <span className="font-medium">0.8 tons</span>
            </div>
            <Progress value={32} className="h-2" />
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Activities</span>
              <span className="font-medium">0.5 tons</span>
            </div>
            <Progress value={20} className="h-2" />
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Offset Your Impact</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Plant 12 trees to offset your entire trip's carbon footprint
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Offset for ₹500
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Eco-Friendly Options */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <TreePine className="h-5 w-5 text-green-600" />
            Eco-Friendly Accommodations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ecoOptions.map((option) => (
            <div key={option.id} className="border border-green-200 dark:border-green-800 rounded-lg p-4 bg-green-50/50 dark:bg-green-950/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{option.title}</h3>
                    {option.certified && (
                      <Badge className="bg-green-600 text-white">
                        <Award className="h-3 w-3 mr-1" />
                        Certified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{option.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-700 dark:text-green-300 font-medium">{option.impact}</span>
                    <span className="text-blue-700 dark:text-blue-300">-{option.carbonSaved} tons CO₂</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">
                    ₹{option.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    ₹{option.originalPrice.toLocaleString()}
                  </div>
                  <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700 text-white">
                    Choose Eco
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Community Support */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-600" />
            Support Local Communities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold text-gray-900 dark:text-white">127 Families</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Supported this year</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <TreePine className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="font-semibold text-gray-900 dark:text-white">2,500 Trees</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Planted by travelers</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <Recycle className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="font-semibold text-gray-900 dark:text-white">85% Waste</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Recycled by partners</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community Impact Fund</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Add ₹200 to your booking to support local education and healthcare initiatives
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              Contribute to Fund
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sustainable Travel Tips */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            Sustainable Travel Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sustainabilityTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <Leaf className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 dark:text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              Download Complete Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SustainabilityFeatures;
