import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gradient' | 'outline-cyan' | 'outline-purple';
  children: React.ReactNode;
}

const VARIANTS = {
  gradient: {
    background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 0 20px rgba(168,85,247,0.3)',
  },
  'outline-cyan': {
    background: 'transparent',
    color: '#22d3ee',
    border: '1px solid rgba(34,211,238,0.4)',
    boxShadow: 'none',
  },
  'outline-purple': {
    background: 'transparent',
    color: '#a855f7',
    border: '1px solid rgba(168,85,247,0.4)',
    boxShadow: 'none',
  },
} as const;

/** Branded CTA button with gradient or outline variants */
export default function Button({ variant = 'gradient', children, className = '', style, ...props }: ButtonProps) {
  const v = VARIANTS[variant];
  return (
    <button
      className={`font-orbitron font-bold text-xs tracking-widest uppercase px-6 py-3.5 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${className}`}
      style={{ borderRadius: '4px', ...v, ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
