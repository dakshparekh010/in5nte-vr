'use client';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: "VR Gaming",
    desc: "Action-packed shooters and survival horror.",
  },
  {
    title: "VR City Tour",
    desc: "Explore futuristic cities and distant planets.",
  },
  {
    title: "VR Education",
    desc: "Immersive learning in historical eras.",
  },
  {
    title: "Outdoor VR Events",
    desc: "Custom pop-up arenas for special events.",
  }
];

export default function Experiences() {
  return (
    <section id="games" className="py-24 bg-[#05050c] relative z-30 border-t border-[rgba(255,255,255,0.03)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:flex justify-between items-end"
        >
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-cyan)] to-[var(--color-brand-purple)]">EXPERIENCES</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-brand-cyan)] to-[var(--color-brand-purple)] rounded-full"></div>
          </div>
          <button className="hidden md:block font-heading text-[var(--color-brand-cyan)] border-b border-[var(--color-brand-cyan)] pb-1 hover:text-white transition-colors uppercase tracking-widest text-sm">
            View All Games
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer relative rounded-xl overflow-hidden bg-[#0a0a14] border border-[rgba(255,255,255,0.05)] hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all duration-500"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-[#101018] to-[#080810] relative overflow-hidden">
                <div className="absolute inset-0 bg-[var(--color-brand-cyan)] opacity-0 group-hover:opacity-10 transition-opacity duration-500 mix-blend-overlay"></div>
                {/* Simulated scanline effect on hover */}
                <div className="absolute inset-0 translate-y-[-100%] group-hover:translate-y-[100%] bg-gradient-to-b from-transparent via-[rgba(0,245,255,0.1)] to-transparent transition-transform duration-1000 ease-linear"></div>
              </div>
              
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-white mb-2 tracking-wide group-hover:text-[var(--color-brand-cyan)] transition-colors">
                  {exp.title}
                </h3>
                <p className="text-[rgba(255,255,255,0.5)] text-sm mb-6 leading-relaxed">
                  {exp.desc}
                </p>
                <div className="inline-flex items-center text-[var(--color-brand-cyan)] text-sm font-semibold uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">
                  Play Now <span className="ml-2">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <button className="font-heading text-[var(--color-brand-cyan)] border border-[var(--color-brand-cyan)] px-6 py-3 rounded-sm hover:bg-[var(--color-brand-cyan)] hover:text-[#030308] transition-colors uppercase tracking-widest text-sm w-full">
            View All Games
          </button>
        </div>

      </div>
    </section>
  );
}
