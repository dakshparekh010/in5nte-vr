/** Booking / enquiry form state */
export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  players: string;
  date: string;
  time: string;
  experience: string;
  message: string;
}

/** Per-field validation errors */
export type BookingErrors = Record<string, string>;
