'use client';
import { motion } from 'framer-motion';
import { STATS } from '../../config/stats';

export default function Stats() {
  return (
    <section id="stats" className="relative py-16 overflow-hidden" style={{ background: 'linear-gradient(180deg, #030308 0%, #0a0514 50%, #030308 100%)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: '700px', height: '200px', background: 'radial-gradient(ellipse, rgba(168,85,247,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)' }} />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center text-white/25 text-xs tracking-[0.3em] uppercase mb-12 font-medium">By The Numbers</motion.p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {STATS.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex flex-col items-center text-center relative">
              {index !== 0 && <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)' }} />}
              <span className="font-orbitron font-black text-5xl md:text-6xl mb-3" style={{ background: `linear-gradient(135deg, ${stat.color}, #ffffff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: `drop-shadow(0 0 20px ${stat.color}40)` }}>{stat.value}</span>
              <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.30)' }}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
