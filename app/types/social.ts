/** Supported social icon keys — maps to SVG/lucide components in Footer */
export type SocialIconKey =
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'linkedin'
  | 'twitter'
  | 'whatsapp'
  | 'map-pin';

/** Social media link entry */
export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIconKey;
}
