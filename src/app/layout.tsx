import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Turbo Travels - Your Gateway to Adventure',
  description: 'Discover the mystical beauty of Sikkim and beyond with Turbo Travels. Book your next adventure with confidence.',
  keywords: 'travel, sikkim, adventure, tourism, booking, hotels, flights',
  authors: [{ name: 'Turbo Travels Team' }],
  creator: 'Turbo Travels',
  publisher: 'Turbo Travels',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://turbo-travels.com'),
  openGraph: {
    title: 'Turbo Travels - Your Gateway to Adventure',
    description: 'Discover the mystical beauty of Sikkim and beyond with Turbo Travels.',
    url: 'https://turbo-travels.com',
    siteName: 'Turbo Travels',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Turbo Travels - Adventure Awaits',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turbo Travels - Your Gateway to Adventure',
    description: 'Discover the mystical beauty of Sikkim and beyond with Turbo Travels.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

// Global loading component
const GlobalLoading = () => (
  <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading Turbo Travels...</p>
    </div>
  </div>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<GlobalLoading />}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
