import { motion } from 'framer-motion';
import React from 'react';

interface SectionHeadingProps {
  label: string;
  headingWhite: string;
  headingGradient: string;
  description?: string;
  centered?: boolean;
}

/** Reusable section header with label badge, gradient heading, and description */
export default function SectionHeading({
  label,
  headingWhite,
  headingGradient,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={centered ? 'text-center' : ''}
    >
      {/* Label */}
      <div className={`inline-flex items-center gap-2 mb-4 ${centered ? '' : 'flex'}`}>
        <div className="h-px w-8 bg-cyan-400/50" />
        <span className="text-cyan-400 text-xs tracking-[0.3em] uppercase font-medium">
          {label}
        </span>
        <div className="h-px w-8 bg-cyan-400/50" />
      </div>

      {/* Heading */}
      <h2 className="font-orbitron font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3">
        <span className="text-white">{headingWhite} </span>
        <span
          style={{
            background: 'linear-gradient(90deg, #22d3ee, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {headingGradient}
        </span>
      </h2>

      {/* Underline */}
      <div
        className={`${centered ? 'mx-auto' : ''} mt-4 mb-6 w-24 h-px`}
        style={{
          background: 'linear-gradient(90deg, transparent, #a855f7, transparent)',
        }}
      />

      {/* Description */}
      {description && (
        <p className={`text-white/45 text-base md:text-lg max-w-2xl leading-relaxed font-light ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
