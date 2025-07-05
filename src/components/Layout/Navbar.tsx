"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, User, Bell, LogOut, HelpCircle, Package, Home, MapPin, Phone, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// User type from next-auth
type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user as User | undefined;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { 
      name: "Travel Packages", 
      href: "/packages", 
      icon: Package,
      description: "Curated Sikkim adventures"
    },
    { 
      name: "Hotels & Stays", 
      href: "/hotels", 
      icon: Home,
      description: "Premium accommodations"
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/packages?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
        : 'bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group hover:scale-105 transition-all duration-200"
          >
            <div className="relative">
              <MapPin className="h-8 w-8 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors" />
              <div className="absolute -inset-1 bg-green-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Sikkim Trails
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400 -mt-1">
                Mystic Splendor
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isActive(item.href) 
                    ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{item.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </span>
                </div>
                {isActive(item.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 dark:bg-green-400 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4 group-focus-within:text-green-600 dark:group-focus-within:text-green-400 transition-colors" />
              <Input
                type="text"
                placeholder="Search destinations, packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500/20 dark:focus:ring-green-400/20 transition-all duration-200 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            
            {/* Notifications */}
            <Link 
              href="/notifications" 
              className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 group"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 hover:bg-red-500 text-white text-xs animate-pulse">
                3
              </Badge>
              <div className="absolute -inset-1 bg-green-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
            
            {user ? (
              // Profile menu
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="relative h-10 w-10 p-0 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 group" variant="ghost">
                    <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div className="absolute -inset-1 bg-green-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200/40 dark:border-gray-700/40 rounded-xl shadow-xl" align="end" forceMount>
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Welcome back!</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                  
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">My Profile</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Personal information</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">My Bookings</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">View trip history</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <HelpCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">Help & Support</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Get assistance</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem className="flex items-center space-x-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    <span className="font-medium">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Get Started Button
              <div className="ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
                <Button
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => router.push("/signup")}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 bg-transparent h-10 w-10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 border-gray-200 dark:border-gray-700"
                />
              </form>

              {/* Mobile Navigation Items */}
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                    </div>
                  </Link>
                ))}
                
                <Link
                  href="/notifications"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 py-3 px-4 rounded-xl transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 justify-start h-12 bg-transparent">
                    <Bell className="h-5 w-5" />
                    <span className="font-medium">Notifications</span>
                    <Badge className="ml-auto bg-red-500 text-white text-xs">3</Badge>
                  </Button>
                </Link>
                
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 py-3 px-4 rounded-xl transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 justify-start h-12 bg-transparent">
                    <User className="h-5 w-5" />
                    <span className="font-medium">My Profile</span>
                  </Button>
                </Link>
              </div>

              {/* Mobile Get Started Button */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => router.push("/signup")}
                >
                  Get Started
                </Button>
              </div>

              {/* Mobile Contact Info */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>hello@sikkimtrails.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Gangtok, Sikkim</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
