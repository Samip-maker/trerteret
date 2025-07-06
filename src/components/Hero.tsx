import { Button } from "@/components/ui/button";
import { ArrowDown, Star, Users, Award } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('/ravangla-bnnnr.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>

      {/* Floating Prayer Flags Animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-20 bg-gradient-to-b from-red-500 to-transparent opacity-60 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-3 h-16 bg-gradient-to-b from-blue-500 to-transparent opacity-50 animate-pulse animation-delay-200"></div>
        <div className="absolute top-40 left-1/3 w-3 h-24 bg-gradient-to-b from-yellow-500 to-transparent opacity-40 animate-pulse animation-delay-400"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            Discover the
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
              Mystic Splendor of Sikkim
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
            Experience the Himalayas like never before with curated adventures through pristine monasteries, 
            sacred peaks, and vibrant local cultures of Northeast India&apos;s hidden gem
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8 animate-fade-in animation-delay-200">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-medium">Trusted by 10,000+ travelers</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">4.9/5 rating</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-medium">Local Expert Guides</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Start Your Journey
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            Explore Packages
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-white text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="h-6 w-6 text-white" />
        </div>
      </div>
    </section>
  );
};
