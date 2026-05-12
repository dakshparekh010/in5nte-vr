/**
 * Enquiry service — placeholder for future backend integration.
 *
 * Currently enquiries are handled via WhatsApp redirect.
 * When a backend is added, implement these methods to persist enquiries.
 */

export interface Enquiry {
  id?: string;
  type: 'purchase' | 'rental' | 'general';
  name: string;
  phone: string;
  email?: string;
  message?: string;
  createdAt?: string;
}

/** Submit a new enquiry */
export async function submitEnquiry(_data: Enquiry): Promise<{ success: boolean }> {
  // TODO: POST to /api/enquiries or Firebase
  return { success: true };
}

/** Fetch all enquiries (admin panel) */
export async function getEnquiries(): Promise<Enquiry[]> {
  // TODO: GET from /api/enquiries or Firebase
  return [];
}
