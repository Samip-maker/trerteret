
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Leaf, 
  Route, 
  Star,
  Shield,
  Users,
  Award 
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "AI-Powered Recommendations",
    description: "Smart travel suggestions based on your preferences, season, and budget for the perfect Sikkim experience",
    badge: "Smart",
    color: "from-blue-500 to-purple-500"
  },
  {
    icon: MapPin,
    title: "Authentic Sikkim Experiences",
    description: "Curated activities with local partners - monastery stays, traditional cooking, and cultural immersion",
    badge: "Local",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: Leaf,
    title: "Sustainable Travel",
    description: "Eco-friendly adventures that support local communities and preserve Sikkim's pristine environment",
    badge: "Eco",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Route,
    title: "Multi-City Itineraries",
    description: "Plan complex journeys across Northeast India with seamless connections and local insights",
    badge: "Complex",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Star,
    title: "Loyalty Rewards",
    description: "Earn points on every trip, unlock exclusive experiences, and get priority bookings with local partners",
    badge: "Rewards",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Travel Protection",
    description: "Comprehensive travel insurance, 24/7 support, and weather-based rescheduling for Himalayan conditions",
    badge: "Protected",
    color: "from-indigo-500 to-blue-500"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 text-emerald-600 border-emerald-200">
            Why Choose Turbo Travels
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Gateway to Extraordinary Adventures
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge technology with deep local knowledge to create 
            unforgettable Himalayan experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-md animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                      <Badge variant="secondary" className="text-xs bg-gray-100">
                        {feature.badge}
                      </Badge>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-16 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">10,000+</div>
              <div className="text-sm text-gray-600">Happy Travelers</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Star className="h-8 w-8 text-yellow-500 fill-current" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Local Partners</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <MapPin className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Destinations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
