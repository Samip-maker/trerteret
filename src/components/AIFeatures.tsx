import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageCircle, TrendingUp, MapPin, Calendar, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Recommendation {
  type: 'package' | 'hotel' | 'experience';
  title: string;
  reason: string;
  price: number;
  rating: number;
  image: string;
}

const AIFeatures = () => {
  const [chatInput, setChatInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recommendations] = useState<Recommendation[]>([
    {
      type: 'package',
      title: 'Gangtok Heritage Walk',
      reason: 'Based on your interest in cultural experiences',
      price: 8500,
      rating: 4.8,
      image: 'photo-1506905925346-21bda4d32df4'
    },
    {
      type: 'hotel',
      title: 'Mountain View Resort',
      reason: 'Perfect for your preferred mountain locations',
      price: 12000,
      rating: 4.9,
      image: 'photo-1566073771259-6a8506099945'
    }
  ]);
  const { toast } = useToast();

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      toast({
        title: "AI Assistant",
        description: "I've analyzed your request and updated your recommendations!"
      });
      setChatInput('');
      setIsProcessing(false);
    }, 2000);
  };

  const generateItinerary = () => {
    setIsProcessing(true);
    setTimeout(() => {
      toast({
        title: "Itinerary Generated!",
        description: "Your personalized 5-day Sikkim itinerary is ready."
      });
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* AI Chat Assistant */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <Bot className="h-6 w-6 text-purple-600" />
            AI Travel Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Ask me anything about your trip to Sikkim! I can help with recommendations, itinerary planning, and travel tips.
          </p>
          
          <div className="flex space-x-2">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask me about Sikkim travel..."
              className="flex-1 bg-white dark:bg-gray-800"
              onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
            />
            <Button 
              onClick={handleChatSubmit}
              disabled={isProcessing}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <MessageCircle className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setChatInput('Best time to visit Sikkim?')}>
              Best time to visit?
            </Button>
            <Button variant="outline" size="sm" onClick={() => setChatInput('What should I pack for Sikkim?')}>
              What to pack?
            </Button>
            <Button variant="outline" size="sm" onClick={() => setChatInput('Local food recommendations')}>
              Local food tips
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-600" />
            AI Recommendations for You
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Based on your search history and preferences
          </p>
          
          {recommendations.map((rec, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex space-x-4">
                <img
                  src={`https://images.unsplash.com/${rec.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`}
                  alt={rec.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{rec.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{rec.reason}</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                      AI Pick
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-green-600 dark:text-green-400">₹{rec.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">★ {rec.rating}</span>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Dynamic Pricing Alerts */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Price Alerts & Predictions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200">Price Drop Alert!</h3>
              <Badge className="bg-red-500 text-white">-15%</Badge>
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Gangtok Premium Package prices have dropped by 15%. Book now to save ₹3,000!
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-green-800 dark:text-green-200">Best Time to Book</h3>
              <Badge className="bg-green-600 text-white">Optimal</Badge>
            </div>
            <p className="text-green-700 dark:text-green-300 text-sm">
              AI predicts prices will increase by 20% next week. Current rates are at their lowest.
            </p>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Enable Price Alerts
          </Button>
        </CardContent>
      </Card>

      {/* Automated Itinerary Generator */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            AI Itinerary Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Let AI create a personalized itinerary based on your preferences, budget, and travel dates.
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Smart Scheduling</p>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <MapPin className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Route Optimization</p>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Budget Optimization</p>
            </div>
          </div>

          <Button 
            onClick={generateItinerary}
            disabled={isProcessing}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Generating Itinerary...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>Generate My Itinerary</span>
              </div>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIFeatures;
