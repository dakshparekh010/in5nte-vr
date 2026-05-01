'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const EXPERIENCES = [
  {
    image: '/images/experiences/vr-gaming.jpg',
    title: 'VR Gaming',
    description: 'Action-packed shooters, survival missions, and adrenaline-filled virtual battles.',
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.12)',
    border: 'rgba(34,211,238,0.25)',
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 40%, #0d1b3e 100%)',
  },
  {
    image: '/images/experiences/vr-city-tour.jpg',
    title: 'VR City Tour',
    description: 'Explore futuristic cities, virtual spaces, and immersive architectural worlds.',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.12)',
    border: 'rgba(168,85,247,0.25)',
    gradient: 'linear-gradient(135deg, #0a1a1a 0%, #0a2e2a 40%, #0d3e35 100%)',
  },
  {
    image: '/images/experiences/vr-education.jpg',
    title: 'VR Education',
    description: 'Make learning interactive with historical eras, science concepts, and virtual classrooms.',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.12)',
    border: 'rgba(236,72,153,0.25)',
    gradient: 'linear-gradient(135deg, #1a1500 0%, #2e2500 40%, #1a3000 100%)',
  },
  {
    image: '/images/experiences/outdoor-vr-events.jpg',
    title: 'Outdoor VR Events',
    description: 'Custom pop-up VR arenas for colleges, corporate events, malls, and brand activations.',
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.12)',
    border: 'rgba(34,211,238,0.25)',
    gradient: 'linear-gradient(135deg, #1a0010 0%, #2e0020 40%, #1a0030 100%)',
  },
  {
    image: '/images/experiences/free-roam-multiplayer.jpg',
    title: 'Free Roam Multiplayer',
    description: 'Move without wires and play team-based VR missions with your friends.',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.12)',
    border: 'rgba(168,85,247,0.25)',
    gradient: 'linear-gradient(135deg, #0d0a1a 0%, #1a0a3e 40%, #0a0d2e 100%)',
  },
  {
    image: '/images/experiences/family-vr-fun.jpg',
    title: 'Family VR Fun',
    description: 'Safe, exciting, and memorable VR experiences for friends, families, and groups.',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.12)',
    border: 'rgba(236,72,153,0.25)',
    gradient: 'linear-gradient(135deg, #1a0a10 0%, #2e1020 40%, #1a0a1a 100%)',
  },
];

const openBookingModal = (experience?: string) => {
  window.dispatchEvent(new CustomEvent('open-booking', { detail: { experience } }));
};

function ExperienceCard({ exp, index }: { exp: typeof EXPERIENCES[0], index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => openBookingModal(exp.title)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openBookingModal(exp.title);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Book ${exp.title} experience`}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${hovered ? exp.border : 'rgba(255,255,255,0.06)'}`,
        background: 'rgba(255,255,255,0.02)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? `0 24px 60px ${exp.glow}` : 'none',
        transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Visual area — 220px tall on desktop */}
      <div className="h-[180px] sm:h-[220px] relative shrink-0 overflow-hidden" style={{ background: exp.gradient }}>
        {/* Actual Image */}
        <Image
          src={exp.image}
          alt={exp.title}
          fill
          className="object-cover transition-transform duration-700 ease-out"
          style={{
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Top shimmer line on hover */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: hovered
            ? `linear-gradient(90deg, transparent, ${exp.color}, transparent)`
            : 'transparent',
          transition: 'all 0.4s ease',
          zIndex: 10,
        }} />

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px',
          background: 'linear-gradient(to bottom, transparent, rgba(7,7,15,1))',
          zIndex: 10,
        }} />

        {/* Corner radial glow on hover */}
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at center, ${exp.glow} 0%, transparent 70%)`,
            zIndex: 10,
          }} />
        )}
      </div>

      {/* Card body */}
      <div style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
        <h3 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '0.6rem',
          letterSpacing: '0.04em',
        }}>
          {exp.title}
        </h3>

        <p style={{
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.45)',
          lineHeight: '1.7',
          fontWeight: 300,
          flex: 1,
          marginBottom: '1.25rem',
        }}>
          {exp.description}
        </p>

        {/* Play Now CTA visual */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: hovered ? '10px' : '6px',
          color: exp.color,
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily: 'Orbitron, sans-serif',
          transition: 'gap 0.3s ease',
        }}>
          PLAY NOW <span>→</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experiences() {
  return (
    <section
      id="games"
      className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden scroll-mt-28"
      style={{
        background: 'linear-gradient(180deg, #030308 0%, #07070F 60%, #030308 100%)',
      }}
    >
      {/* Background decorations */}

      {/* 1. Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #00F5FF 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* 2. Cyan orb — top right */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 3. Violet orb — bottom left */}
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,0,255,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 4. Neon divider — top edge */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* ── Section header ──────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Label */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-cyan-400/50" />
              <span className="text-cyan-400 text-xs tracking-[0.3em] uppercase font-medium">
                Immersive Worlds
              </span>
              <div className="h-px w-8 bg-cyan-400/50" />
            </div>

            {/* Heading */}
            <h2 className="font-orbitron font-black text-4xl md:text-5xl lg:text-6xl mb-3">
              <span className="text-white">OUR </span>
              <span
                style={{
                  background:
                    'linear-gradient(90deg, #22d3ee, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                EXPERIENCES
              </span>
            </h2>

            {/* Accent underline */}
            <div
              className="w-16 h-px mb-6"
              style={{
                background: 'linear-gradient(90deg, #a855f7, transparent)',
              }}
            />

            {/* Intro paragraph */}
            <p className="text-white/45 text-base max-w-xl leading-relaxed font-light">
              Choose your reality — from action-packed VR battles and futuristic city tours
              to educational simulations and outdoor event experiences.
            </p>
          </motion.div>

          {/* View All Games — desktop */}
          <motion.button
            onClick={() => openBookingModal()}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:inline-flex items-center gap-2 mt-4 lg:mt-0 cursor-pointer"
            style={{
              color: '#22d3ee',
              fontSize: '0.78rem',
              fontFamily: 'Orbitron, sans-serif',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
              paddingBottom: '3px',
              textDecoration: 'none',
              transition: 'border-color 0.3s',
              background: 'none',
              border: 'none',
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderBottomColor: 'rgba(34,211,238,0.3)'
            }}
          >
            VIEW ALL GAMES →
          </motion.button>
        </div>

        {/* ── Cards grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCES.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>

        {/* View All Games — mobile */}
        <div className="flex justify-center mt-10 lg:hidden">
          <button
            onClick={() => openBookingModal()}
            className="cursor-pointer"
            style={{
              color: '#22d3ee',
              fontSize: '0.78rem',
              fontFamily: 'Orbitron, sans-serif',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
              paddingBottom: '3px',
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderBottomColor: 'rgba(34,211,238,0.3)'
            }}
          >
            VIEW ALL GAMES →
          </button>
        </div>
      </div>
    </section>
  );
}
