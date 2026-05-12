import type { BookingFormData } from '../types/booking';

/**
 * Booking service — placeholder for future Firebase/Supabase/API integration.
 *
 * Currently the booking flow is client-side only (WhatsApp redirect).
 * When a backend is added, implement these methods to persist bookings.
 */

/** Submit a new booking to the backend */
export async function submitBooking(_data: BookingFormData): Promise<{ success: boolean }> {
  // TODO: POST to /api/bookings or Firebase
  return { success: true };
}

/** Fetch all bookings (admin panel) */
export async function getBookings(): Promise<BookingFormData[]> {
  // TODO: GET from /api/bookings or Firebase
  return [];
}
