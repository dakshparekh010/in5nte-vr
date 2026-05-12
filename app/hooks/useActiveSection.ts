'use client';
import { useState, useEffect } from 'react';
import type { NavLink } from '../types/nav';

/**
 * Track which section is currently in view based on scroll position.
 * Walks `sectionIds` backwards — first whose `top ≤ threshold` wins.
 */
export function useActiveSection(links: NavLink[], threshold = 120) {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ids = links.map((l) => l.href.replace('#', ''));

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= threshold) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links, threshold]);

  return { activeSection, scrolled };
}
