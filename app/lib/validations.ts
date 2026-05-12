import type { BookingFormData, BookingErrors } from '../types/booking';

/**
 * Validate booking form data. Returns an errors map
 * (empty = valid).
 */
export function validateBookingForm(data: BookingFormData): BookingErrors {
  const errors: BookingErrors = {};
  if (!data.name.trim()) errors.name = 'Required';
  if (!data.phone.trim()) errors.phone = 'Required';
  if (!data.players) errors.players = 'Required';
  if (!data.date) errors.date = 'Required';
  if (!data.time) errors.time = 'Required';
  if (!data.experience) errors.experience = 'Required';
  return errors;
}
