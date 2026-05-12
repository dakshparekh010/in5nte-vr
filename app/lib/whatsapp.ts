import type { BookingFormData } from '../types/booking';
import { CONTACT } from '../config/contact';

/**
 * Build the WhatsApp message body from form data.
 * Includes source tracking for device enquiries.
 */
export function buildWhatsAppMessage(formData: BookingFormData): string {
  const isDeviceEnquiry = formData.experience.includes('VR Device');
  const greeting = isDeviceEnquiry
    ? `Hi In5nite VR, I'm interested in ${formData.experience}.`
    : 'Hi In5nite VR, I want to book a VR session.';

  return `${greeting}

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'N/A'}
Players: ${formData.players}
Date: ${formData.date}
Time: ${formData.time}
Experience: ${formData.experience}
Message: ${formData.message || 'N/A'}${isDeviceEnquiry ? '\nSource: Website VR Devices section' : ''}`;
}

/**
 * Build a full `wa.me` URL ready to open in a new tab.
 */
export function buildWhatsAppUrl(formData: BookingFormData): string {
  const text = buildWhatsAppMessage(formData);
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
