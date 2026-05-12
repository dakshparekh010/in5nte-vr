/**
 * Map a hex color to an "R,G,B" string.
 * Used for rgba() construction in inline styles.
 */
export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '255,255,255';
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}

/**
 * Open the booking modal via the shared CustomEvent bus.
 * Optional `experience` pre-selects the dropdown.
 */
export function openBookingModal(experience?: string): void {
  window.dispatchEvent(
    new CustomEvent('open-booking', { detail: experience ? { experience } : undefined })
  );
}
