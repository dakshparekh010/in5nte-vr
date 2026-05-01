'use client';
import { motion } from 'framer-motion';

export default function Location() {
  return (
    <section
      id="contact"
      className="relative py-20 lg:py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #030308 0%, #080510 50%, #030308 100%)',
      }}
    >
      {/* Background decorations */}

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #00F5FF 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Big cyan glow — top center */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(0,245,255,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Pink glow — bottom right */}
      <div
        className="absolute -bottom-20 -right-20 pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Top neon divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

        {/* Label badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8"
          style={{
            border: '1px solid rgba(236,72,153,0.3)',
            background: 'rgba(236,72,153,0.05)',
            borderRadius: '100px',
            padding: '0.35rem 1.2rem',
            color: '#ec4899',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
          Visit Us
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-orbitron font-black mb-8"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}
        >
          <span className="block text-white">READY TO</span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(90deg, #22d3ee, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ENTER THE GAME?
          </span>
        </motion.h2>

        {/* Address card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-10 p-6"
          style={{
            maxWidth: '480px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
          }}
        >
          {/* Pin icon */}
          <div className="text-2xl mb-3">📍</div>

          <p className="text-white/70 text-sm leading-relaxed mb-4">
            UG-1 In5nite VR, Canal Walk Shoppers,<br />
            Opp. LP Savani School, Vesu,<br />
            Surat, Gujarat 395007
          </p>

          {/* Divider */}
          <div
            className="w-full h-px my-4"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          />

          {/* Contact details */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-xs tracking-wider uppercase">
            <a
              href="tel:+919427580823"
              className="flex items-center justify-center gap-2"
              style={{ color: '#22d3ee', textDecoration: 'none' }}
            >
              📞 Call Us
            </a>
            <div className="hidden sm:block w-px bg-white/10" />
            <a
              href="mailto:in5nitevr@gmail.com"
              className="flex items-center justify-center gap-2"
              style={{ color: '#22d3ee', textDecoration: 'none' }}
            >
              ✉️ Email Us
            </a>
            <div className="hidden sm:block w-px bg-white/10" />
            <a
              href="https://maps.google.com/?q=In5nite+VR+Canal+Walk+Shoppers+Vesu+Surat+395007"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
              style={{ color: '#22d3ee', textDecoration: 'none' }}
            >
              🗺️ Get Directions
            </a>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="https://wa.me/919427580823?text=Hi!%20I%20want%20to%20book%20a%20VR%20session%20at%20In5nite%20VR%2C%20Surat."
            target="_blank"
            rel="noopener noreferrer"
            className="font-orbitron font-bold text-sm tracking-widest uppercase px-12 py-4 transition-all duration-300 hover:-translate-y-1 mb-4 inline-block"
            style={{
              background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
              color: '#fff',
              borderRadius: '2px',
              boxShadow: '0 0 40px rgba(168,85,247,0.3)',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            BOOK YOUR SESSION →
          </a>

          <p className="text-white/25 text-xs tracking-widest uppercase mt-4">
            Walk in or call us — We're always ready
          </p>
        </motion.div>

      </div>
    </section>
  );
}
