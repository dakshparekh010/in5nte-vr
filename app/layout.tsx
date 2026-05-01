import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron', weight: ['400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: 'In5nite VR | India\'s First Free Roam VR Arcade',
  description: 'India\'s first Free Roam VR Multiplayer experience with Full Body Tracking. Step into another reality — right here in Surat.',
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
