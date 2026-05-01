'use client';

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative pt-12 pb-6 overflow-hidden"
      style={{
        background: '#020205',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Subtle top neon line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,245,255,0.2), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Top footer row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand column */}
          <div>
            <div
              className="font-orbitron font-black text-xl mb-4"
              style={{
                background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              IN5NITE VR
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              India's first Free Roam VR Multiplayer Gaming Arcade.
              Based in Surat, Gujarat. Est. 2021.
            </p>
          </div>

          {/* Quick links column */}
          <div>
            <p className="text-white/25 text-xs tracking-[0.2em] uppercase mb-5 font-medium">
              Quick Links
            </p>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Experience', id: 'why-us' },
                { name: 'Games', id: 'games' },
                { name: 'About', id: 'stats' },
                { name: 'Contact', id: 'contact' },
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/45 text-sm hover:text-cyan-400 transition-colors duration-200 text-left bg-transparent border-none p-0 cursor-pointer"
                  style={{ textDecoration: 'none' }}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div>
            <p className="text-white/25 text-xs tracking-[0.2em] uppercase mb-5 font-medium">
              Find Us
            </p>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              UG-1 Canal Walk Shoppers,<br />
              Vesu, Surat, Gujarat 395007
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="tel:+919427580823"
                className="text-cyan-400/70 text-sm hover:text-cyan-400 transition-colors"
                style={{ textDecoration: 'none' }}
              >
                📞 +91 94275 80823
              </a>
              <a
                href="mailto:in5nitevr@gmail.com"
                className="text-cyan-400/70 text-sm hover:text-cyan-400 transition-colors"
                style={{ textDecoration: 'none' }}
              >
                ✉️ in5nitevr@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-white/20 text-xs tracking-wider">
            © 2025 In5nite VR. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-white/25 text-xs hover:text-white/60 transition-colors tracking-wider"
              style={{ textDecoration: 'none' }}
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-white/25 text-xs hover:text-white/60 transition-colors tracking-wider"
              style={{ textDecoration: 'none' }}
            >
              Terms
            </a>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white/25 text-xs hover:text-white/60 transition-colors tracking-wider bg-transparent border-none p-0 cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Social icons */}
          <div className="flex gap-4">
            {[
              { icon: '📸', label: 'Instagram', url: 'https://instagram.com/in5nitevr' },
              { icon: '▶️', label: 'YouTube', url: 'https://youtube.com/@in5nitevr' },
              { icon: '💼', label: 'LinkedIn', url: 'https://linkedin.com/company/in5nitevr' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className="w-8 h-8 flex items-center justify-center text-sm rounded transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}
