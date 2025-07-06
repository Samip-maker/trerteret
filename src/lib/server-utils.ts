import { cache } from 'react';
import { revalidatePath } from 'next/cache';

// Cache function for server-side data fetching
export const getCachedData = cache(async <T>(key: string, fetcher: () => Promise<T>) => {
  try {
    // In a real app, you might use Redis or another caching solution
    // For now, we'll use a simple in-memory cache
    const data = await fetcher();
    return data;
  } catch (error) {
    console.error(`Error fetching cached data for key: ${key}`, error);
    throw error;
  }
});

// Revalidate specific paths
export const revalidatePaths = (paths: string[]) => {
  paths.forEach(path => revalidatePath(path));
};

// Server-side data fetching for destinations
export const getDestinations = cache(async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: 1,
      name: "Sikkim",
      description: "The mystical land of monasteries and mountains",
      image: "https://images.unsplash.com/photo-1571407972469-c792f1939cc4?q=80&w=2070&auto=format&fit=crop",
      rating: 4.8,
      reviews: 1247,
      price: "₹15,999",
      duration: "5 days",
      highlights: ["Monasteries", "Mountain Views", "Local Culture"]
    },
    {
      id: 2,
      name: "Darjeeling",
      description: "Queen of the Hills with tea gardens",
      image: "https://images.unsplash.com/photo-1617941382988-35457604a271?q=80&w=2070&auto=format&fit=crop",
      rating: 4.6,
      reviews: 892,
      price: "₹12,499",
      duration: "4 days",
      highlights: ["Tea Gardens", "Toy Train", "Sunrise"]
    },
    {
      id: 3,
      name: "Gangtok",
      description: "Capital city with modern amenities",
      image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=2070&auto=format&fit=crop",
      rating: 4.4,
      reviews: 567,
      price: "₹9,999",
      duration: "3 days",
      highlights: ["City Life", "Shopping", "Food"]
    }
  ];
});

// Server-side data fetching for packages
export const getPackages = cache(async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 150));
  
  return [
    {
      id: 1,
      title: "Sikkim Adventure Package",
      description: "Complete 7-day adventure through Sikkim's best destinations",
      image: "https://images.unsplash.com/photo-1571407972469-c792f1939cc4?q=80&w=2070&auto=format&fit=crop",
      price: "₹25,999",
      originalPrice: "₹32,999",
      duration: "7 days",
      rating: 4.9,
      reviews: 234,
      destinations: ["Gangtok", "Lachung", "Pelling"],
      highlights: ["Monastery Visits", "Mountain Trekking", "Local Cuisine"]
    },
    {
      id: 2,
      title: "Darjeeling Heritage Tour",
      description: "Explore the colonial heritage and tea culture",
      image: "https://images.unsplash.com/photo-1617941382988-35457604a271?q=80&w=2070&auto=format&fit=crop",
      price: "₹18,999",
      originalPrice: "₹24,999",
      duration: "5 days",
      rating: 4.7,
      reviews: 156,
      destinations: ["Darjeeling", "Kurseong", "Mirik"],
      highlights: ["Tea Gardens", "Toy Train Ride", "Sunrise Point"]
    },
    {
      id: 3,
      title: "North Sikkim Expedition",
      description: "Adventure to the remote northern regions",
      image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=2070&auto=format&fit=crop",
      price: "₹32,999",
      originalPrice: "₹39,999",
      duration: "8 days",
      rating: 4.8,
      reviews: 89,
      destinations: ["Lachung", "Yumthang", "Zero Point"],
      highlights: ["High Altitude", "Snow Views", "Adventure Sports"]
    }
  ];
});

// Server-side data fetching for testimonials
export const getTestimonials = cache(async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 80));
  
  return [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "Amazing experience! The Sikkim tour was perfectly organized. The monasteries were breathtaking and the local food was delicious.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      comment: "Turbo Travels made our Darjeeling trip unforgettable. The tea garden visits and toy train ride were highlights of our vacation.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Anita Patel",
      location: "Bangalore",
      rating: 4,
      comment: "Great service and well-planned itinerary. The North Sikkim expedition was challenging but totally worth it!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];
});

// Server-side data fetching for user bookings
export const getUserBookings = cache(async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [
    {
      id: 1,
      destination: "Sikkim Adventure",
      date: "2024-07-15",
      time: "10:00 AM",
      guests: 2,
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1571407972469-c792f1939cc4?q=80&w=2070&auto=format&fit=crop",
      bookingId: "BK001234",
      amount: "₹25,999"
    },
    {
      id: 2,
      destination: "Darjeeling Retreat",
      date: "2024-08-20",
      time: "2:00 PM",
      guests: 4,
      status: "completed",
      image: "https://images.unsplash.com/photo-1617941382988-35457604a271?q=80&w=2070&auto=format&fit=crop",
      bookingId: "BK001235",
      amount: "₹18,999"
    },
    {
      id: 3,
      destination: "Gangtok Exploration",
      date: "2024-09-10",
      time: "11:30 AM",
      guests: 3,
      status: "cancelled",
      image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=2070&auto=format&fit=crop",
      bookingId: "BK001236",
      amount: "₹9,999"
    }
  ];
});

// Server-side data fetching for search results
export const getSearchResults = cache(async (query: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In a real app, this would query your database
  const destinations = await getDestinations();
  const packages = await getPackages();
  
  return {
    destinations: destinations.filter(d => 
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.description.toLowerCase().includes(query.toLowerCase())
    ),
    packages: packages.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    )
  };
});

// Utility for generating static params
export const generateStaticParams = async () => {
  const destinations = await getDestinations();
  const packages = await getPackages();
  
  return [
    ...destinations.map(d => ({ slug: d.name.toLowerCase().replace(/\s+/g, '-') })),
    ...packages.map(p => ({ slug: p.title.toLowerCase().replace(/\s+/g, '-') }))
  ];
}; 