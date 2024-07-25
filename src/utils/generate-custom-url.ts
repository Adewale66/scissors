import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
export function generateUrl(originalUrl) {
  const hash = crypto
    .createHash('md5')
    .update(originalUrl + uuidv4())
    .digest('base64')
    .substring(0, 6);
  return hash.replace(/\+/g, '0').replace(/\//g, '1');
}

export function validateUrl(original: string) {
  const url =
    original.startsWith('http://') || original.startsWith('https://')
      ? original
      : `https://${original}`;
  try {
    new URL(url);
    return url;
  } catch (error) {
    return undefined;
  }
}

export function generateCustomUrl(originalUrl: string, custom: string) {
  const shortUrl = custom || generateUrl(originalUrl);
  return shortUrl;
}
