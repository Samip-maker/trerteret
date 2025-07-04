import Link from "next/link";
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-blue-400 dark:text-blue-300" />
              <span className="text-xl font-bold">WanderStay</span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 text-sm">
              Your trusted partner for unforgettable travel experiences. 
              Discover amazing destinations, book unique stays, and create memories that last a lifetime.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/packages" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors">Travel Packages</Link></li>
              <li><Link href="/hotels" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors">Hotels</Link></li>
              <li><Link href="/homestays" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors">Homestays</Link></li>
              <li><Link href="/destinations" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors">Destinations</Link></li>
              <li><Link href="/offers" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors">Special Offers</Link></li>
            </ul>
          </div>

          {/* For Partners */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Partners</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/partner/signup" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors">Join as Partner</Link></li>
              <li><Link href="/partner/login" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors">Partner Login</Link></li>
              <li><Link href="/partner/resources" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors">Resources</Link></li>
              <li><Link href="/partner/support" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors">Partner Support</Link></li>
              <li><Link href="/partner/guidelines" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors">Guidelines</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact & Support</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400 dark:text-blue-300" />
                <span className="text-gray-300 dark:text-gray-400">support@wanderstay.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400 dark:text-blue-300" />
                <span className="text-gray-300 dark:text-gray-400">+1 (555) 123-4567</span>
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            © 2024 WanderStay. All rights reserved. Made with ❤️ for travelers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;