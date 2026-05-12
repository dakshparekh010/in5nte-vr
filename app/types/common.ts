/** Feature card in the Features section */
export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  color: string;
  glow: string;
  border: string;
}

/** Stat entry in the Stats section */
export interface StatItem {
  value: string;
  label: string;
  color: string;
}

/** HeroCanvas chapter (scroll-linked text overlay) */
export interface HeroChapter {
  range: number[];
  badge: string;
  headline1: string;
  headline2: string;
  tagline: string;
  body: string;
  showButtons: boolean;
}

/** Contact info block */
export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  email: string;
  whatsappNumber: string;
  address: {
    line1: string;
    line2: string;
    line3: string;
  };
  mapsUrl: string;
  mapsEmbedUrl?: string;
  openingHours?: string;
}
