'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#030308]/80 backdrop-blur-md border-b border-[rgba(0,245,255,0.1)] py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-heading font-bold text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-cyan)] to-[var(--color-brand-purple)]">
          IN5NITE VR
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-[rgba(255,255,255,0.7)]">
          <Link href="#" className="hover:text-[var(--color-brand-cyan)] transition-colors duration-300">Home</Link>
          <Link href="#experience" className="hover:text-[var(--color-brand-cyan)] transition-colors duration-300">Experience</Link>
          <Link href="#games" className="hover:text-[var(--color-brand-cyan)] transition-colors duration-300">Games</Link>
          <Link href="#about" className="hover:text-[var(--color-brand-cyan)] transition-colors duration-300">About</Link>
          <Link href="#contact" className="hover:text-[var(--color-brand-cyan)] transition-colors duration-300">Contact</Link>
        </div>

        {/* CTA */}
        <button className="font-heading border border-[var(--color-brand-cyan)] text-[var(--color-brand-cyan)] px-6 py-2.5 text-sm uppercase tracking-wider hover:bg-[var(--color-brand-cyan)] hover:text-[#030308] shadow-[0_0_15px_rgba(0,245,255,0.1)] hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] transition-all duration-300 rounded-[2px] transform hover:-translate-y-0.5">
          Book Now
        </button>
      </div>
    </nav>
  );
}
