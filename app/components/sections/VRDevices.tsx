'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, ShoppingCart, CalendarClock, Zap, Wrench, Headphones } from 'lucide-react';
import { VR_DEVICE_SERVICES, VR_DEVICE_FEATURES } from '../../config/vrDevices';
import { openBookingModal } from '../../lib/utils';
import type { VRDeviceService } from '../../types/device';
import Image from 'next/image';

function ServiceCard({ service, index }: { service: VRDeviceService; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = index === 0 ? ShoppingCart : CalendarClock;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: hovered
          ? `radial-gradient(ellipse at top left, ${service.glowColor} 0%, rgba(7,7,15,0.95) 60%)`
          : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? service.borderColor : 'rgba(255,255,255,0.06)'}`,
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 24px 60px ${service.glowColor}, 0 0 0 1px ${service.borderColor}`
          : 'none',
        transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{
          background: hovered
            ? `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)`
            : 'transparent',
          transition: 'all 0.4s ease',
        }}
      />
      <div className="relative w-full h-48 sm:h-56 overflow-hidden shrink-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(7,7,15,1))' }}
        />
        {hovered && (
          <div
            className="absolute inset-0 z-10"
            style={{
              background: `radial-gradient(circle at center, ${service.glowColor} 0%, transparent 70%)`,
            }}
          />
        )}
      </div>
      <div className="p-6 sm:p-8 flex flex-col flex-1 relative z-20 -mt-8">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 relative z-30"
          style={{
            background: service.glowColor,
            border: `1px solid ${service.borderColor}`,
            boxShadow: hovered ? `0 0 20px ${service.glowColor}` : 'none',
            transition: 'all 0.4s ease',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Icon size={24} style={{ color: service.accentColor }} />
        </div>
        <h3
          className="font-orbitron font-bold text-xl sm:text-2xl mb-2"
          style={{ color: '#ffffff', letterSpacing: '0.04em' }}
        >
          {service.title}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed font-light mb-4">
          {service.description}
        </p>
        <div className="mb-6">
          <span
            className="text-xs uppercase tracking-widest font-semibold"
            style={{ color: service.accentColor }}
          >
            Best For:
          </span>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">{service.bestFor}</p>
        </div>
        <ul className="space-y-3 mb-8 flex-1">
          {service.bullets.map((b: string) => (
            <li key={b} className="flex items-start gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: service.glowColor,
                  border: `1px solid ${service.borderColor}`,
                }}
              >
                <Check size={12} style={{ color: service.accentColor }} />
              </div>
              <span className="text-white/60 text-sm">{b}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => openBookingModal(service.enquiryType)}
          className="font-orbitron font-bold text-xs tracking-widest uppercase px-6 py-3.5 w-full transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${service.accentColor}, ${index === 0 ? '#a855f7' : '#ec4899'})`,
            color: '#fff',
            borderRadius: '4px',
            boxShadow: `0 0 20px ${service.glowColor}`,
            border: 'none',
          }}
          aria-label={service.ctaLabel}
        >
          {service.ctaLabel}
        </button>
      </div>
      <div
        className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at bottom right, ${service.glowColor} 0%, transparent 70%)`,
          borderRadius: '0 0 16px 0',
        }}
      />
    </motion.div>
  );
}

const benefitChips = [
  { icon: Zap, label: 'Fast Enquiry', color: '#22d3ee' },
  { icon: Wrench, label: 'Setup Guidance', color: '#a855f7' },
  { icon: Headphones, label: 'Event Support', color: '#ec4899' },
];

function CTABlock() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      {/* Gradient border wrapper */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            'linear-gradient(135deg, rgba(34,211,238,0.25), rgba(168,85,247,0.25), rgba(236,72,153,0.15), rgba(34,211,238,0.15))',
          padding: '1px',
        }}
      >
        <div className="w-full h-full rounded-2xl" style={{ background: '#07070F' }} />
      </div>

      {/* Animated glow border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(168,85,247,0.15), rgba(236,72,153,0.1))',
          padding: '1px',
          filter: isHovered ? 'blur(0px)' : 'blur(0px)',
          transition: 'filter 0.4s ease',
        }}
      >
        <div className="w-full h-full rounded-2xl" />
      </div>

      {/* Main CTA card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at top center, rgba(34,211,238,0.06) 0%, rgba(168,85,247,0.04) 40%, rgba(7,7,15,0.98) 80%)',
          border: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
          boxShadow: isHovered
            ? '0 30px 80px rgba(34,211,238,0.08), 0 30px 80px rgba(168,85,247,0.08), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px pointer-events-none"
          style={{
            width: '60%',
            background:
              'linear-gradient(90deg, transparent, rgba(34,211,238,0.5), rgba(168,85,247,0.5), transparent)',
          }}
        />

        {/* Background decorative radial */}
        <div
          className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 md:px-16 md:py-16 text-center">
          {/* Premium badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div
              className="h-px w-6"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(34,211,238,0.6))',
              }}
            />
            <span
              className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-semibold px-3 py-1 rounded-full"
              style={{
                color: '#22d3ee',
                background: 'rgba(34,211,238,0.08)',
                border: '1px solid rgba(34,211,238,0.15)',
              }}
            >
              VR Solutions
            </span>
            <div
              className="h-px w-6"
              style={{
                background:
                  'linear-gradient(270deg, transparent, rgba(34,211,238,0.6))',
              }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="font-orbitron text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight"
            style={{
              color: '#ffffff',
            }}
          >
            Need VR for your{' '}
            <span
              style={{
                background:
                  'linear-gradient(90deg, #22d3ee, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              event or business?
            </span>
          </motion.h3>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-white/40 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light mb-8"
          >
            Rent devices, buy a complete VR setup, or book an arcade experience — our team helps
            you choose the right solution.
          </motion.p>

          {/* Benefit chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10"
          >
            {benefitChips.map((chip) => {
              const ChipIcon = chip.icon;
              return (
                <div
                  key={chip.label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  <ChipIcon size={14} style={{ color: chip.color }} />
                  <span className="tracking-wide">{chip.label}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-2xl mx-auto"
          >
            <button
              onClick={() => openBookingModal('VR Device Rental Enquiry')}
              className="font-orbitron font-bold text-xs tracking-widest uppercase px-6 py-3.5 w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                color: '#fff',
                borderRadius: '6px',
                boxShadow:
                  '0 0 24px rgba(168,85,247,0.25), 0 4px 16px rgba(168,85,247,0.2)',
                border: 'none',
                minHeight: '48px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 0 32px rgba(168,85,247,0.4), 0 8px 24px rgba(168,85,247,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 0 24px rgba(168,85,247,0.25), 0 4px 16px rgba(168,85,247,0.2)';
              }}
            >
              Rent VR Devices
            </button>
            <button
              onClick={() => openBookingModal('VR Device Purchase Enquiry')}
              className="font-orbitron font-bold text-xs tracking-widest uppercase px-6 py-3.5 w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              style={{
                background: 'rgba(34,211,238,0.08)',
                color: '#22d3ee',
                borderRadius: '6px',
                border: '1px solid rgba(34,211,238,0.3)',
                minHeight: '48px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(34,211,238,0.12)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(34,211,238,0.15)';
                e.currentTarget.style.borderColor = 'rgba(34,211,238,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(34,211,238,0.08)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)';
              }}
            >
              Buy VR Setup
            </button>
            <button
              onClick={() => openBookingModal()}
              className="font-orbitron font-bold text-xs tracking-widest uppercase px-6 py-3.5 w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              style={{
                background: 'rgba(168,85,247,0.06)',
                color: '#a855f7',
                borderRadius: '6px',
                border: '1px solid rgba(168,85,247,0.25)',
                minHeight: '48px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(168,85,247,0.1)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(168,85,247,0.15)';
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(168,85,247,0.06)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.25)';
              }}
            >
              Book Arcade Experience
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function VRDevices() {
  return (
    <section
      id="vr-devices"
      className="relative py-20 lg:py-28 overflow-hidden scroll-mt-28"
      style={{
        background:
          'linear-gradient(180deg, #030308 0%, #07070F 40%, #0a0514 70%, #030308 100%)',
      }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #00F5FF 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '800px',
          height: '500px',
          background:
            'radial-gradient(ellipse, rgba(0,245,255,0.04) 0%, rgba(139,0,255,0.03) 50%, transparent 80%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Bottom-right glow */}
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,0,255,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Top center line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-cyan-400/50" />
              <span className="text-cyan-400 text-xs tracking-[0.3em] uppercase font-medium">
                VR Solutions
              </span>
              <div className="h-px w-8 bg-cyan-400/50" />
            </div>
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3">
              <span className="text-white">VR DEVICES FOR </span>
              <span
                style={{
                  background: 'linear-gradient(90deg, #22d3ee, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                SALE &amp; RENT
              </span>
            </h2>
            <div
              className="mx-auto mt-4 mb-6 w-24 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #a855f7, transparent)' }}
            />
            <p className="text-white/45 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Bring immersive VR experiences to your event, business, or gaming zone with
              high-performance VR devices and complete setup support.
            </p>
          </motion.div>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {VR_DEVICE_SERVICES.map((s: VRDeviceService, i: number) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        {/* Feature chips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-20"
        >
          {VR_DEVICE_FEATURES.map((c: { icon: string; label: string }) => (
            <div
              key={c.label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              <span>{c.icon}</span>
              <span className="tracking-wide">{c.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Improved CTA Block */}
        <CTABlock />
      </div>
    </section>
  );
}
