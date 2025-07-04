"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { Loader2, MapPin, Star, Users, Calendar, Shield, Zap, Heart, TrendingUp, Globe, Coffee, Mountain, Sparkles, ArrowRight } from "lucide-react";

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="h-20 bg-white dark:bg-gray-800 shadow-sm animate-pulse"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4 animate-pulse"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Main content component that contains all the JSX
const MainContent = ({
  yBg,
  yText,
  opacity,
}: {
  yBg: any;
  yText: any;
  opacity: any;
}) => {
  const featuredPackages = [
    {
      id: 1,
      title: "Gangtok & Tsomgo Lake Adventure",
      description: "Explore Sikkim's capital and the sacred high-altitude lake with stunning mountain views",
      price: 12999,
      originalPrice: 16999,
      rating: 4.8,
      reviews: 234,
      image: "photo-1472396961693-142e6e269027",
      duration: "4 days",
      location: "Gangtok, East Sikkim",
      category: "Adventure"
    },
    {
      id: 2,
      title: "North Sikkim Yumthang Valley",
      description: "Experience the Valley of Flowers and zero point with breathtaking Himalayan landscapes",
      price: 18999,
      originalPrice: 24999,
      rating: 4.9,
      reviews: 187,
      image: "photo-1509316975850-ff9c5deb0cd9",
      duration: "6 days",
      location: "Lachung, North Sikkim",
      category: "Nature"
    },
    {
      id: 3,
      title: "Pelling Kanchenjunga View Trek",
      description: "Witness the world's third highest peak and explore ancient monasteries in West Sikkim",
      price: 15999,
      originalPrice: 19999,
      rating: 4.7,
      reviews: 312,
      image: "photo-1469474968028-56623f02e42e",
      duration: "5 days",
      location: "Pelling, West Sikkim",
      category: "Trekking"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Trusted Local Partners",
      description: "All our Sikkim partners are verified and trusted by thousands of travelers"
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Book your perfect Sikkim trip in seconds with our streamlined process"
    },
    {
      icon: Users,
      title: "24/7 Local Support",
      description: "Round-the-clock customer support with local Sikkim expertise"
    },
    {
      icon: Heart,
      title: "Authentic Experiences",
      description: "Hand-picked accommodations and packages for authentic Sikkim experiences"
    }
  ];

  const stats = [
    { label: "Happy Travelers", value: "10K+", icon: Users },
    { label: "Sikkim Destinations", value: "50+", icon: Globe },
    { label: "Local Partners", value: "200+", icon: MapPin },
    { label: "Success Rate", value: "99.8%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section with Buddha Park Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background - Buddha Park Sikkim */}
        <motion.div 
          style={{ y: yBg }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            }}
          />
          {/* Gradient Overlays for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-green-900/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          <motion.div 
            style={{
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float"
          />
          <motion.div 
            style={{
              x: -mousePosition.x,
              y: -mousePosition.y,
              animationDelay: '2s'
            }}
            className="absolute top-3/4 right-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-lg animate-float"
          />
          <motion.div 
            style={{
              x: mousePosition.y,
              y: mousePosition.x,
              animationDelay: '4s'
            }}
            className="absolute top-1/2 left-3/4 w-16 h-16 bg-purple-500/10 rounded-full blur-md animate-float"
          />
        </div>

        {/* Hero Content */}
        <motion.div 
          style={{ y: yText, opacity }}
          className="relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex items-center justify-center mb-6"
              >
                <Sparkles className="h-12 w-12 text-yellow-400 mr-4 animate-pulse" />
                <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Sikkim
                </h1>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-2xl md:text-4xl font-semibold text-white drop-shadow-lg"
              >
                Where Mountains Meet Enlightenment
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed drop-shadow-md"
              >
                Discover the mystical beauty of Buddha Park and ancient monasteries, 
                where spiritual serenity meets breathtaking Himalayan landscapes.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/packages">
                <Button 
                  className="h-12 text-base bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover-lift"
                >
                  <span className="flex items-center space-x-2">
                    <span>Explore Sacred Journeys</span>
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Button>
              </Link>
              
              <Link href="/signup">
                <Button 
                  className="h-12 text-base border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Join as Partner
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden xl:block z-30"
        >
          <div className="space-y-6">
            {stats.slice(0, 2).map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="glass-morphism rounded-2xl p-4 text-center border border-white/20 hover-lift"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden xl:block z-30"
        >
          <div className="space-y-6">
            {stats.slice(2, 4).map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="glass-morphism rounded-2xl p-4 text-center border border-white/20 hover-lift"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        >
          <div className="flex flex-col items-center text-white">
            <span className="text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Packages with Parallax */}
      <motion.section 
        style={{ y: useTransform(scrollY, [800, 1800], [100, -100]) }}
        className="py-20 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
              Sacred Adventures
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Handpicked spiritual and adventure experiences curated by our local Sikkim travel experts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="overflow-hidden glass-morphism shadow-2xl hover:shadow-3xl transition-all duration-500 hover-lift">
                  <div className="relative overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/${pkg.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                      alt={pkg.title}
                      className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-600 to-red-600 text-white border-0">
                      {pkg.category}
                    </Badge>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Heart className="h-5 w-5 text-white hover:text-red-500 cursor-pointer transition-colors" />
                    </div>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">
                        {pkg.title}
                      </CardTitle>
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                          ₹{pkg.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ₹{pkg.originalPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {pkg.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{pkg.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{pkg.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-gray-900 dark:text-white">{pkg.rating}</span>
                          <span className="text-gray-500 dark:text-gray-400">({pkg.reviews} reviews)</span>
                        </div>
                        <Button 
                          className="h-9 px-4 text-sm bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0 transform hover:scale-105 transition-all duration-300"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/packages">
              <Button 
                className="h-12 text-base border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105"
              >
                View All Sacred Journeys
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We make Sikkim travel planning simple, safe, and authentic for everyone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group"
              >
                <div className="glass-morphism rounded-3xl p-8 shadow-2xl group-hover:shadow-3xl transition-all duration-500 hover-lift">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Find the perfect type of accommodation and experience for your Sikkim journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Travel Packages", description: "Complete Sikkim experiences with guided tours, activities, and local accommodations", icon: Mountain, gradient: "from-green-400 to-blue-500", link: "/packages" },
              { title: "Premium Hotels", description: "Premium hotels and resorts with stunning Himalayan views and modern amenities", icon: MapPin, gradient: "from-purple-400 to-pink-500", link: "/hotels" },
              { title: "Authentic Homestays", description: "Authentic local experiences with Sikkimese families and traditional hospitality", icon: Coffee, gradient: "from-orange-400 to-red-500", link: "/homestays" }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <Link href={category.link} className="group block">
                  <Card className="overflow-hidden glass-morphism shadow-2xl group-hover:shadow-3xl transition-all duration-500 hover-lift">
                    <div className="relative">
                      <div className={`bg-gradient-to-r ${category.gradient} h-32 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                        <category.icon className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardHeader>
                      <CardTitle className="group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 text-gray-900 dark:text-white">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Index = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, -300]);
  const yText = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const animationFrameRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(Date.now());

  // Check for existing session and redirect if needed
  useEffect(() => {
    if (status === 'loading') return;
    
    if (session?.user) {
      // Determine redirect path based on user role
      const role = (session.user as any)?.role || 'user';
      const redirectPath = 
        role === 'admin' ? '/admin/dashboard' :
        role === 'partner' ? '/partner/dashboard' :
        '/dashboard';
      
      router.push(redirectPath);
    } else {
      setIsLoading(false);
    }
  }, [session, status, router]);

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle updates to 60fps (16.67ms)
      if (now - lastUpdateRef.current >= 16.67) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 10,
          y: (e.clientY / window.innerHeight - 0.5) * 10,
        });
        lastUpdateRef.current = now;
      }
    };

    // Use requestAnimationFrame for better performance
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Show skeleton loader while checking session
  if (isLoading || status === 'loading') {
    return <SkeletonLoader />;
  }

  return (
    <MainContent 
      mousePosition={mousePosition}
      yBg={yBg}
      yText={yText}
      opacity={opacity}
      scrollY={scrollY}
    />
  );
};

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (session?.user?.role === 'partner') {
        router.push('/partner/dashboard');
      } else {
        router.push('/dashboard');
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen overflow-y-auto">
      <Navbar />
      <main>
        <MainContent yBg={yBg} yText={yText} opacity={opacity} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;