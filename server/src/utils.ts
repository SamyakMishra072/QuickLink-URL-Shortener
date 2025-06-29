import { nanoid } from 'nanoid';

/**
 * Validates if a string is a valid URL
 */
export function validateUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Generates a short code for URLs
 */
export function generateShortCode(): string {
  // Using nanoid with custom alphabet for URL-safe characters
  // Length of 6 gives us 56.8 billion possible combinations
  return nanoid(6);
}

/**
 * Sanitizes URL by adding protocol if missing
 */
export function sanitizeUrl(url: string): string {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
}