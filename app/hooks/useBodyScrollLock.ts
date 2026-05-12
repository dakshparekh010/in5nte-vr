'use client';
import { useEffect } from 'react';

/**
 * Lock body scroll when `locked` is true.
 * Automatically restores scroll on unmount.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [locked]);
}
