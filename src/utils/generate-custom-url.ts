import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export function validateUrl(original: string) {
  if (!original.endsWith('.com')) {
    return undefined;
  }
  if (original.startsWith('http://') || original.startsWith('https://')) {
    return original;
  }
  return 'http://' + original;
}

function generate(originalUrl: string) {
  const hash = crypto
    .createHash('md5')
    .update(originalUrl + uuidv4())
    .digest('base64')
    .substring(0, 6);
  return hash.replace(/\+/g, '0').replace(/\//g, '1');
}

export function generateShort(originalUrl: string, alias?: string) {
  return alias ? alias : generate(originalUrl);
}
