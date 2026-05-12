'use client';
import { MessageCircle, MapPin } from 'lucide-react';
import { SOCIAL_LINKS } from '../../config/socialLinks';
import { CONTACT } from '../../config/contact';
import { NAV_LINKS } from '../../config/navLinks';
import type { SocialIconKey } from '../../types/social';

// ── Inline SVG Brand Icons (lucide-react doesn't ship brand icons) ──
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon({ size = 16 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>);
}
function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>);
}
function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>);
}
function XTwitterIcon({ size = 16 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>);
}

const ICON_MAP: Record<SocialIconKey, React.ComponentType<{ size?: number }>> = {
  instagram: InstagramIcon, facebook: FacebookIcon, youtube: YoutubeIcon,
  linkedin: LinkedinIcon, twitter: XTwitterIcon, whatsapp: MessageCircle, 'map-pin': MapPin,
};

const HOVER_COLORS: Record<SocialIconKey, string> = {
  instagram: '#E1306C', facebook: '#1877F2', youtube: '#FF0000',
  linkedin: '#0A66C2', twitter: '#1DA1F2', whatsapp: '#25D366', 'map-pin': '#22d3ee',
};

export default function Footer() {
  return (
    <footer id="footer" className="relative pt-12 pb-6 overflow-hidden" style={{ background: '#020205', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.2), transparent)' }} />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="font-orbitron font-black text-xl mb-4" style={{ background: 'linear-gradient(135deg, #22d3ee, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>IN5NITE VR</div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">India&apos;s first Free Roam VR Multiplayer Gaming Arcade. Based in Surat, Gujarat. Est. 2021.</p>
          </div>
          {/* Quick Links */}
          <div>
            <p className="text-white/25 text-xs tracking-[0.2em] uppercase mb-5 font-medium">Quick Links</p>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <button key={link.label} onClick={() => document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })} className="text-white/45 text-sm hover:text-cyan-400 transition-colors duration-200 text-left bg-transparent border-none p-0 cursor-pointer">{link.label}</button>
              ))}
            </div>
          </div>
          {/* Contact */}
          <div>
            <p className="text-white/25 text-xs tracking-[0.2em] uppercase mb-5 font-medium">Find Us</p>
            <p className="text-white/40 text-sm leading-relaxed mb-4">{CONTACT.address.line1},<br />{CONTACT.address.line2},<br />{CONTACT.address.line3}</p>
            <div className="flex flex-col gap-2">
              <a href={`tel:${CONTACT.phone}`} className="text-cyan-400/70 text-sm hover:text-cyan-400 transition-colors" style={{ textDecoration: 'none' }}>📞 {CONTACT.phoneDisplay}</a>
              <a href={`mailto:${CONTACT.email}`} className="text-cyan-400/70 text-sm hover:text-cyan-400 transition-colors" style={{ textDecoration: 'none' }}>✉️ {CONTACT.email}</a>
            </div>
          </div>
          {/* Social */}
          <div>
            <p className="text-white/25 text-xs tracking-[0.2em] uppercase mb-5 font-medium">Connect With Us</p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => {
                const IconComponent = ICON_MAP[social.icon];
                const hoverColor = HOVER_COLORS[social.icon];
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="group w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = hoverColor; el.style.boxShadow = `0 0 15px ${hoverColor}40, 0 0 30px ${hoverColor}20`; el.style.background = `${hoverColor}15`; el.style.color = hoverColor; }}
                    onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.1)'; el.style.boxShadow = 'none'; el.style.background = 'rgba(255,255,255,0.03)'; el.style.color = 'rgba(255,255,255,0.4)'; }}
                  >
                    <IconComponent size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full h-px mb-8" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs tracking-wider">© {new Date().getFullYear()} In5nite VR. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-white/25 text-xs hover:text-white/60 transition-colors tracking-wider" style={{ textDecoration: 'none' }}>Privacy</a>
            <a href="/terms" className="text-white/25 text-xs hover:text-white/60 transition-colors tracking-wider" style={{ textDecoration: 'none' }}>Terms</a>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/25 text-xs hover:text-white/60 transition-colors tracking-wider bg-transparent border-none p-0 cursor-pointer">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
