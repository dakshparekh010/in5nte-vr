'use client';
import { useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../config/navLinks';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { openBookingModal } from '../../lib/utils';

export default function Navbar() {
  const { activeSection, scrolled } = useActiveSection(NAV_LINKS);
  const [mobileOpen, setMobileOpen] = useState(false);

  useBodyScrollLock(mobileOpen);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    },
    []
  );

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.25rem',
          background: scrolled ? 'rgba(3,3,8,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(0,245,255,0.08)'
            : '1px solid transparent',
        }}
      >
        {/* ── Logo ── */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <span
            className="font-orbitron font-black text-lg sm:text-xl tracking-widest"
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
            className="font-orbitron font-black text-lg sm:text-xl tracking-widest ml-2"
            style={{ color: 'rgba(255,255,255,0.9)' }}
          >
            VR
          </span>
        </a>

        {/* ── Desktop Nav Links ── */}
        <ul
          className="hidden lg:flex items-center gap-6 xl:gap-8"
          style={{ listStyle: 'none', margin: 0, padding: 0 }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="transition-colors duration-300"
                  style={{
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 500 : 400,
                    letterSpacing: '0.05em',
                    color: isActive ? '#22d3ee' : 'rgba(255,255,255,0.55)',
                    position: 'relative',
                    paddingBottom: '4px',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)';
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)',
                      }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Right side: Book Now + Hamburger ── */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openBookingModal()}
            className="font-orbitron font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: '1px solid #22d3ee',
              color: '#22d3ee',
              borderRadius: '2px',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#22d3ee';
              (e.currentTarget as HTMLElement).style.color = '#000';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(34,211,238,0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = '#22d3ee';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
            aria-label="Book a VR session"
          >
            BOOK NOW
          </button>

          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)',
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Fullscreen Menu ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[99] lg:hidden"
          style={{
            background: 'rgba(3,3,8,0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.label}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-orbitron font-semibold text-lg tracking-wider uppercase transition-colors duration-300 bg-transparent border-none cursor-pointer"
                  style={{
                    color: isActive ? '#22d3ee' : 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                setMobileOpen(false);
                openBookingModal();
              }}
              className="font-orbitron font-bold text-sm tracking-widest uppercase mt-4 transition-all duration-300 cursor-pointer"
              style={{
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                color: '#fff',
                borderRadius: '4px',
                boxShadow: '0 0 20px rgba(168,85,247,0.3)',
                border: 'none',
              }}
            >
              BOOK YOUR SESSION
            </button>
          </div>
        </div>
      )}
    </>
  );
}
