'use client';
import { motion } from 'framer-motion';
import { CONTACT } from '../../config/contact';
import { MapPin, Phone, Mail, Navigation, Clock, Gamepad2, Map } from 'lucide-react';

export default function Location() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    'Hi! I want to book a VR session at In5nite VR, Surat.'
  )}`;

  return (
    <section id="contact" className="relative py-20 lg:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #030308 0%, #080510 50%, #030308 100%)' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, #00F5FF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(0,245,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute -bottom-20 -right-20 pointer-events-none" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 mb-6" style={{ border: '1px solid rgba(236,72,153,0.3)', background: 'rgba(236,72,153,0.05)', borderRadius: '100px', padding: '0.35rem 1.2rem', color: '#ec4899', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />Visit Us
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="font-orbitron font-black mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}>
            <span className="block text-white">READY TO</span>
            <span className="block" style={{ background: 'linear-gradient(90deg, #22d3ee, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ENTER THE GAME?</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Step into India’s first free-roam multiplayer VR arcade in Surat — walk in, call us, or book your session online.
          </motion.p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          
          {/* Left Column: Details & Actions */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="lg:col-span-3 flex flex-col justify-between p-8 md:p-10 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            
            {/* Subtle glow inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-cyan)] opacity-[0.03] blur-[80px] pointer-events-none rounded-full" />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-8 mb-10">
                {/* Address */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4 text-[var(--color-brand-cyan)]">
                    <MapPin size={20} />
                    <h3 className="font-orbitron tracking-widest text-sm font-bold uppercase text-white">Location</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {CONTACT.address.line1}<br />
                    {CONTACT.address.line2}<br />
                    {CONTACT.address.line3}
                  </p>
                </div>

                {/* Opening Hours */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4 text-[var(--color-brand-purple)]">
                    <Clock size={20} />
                    <h3 className="font-orbitron tracking-widest text-sm font-bold uppercase text-white">Hours</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {CONTACT.openingHours || 'Open Daily: 11:00 AM – 11:00 PM'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <a href={`tel:${CONTACT.phone}`} aria-label="Call Us" className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-1 group" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none' }}>
                  <Phone size={14} className="text-[var(--color-brand-cyan)] group-hover:animate-pulse" /> Call Us
                </a>
                <a href={`mailto:${CONTACT.email}`} aria-label="Email Us" className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-1 group" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none' }}>
                  <Mail size={14} className="text-[var(--color-brand-purple)] group-hover:animate-pulse" /> Email Us
                </a>
              </div>

              {/* Trust Chips */}
              <div className="flex flex-wrap gap-2 mb-10">
                {['Walk-ins Welcome', 'Group Bookings', 'Birthday Events', 'Corporate Visits'].map((chip, idx) => (
                  <span key={idx} className="text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 transition-colors duration-300">
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 relative z-10 pt-6 border-t border-white/5">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 font-orbitron font-bold text-sm tracking-widest uppercase px-6 py-4 transition-all duration-300 hover:-translate-y-1 rounded-xl text-center" style={{ background: 'linear-gradient(135deg, #22d3ee, #a855f7)', color: '#fff', boxShadow: '0 0 30px rgba(168,85,247,0.25)', textDecoration: 'none' }}>
                <Gamepad2 size={18} /> Book Session
              </a>
              <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 font-orbitron font-bold text-sm tracking-widest uppercase px-6 py-4 transition-all duration-300 hover:-translate-y-1 rounded-xl text-center" style={{ background: 'transparent', border: '1px solid rgba(34, 211, 238, 0.4)', color: '#22d3ee', textDecoration: 'none' }}>
                <Navigation size={18} /> Get Directions
              </a>
            </div>

          </motion.div>

          {/* Right Column: Map Preview */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="lg:col-span-2 min-h-[240px] lg:min-h-[280px] w-full rounded-[24px] overflow-hidden relative group flex" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
            
            {CONTACT.mapsEmbedUrl ? (
              <iframe 
                src={CONTACT.mapsEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(100%) opacity(0.8)' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="In5nite VR Location Map"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 text-center" style={{ background: 'radial-gradient(circle at center, rgba(34,211,238,0.05) 0%, transparent 70%)' }}>
                <div className="w-16 h-16 rounded-full bg-[rgba(34,211,238,0.1)] flex items-center justify-center mb-4 border border-[rgba(34,211,238,0.2)] shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-transform duration-500 group-hover:scale-110">
                  <Map className="text-[var(--color-brand-cyan)]" size={28} />
                </div>
                <h3 className="font-orbitron tracking-widest uppercase text-white font-bold mb-2">Find us in Vesu, Surat</h3>
                <p className="text-white/50 text-xs mb-6 max-w-[200px]">Experience multiplayer free-roam VR at Canal Walk Shoppers.</p>
                <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-orbitron text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 hover:bg-[rgba(34,211,238,0.15)]" style={{ border: '1px solid rgba(34,211,238,0.4)', color: '#22d3ee', textDecoration: 'none' }}>
                  Open in Google Maps
                </a>
              </div>
            )}
            
            {/* Map Overlay Glow */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(3,3,8,0.8)]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
