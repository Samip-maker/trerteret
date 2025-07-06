
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Mountain, User, Download, List, HelpCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const CustomerNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/customer" },
    { name: "My Bookings", href: "/customer/bookings" },
    { name: "Profile", href: "/customer/profile" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/customer" className="flex items-center space-x-2 group">
            <div className="p-1.5 sm:p-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Mountain className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="hidden xs:block">
              <span className="text-lg sm:text-xl font-bold text-gray-900">Turbo Travels</span>
              <Badge variant="outline" className="ml-2 text-xs text-emerald-600 border-emerald-600 hidden sm:inline-flex">
                Customer Portal
              </Badge>
            </div>
            <div className="block xs:hidden">
              <span className="text-base font-bold text-gray-900">TT</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-300 hover:text-emerald-600 px-2 xl:px-3 py-2 rounded-md text-sm xl:text-base ${
                  isActive(item.href) 
                    ? 'text-emerald-600 bg-emerald-50' 
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-700 hover:text-emerald-600 hidden lg:flex text-xs xl:text-sm"
            >
              <Download className="h-3 w-3 xl:h-4 xl:w-4 mr-1 xl:mr-2" />
              <span className="hidden xl:inline">Get the app</span>
              <span className="xl:hidden">App</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-700 hover:text-emerald-600 text-xs xl:text-sm"
            >
              INR 🇮🇳
            </Button>

            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-700 hover:text-emerald-600 hidden lg:flex text-xs xl:text-sm"
            >
              <List className="h-3 w-3 xl:h-4 xl:w-4 mr-1 xl:mr-2" />
              <span className="hidden xl:inline">List property</span>
              <span className="xl:hidden">List</span>
            </Button>

            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-700 hover:text-emerald-600 hidden lg:flex text-xs xl:text-sm"
            >
              <HelpCircle className="h-3 w-3 xl:h-4 xl:w-4 mr-1 xl:mr-2" />
              <span className="hidden xl:inline">Support</span>
              <span className="xl:hidden">Help</span>
            </Button>

            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-700 hover:text-emerald-600 text-xs xl:text-sm"
            >
              Trips
            </Button>

            <Button 
              size="sm" 
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs xl:text-sm"
            >
              <User className="h-3 w-3 xl:h-4 xl:w-4 mr-1 xl:mr-2" />
              samip
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 p-2"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-3 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block font-medium transition-colors duration-300 px-3 py-2 rounded-md text-sm ${
                    isActive(item.href) 
                      ? 'text-emerald-600 bg-emerald-50' 
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t pt-3 space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Get the app
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Support
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <List className="h-4 w-4 mr-2" />
                  List your property
                </Button>  
                <Button className="w-full justify-start bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-sm">
                  <User className="h-4 w-4 mr-2" />
                  samip
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
