'use client';
import { motion } from 'framer-motion';

const stats = [
  { value: "2021", label: "Founded" },
  { value: "11-50", label: "Team" },
  { value: "1st", label: "India's First Free Roam" },
  { value: "Surat", label: "HQ" }
];

export default function Stats() {
  return (
    <section className="py-20 bg-[var(--color-brand-dark)] relative z-30 border-y border-[rgba(255,255,255,0.02)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center divide-x divide-[rgba(255,255,255,0.05)]">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center px-4"
            >
              <div className="font-heading text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-brand-cyan)] to-[var(--color-brand-purple)]">
                {stat.value}
              </div>
              <div className="text-[rgba(255,255,255,0.55)] text-sm md:text-base uppercase tracking-widest font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
