'use client';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Home',       href: '#home'    },
  { label: 'Experience', href: '#why-us'  },
  { label: 'Games',      href: '#games'   },
  { label: 'About',      href: '#stats'   },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Glassmorphism trigger after 80px scroll
      setScrolled(window.scrollY > 80);

      // Active section detection — walk backwards, first one whose top ≤ 120px wins
      const sectionIds = ['home', 'why-us', 'games', 'stats', 'contact'];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
      style={{
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 3rem',
        background: scrolled ? 'rgba(3,3,8,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(0,245,255,0.08)'
          : '1px solid transparent',
      }}
    >
      {/* ── Logo ───────────────────────────────────────────── */}
      <a
        href="#home"
        onClick={(e) => handleNavClick(e, '#home')}
        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
      >
        <span
          className="font-orbitron font-black text-xl tracking-widest"
          style={{
            background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          IN5NITE
        </span>
        <span
          className="font-orbitron font-black text-xl tracking-widest ml-2"
          style={{ color: 'rgba(255,255,255,0.9)' }}
        >
          VR
        </span>
      </a>

      {/* ── Nav links — desktop ────────────────────────────── */}
      <ul
        className="hidden md:flex items-center gap-8"
        style={{ listStyle: 'none', margin: 0, padding: 0 }}
      >
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 500 : 400,
                  letterSpacing: '0.05em',
                  color: isActive ? '#22d3ee' : 'rgba(255,255,255,0.55)',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                  paddingBottom: '4px',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color =
                      'rgba(255,255,255,0.9)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color =
                      'rgba(255,255,255,0.55)';
                  }
                }}
              >
                {link.label}

                {/* Active underline indicator */}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background:
                        'linear-gradient(90deg, transparent, #22d3ee, transparent)',
                    }}
                  />
                )}
              </a>
            </li>
          );
        })}
      </ul>

      {/* ── Book Now CTA ───────────────────────────────────── */}
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('open-booking'));
        }}
        style={{ textDecoration: 'none' }}
      >
        <button
          className="font-orbitron font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
          style={{
            padding: '0.6rem 1.5rem',
            background: 'transparent',
            border: '1px solid #22d3ee',
            color: '#22d3ee',
            borderRadius: '2px',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = '#22d3ee';
            (e.currentTarget as HTMLElement).style.color = '#000';
            (e.currentTarget as HTMLElement).style.boxShadow =
              '0 0 20px rgba(34,211,238,0.4)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color = '#22d3ee';
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          BOOK NOW
        </button>
      </a>
    </nav>
  );
}
