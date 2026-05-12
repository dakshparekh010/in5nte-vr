import type { VRDeviceService } from '../types/device';

/**
 * Device service — placeholder for future backend integration.
 *
 * Currently device data is static config. When a backend/CMS is added,
 * implement these methods to fetch dynamic device listings.
 */

/** Fetch available VR device services */
export async function getDeviceServices(): Promise<VRDeviceService[]> {
  // TODO: GET from /api/devices or CMS
  const { VR_DEVICE_SERVICES } = await import('../config/vrDevices');
  return VR_DEVICE_SERVICES;
}
