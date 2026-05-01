'use client';
import { motion } from 'framer-motion';

export default function Location() {
  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-[#05050c] to-[#030308] relative z-30">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block border border-[var(--color-brand-magenta)] text-[var(--color-brand-magenta)] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(255,0,128,0.2)]">
            Visit Us
          </div>
          
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            READY TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-cyan)] via-[var(--color-brand-purple)] to-[var(--color-brand-magenta)]">
              ENTER THE GAME?
            </span>
          </h2>

          <p className="text-[rgba(255,255,255,0.7)] text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            UG-1 In5nite VR, Canal Walk Shoppers, <br className="hidden md:block" />
            Opp. LP Savani School, Vesu, Surat, Gujarat 395007
          </p>

          <button className="font-heading bg-gradient-to-r from-[var(--color-brand-cyan)] to-[var(--color-brand-purple)] text-white px-10 py-5 text-lg uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(139,0,255,0.5)] hover:shadow-[0_0_35px_rgba(139,0,255,0.8)] transition-all duration-300 transform hover:-translate-y-1 rounded-sm mb-8">
            Book Your Session
          </button>

          <p className="text-[rgba(255,255,255,0.4)] text-sm tracking-wide">
            Walk in or call us. We're always ready.
          </p>
        </motion.div>
        
      </div>
    </section>
  );
}
