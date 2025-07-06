
import { MapPin } from "lucide-react";

export const Footer = () => {
  const footerLinks = {
    destinations: [
      "Europe", "Asia", "Americas", "Africa", "Oceania"
    ],
    company: [
      "About Us", "Careers", "Press", "Partners", "Contact"
    ],
    support: [
      "Help Center", "Safety", "Cancellation", "COVID-19", "Sitemap"
    ],
    legal: [
      "Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Turbo Travels</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your gateway to extraordinary adventures. We create unforgettable travel experiences 
              that connect you with the world&apos;s most amazing destinations.
            </p>
            <div className="flex space-x-4">
              <SocialIcon platform="facebook" />
              <SocialIcon platform="twitter" />
              <SocialIcon platform="instagram" />
              <SocialIcon platform="youtube" />
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2">
              {footerLinks.destinations.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
              {footerLinks.legal.map((link) => (
                <a key={link} href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {link}
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 Turbo Travels. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ platform }: { platform: string }) => (
  <a
    href="#"
    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
  >
    <span className="sr-only">{platform}</span>
    <div className="w-5 h-5 bg-gray-400"></div>
  </a>
);
