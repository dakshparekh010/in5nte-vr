'use client';
import { motion } from 'framer-motion';
import { Headset, Activity, Users } from 'lucide-react';

const features = [
  {
    icon: <Headset className="w-10 h-10 text-[var(--color-brand-cyan)]" />,
    title: "Free Roam VR",
    description: "Move freely, no wires, full immersion. Experience virtual worlds without boundaries."
  },
  {
    icon: <Activity className="w-10 h-10 text-[var(--color-brand-purple)]" />,
    title: "Full Body Tracking",
    description: "India's first. Your entire body in the game for true unparalleled realism."
  },
  {
    icon: <Users className="w-10 h-10 text-[var(--color-brand-magenta)]" />,
    title: "Multiplayer",
    description: "Play with friends in shared virtual worlds. Team up, fight, and survive together."
  }
];

export default function Features() {
  return (
    <section id="experience" className="py-24 bg-[var(--color-brand-dark)] relative z-30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            WHY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-cyan)] to-[var(--color-brand-purple)]">IN5NITE VR?</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-brand-cyan)] to-[var(--color-brand-purple)] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#0a0a14]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.05)] p-10 rounded-xl group hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_25px_rgba(0,245,255,0.15)] transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="mb-6 bg-[#13131f] w-20 h-20 rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.05)] group-hover:scale-110 group-hover:border-[var(--color-brand-cyan)] transition-transform duration-500">
                {feat.icon}
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-4 tracking-wide group-hover:text-[var(--color-brand-cyan)] transition-colors">
                {feat.title}
              </h3>
              <p className="text-[rgba(255,255,255,0.6)] leading-relaxed font-light">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
