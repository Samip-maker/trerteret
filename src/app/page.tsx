import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { getDestinations, getPackages, getTestimonials } from '@/lib/server-utils';

// Dynamic imports for better performance
const Hero = dynamic(() => import("@/components/Hero").then(mod => ({ default: mod.Hero })), {
  loading: () => <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-emerald-900 animate-pulse" />
});

const SearchSection = dynamic(() => import("@/components/SearchSection").then(mod => ({ default: mod.SearchSection })), {
  loading: () => <div className="py-16 bg-gray-50 animate-pulse">
    <div className="max-w-6xl mx-auto px-4">
      <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
            </div>
});

const FeaturesSection = dynamic(() => import("@/components/FeaturesSection").then(mod => ({ default: mod.FeaturesSection })), {
  loading: () => <div className="py-20 bg-white animate-pulse">
    <div className="max-w-7xl mx-auto px-4">
      <div className="h-32 bg-gray-200 rounded-lg mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
                    </div>
                  </div>
});

const FeaturedDestinations = dynamic(() => import("@/components/FeaturedDestinations").then(mod => ({ default: mod.FeaturedDestinations })), {
  loading: () => <div className="py-20 bg-gray-50 animate-pulse">
    <div className="max-w-7xl mx-auto px-4">
      <div className="h-32 bg-gray-200 rounded-lg mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
        ))}
                        </div>
                      </div>
                    </div>
});

const PopularPackages = dynamic(() => import("@/components/PopularPackages").then(mod => ({ default: mod.PopularPackages })), {
  loading: () => <div className="py-20 bg-white animate-pulse">
    <div className="max-w-7xl mx-auto px-4">
      <div className="h-32 bg-gray-200 rounded-lg mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
        ))}
                        </div>
                        </div>
                      </div>
});

const Testimonials = dynamic(() => import("@/components/Testimonials").then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="py-20 bg-gray-50 animate-pulse">
    <div className="max-w-7xl mx-auto px-4">
      <div className="h-32 bg-gray-200 rounded-lg mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
        ))}
                        </div>
                      </div>
                    </div>
});

// Server-side data fetching
async function getHomePageData() {
  try {
    const [destinations, packages, testimonials] = await Promise.all([
      getDestinations(),
      getPackages(),
      getTestimonials()
    ]);

    return {
      destinations,
      packages,
      testimonials
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return {
      destinations: [],
      packages: [],
      testimonials: []
    };
  }
}

export default async function Home() {
  const { destinations, packages, testimonials } = await getHomePageData();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="w-full">
        <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-emerald-900 animate-pulse" />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<div className="py-16 bg-gray-50 animate-pulse">
          <div className="max-w-6xl mx-auto px-4">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>}>
          <SearchSection />
        </Suspense>
        
        <Suspense fallback={<div className="py-20 bg-white animate-pulse">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-32 bg-gray-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
        </div>
        </div>}>
          <FeaturesSection />
        </Suspense>
        
        <Suspense fallback={<div className="py-20 bg-gray-50 animate-pulse">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-32 bg-gray-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
        </div>}>
          <FeaturedDestinations destinations={destinations} />
        </Suspense>
        
        <Suspense fallback={<div className="py-20 bg-white animate-pulse">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-32 bg-gray-200 rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
              ))}
                      </div>
                    </div>
        </div>}>
          <PopularPackages packages={packages} />
        </Suspense>
        
        <Suspense fallback={<div className="py-20 bg-gray-50 animate-pulse">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-32 bg-gray-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
        </div>}>
          <Testimonials testimonials={testimonials} />
        </Suspense>

      <Footer />
    </div>
      </div>
    );
  }