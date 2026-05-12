'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FEATURES } from '../../config/features';
import { hexToRgb, openBookingModal } from '../../lib/utils';

export default function Features() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      id="why-us"
      className="relative pt-20 pb-20 lg:pt-24 lg:pb-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #030308 0%, #07070F 60%, #030308 100%)' }}
    >
      {/* ── Background Decorations ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #00F5FF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,0,255,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent)' }} />

      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-px w-8 bg-cyan-400/50" />
          <span className="text-cyan-400 text-xs tracking-[0.3em] uppercase font-medium">Why Choose Us</span>
          <div className="h-px w-8 bg-cyan-400/50" />
        </div>
        <h2 className="font-orbitron font-black text-4xl md:text-5xl lg:text-6xl mb-2">
          <span className="text-white">Why </span>
          <span style={{ background: 'linear-gradient(90deg, #22d3ee, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>IN5NITE VR?</span>
        </h2>
        <div className="mx-auto mt-4 mb-6 w-24 h-px" style={{ background: 'linear-gradient(90deg, transparent, #a855f7, transparent)' }} />
        <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
          Step beyond ordinary gaming with India&apos;s first free-roam VR multiplayer experience,
          full body tracking, and immersive worlds built for players, groups, and events.
        </p>
      </div>

      {/* ── Cards Grid ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: hoveredCard === index ? `radial-gradient(ellipse at top left, ${feature.glow} 0%, rgba(7,7,15,0.95) 60%)` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${hoveredCard === index ? feature.border : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden',
                transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredCard === index ? `0 20px 60px ${feature.glow}, 0 0 0 1px ${feature.border}` : 'none',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', cursor: 'pointer',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: hoveredCard === index ? `linear-gradient(90deg, transparent, ${feature.color}, transparent)` : 'transparent', transition: 'all 0.4s ease' }} />
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '1.75rem', background: `rgba(${hexToRgb(feature.color)},0.1)`, border: `1px solid ${feature.border}`, boxShadow: hoveredCard === index ? `0 0 20px ${feature.glow}` : 'none', transition: 'all 0.4s ease' }}>
                {feature.icon}
              </div>
              <h3 className="font-orbitron" style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>{feature.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', fontWeight: 300 }}>{feature.description}</p>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '60px', height: '60px', background: `radial-gradient(circle at bottom right, ${feature.glow} 0%, transparent 70%)`, borderRadius: '0 0 16px 0' }} />
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="text-center mt-16">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-6">Ready to experience the future?</p>
          <button
            onClick={() => openBookingModal()}
            className="font-orbitron font-bold text-sm tracking-widest uppercase px-10 py-4 transition-all duration-300 hover:-translate-y-1"
            style={{ background: 'linear-gradient(135deg, #22d3ee, #a855f7)', color: '#fff', borderRadius: '2px', boxShadow: '0 0 30px rgba(168,85,247,0.3)' }}
          >
            Book Your Session →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
