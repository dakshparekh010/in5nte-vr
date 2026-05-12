import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron', weight: ['400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: "In5nite VR | Free Roam VR Arcade & VR Device Rental — Surat, India",
  description:
    "Experience full-body free roam multiplayer VR at In5nite VR, India's first Free Roam VR Arcade in Surat. Book immersive VR games, rent VR devices for events, or enquire for VR device setup and sales.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  keywords: [
    'VR arcade Surat',
    'free roam VR India',
    'VR gaming Surat',
    'multiplayer VR arcade',
    'full body tracking VR',
    'In5nite VR',
    'VR devices for rent',
    'VR devices for sale',
    'VR events India',
    'corporate VR activation',
    'VR gaming zone setup',
    'rent VR headset Surat',
  ],
  openGraph: {
    title: "In5nite VR | Free Roam VR Arcade & VR Device Rental",
    description:
      "Step into another reality at In5nite VR. Book immersive free roam multiplayer VR games, rent VR devices for events, or buy VR setups for your business — all from Surat, India.",
    url: 'https://in5nite-vr.netlify.app',
    siteName: 'In5nite VR',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "In5nite VR | Free Roam VR Arcade & VR Device Rental",
    description:
      "India's first Free Roam VR Multiplayer Arcade with Full Body Tracking. Book sessions, rent devices, or enquire for VR setups.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${orbitron.variable}`}>
      <body className="bg-[#030308] text-[rgba(255,255,255,0.95)] font-sans antialiased overflow-x-hidden selection:bg-[#00F5FF] selection:text-[#030308]">
        {children}
      </body>
    </html>
  );
}
