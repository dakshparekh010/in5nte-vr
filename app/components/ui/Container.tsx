import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/** Consistent max-width page container with responsive padding */
export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 ${className}`}>
      {children}
    </div>
  );
}
