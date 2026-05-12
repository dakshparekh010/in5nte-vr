/** VR device service card data (Buy / Rent) */
export interface VRDeviceService {
  title: string;
  description: string;
  image: string;
  bestFor: string;
  bullets: string[];
  ctaLabel: string;
  /** Dispatched to BookingModal as the experience type */
  enquiryType: string;
  accentColor: string;
  glowColor: string;
  borderColor: string;
}

/** Small tag/chip shown in the VR Devices section */
export interface FeatureChip {
  label: string;
  icon: string;
}
