/** Experience types available in the booking dropdown */
export const EXPERIENCE_OPTIONS = [
  'VR Gaming',
  'Free Roam Multiplayer',
  'Family VR Fun',
  'Outdoor VR Events',
  'Custom VR Solution',
  'VR Device Purchase Enquiry',
  'VR Device Rental Enquiry',
] as const;

export type ExperienceOption = (typeof EXPERIENCE_OPTIONS)[number];
