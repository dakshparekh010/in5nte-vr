import Link from 'next/link';
import { Camera, Send, Play, Users } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#020205] border-t border-[rgba(255,255,255,0.05)] py-12 relative z-30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

          {/* Logo */}
          <div className="font-heading font-bold text-xl tracking-wider text-white">
            IN5NITE <span className="text-[var(--color-brand-cyan)]">VR</span>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6 text-sm text-[rgba(255,255,255,0.5)]">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
          </div>

          {/* Socials */}
          <div className="flex items-center space-x-4 text-[rgba(255,255,255,0.5)]">
            <a href="#" className="hover:text-[var(--color-brand-cyan)] hover:scale-110 transition-all"><Camera size={20} /></a>
            <a href="#" className="hover:text-[var(--color-brand-cyan)] hover:scale-110 transition-all"><Send size={20} /></a>
            <a href="#" className="hover:text-[var(--color-brand-cyan)] hover:scale-110 transition-all"><Play size={20} /></a>
            <a href="#" className="hover:text-[var(--color-brand-cyan)] hover:scale-110 transition-all"><Users size={20} /></a>
          </div>
        </div>

        <div className="mt-12 text-center text-[rgba(255,255,255,0.3)] text-xs tracking-wider">
          © 2025 In5nite VR. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
