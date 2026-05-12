'use client';
import React, { useState } from 'react';

interface GlowCardProps {
  children: React.ReactNode;
  glowColor?: string;
  borderColor?: string;
  className?: string;
}

/** Glassmorphic card with hover glow + translateY effect */
export default function GlowCard({
  children,
  glowColor = 'rgba(34,211,238,0.12)',
  borderColor = 'rgba(34,211,238,0.25)',
  className = '',
}: GlowCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: hovered
          ? `radial-gradient(ellipse at top left, ${glowColor} 0%, rgba(7,7,15,0.95) 60%)`
          : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? borderColor : 'rgba(255,255,255,0.06)'}`,
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 24px 60px ${glowColor}, 0 0 0 1px ${borderColor}`
          : 'none',
        transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      {children}
    </div>
  );
}
