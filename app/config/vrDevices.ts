import type { VRDeviceService, FeatureChip } from '../types/device';

export const VR_DEVICE_SERVICES: VRDeviceService[] = [
  {
    title: 'Buy VR Devices',
    description:
      'For gaming zones, arcades, training labs, entertainment businesses, and tech spaces that want to launch their own VR experience.',
    image: '/images/devices/buy-vr-devices.png',
    bestFor: 'Gaming zones, arcades, training labs, entertainment businesses',
    bullets: [
      'Device guidance',
      'Setup support',
      'Business consultation',
      'Experience planning',
    ],
    ctaLabel: 'Enquire to Buy',
    enquiryType: 'VR Device Purchase Enquiry',
    accentColor: '#22d3ee',
    glowColor: 'rgba(34,211,238,0.12)',
    borderColor: 'rgba(34,211,238,0.25)',
  },
  {
    title: 'Rent VR Devices',
    description:
      'For events, exhibitions, colleges, schools, private parties, corporate activations, and promotional campaigns.',
    image: '/images/devices/rent-vr-devices.png',
    bestFor: 'Events, exhibitions, colleges, corporate activations, private parties',
    bullets: [
      'Event-ready VR kits',
      'Flexible rental duration',
      'Installation support',
      'Technical guidance',
    ],
    ctaLabel: 'Enquire to Rent',
    enquiryType: 'VR Device Rental Enquiry',
    accentColor: '#a855f7',
    glowColor: 'rgba(168,85,247,0.12)',
    borderColor: 'rgba(168,85,247,0.25)',
  },
];

export const VR_DEVICE_FEATURES: FeatureChip[] = [
  { label: 'Full Setup Support', icon: '🔧' },
  { label: 'Event-Ready VR Kits', icon: '📦' },
  { label: 'Multiplayer Experience', icon: '👥' },
  { label: 'Technical Guidance', icon: '🎯' },
  { label: 'Flexible Rental Duration', icon: '⏱️' },
  { label: 'Business Consultation', icon: '💼' },
  { label: 'Corporate Activations', icon: '🏢' },
  { label: 'College Events', icon: '🎓' },
  { label: 'Exhibition Ready', icon: '🌐' },
];
