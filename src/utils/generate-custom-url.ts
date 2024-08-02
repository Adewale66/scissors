import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export function validateUrl(original: string) {
  let fullUrl = original;

  if (!original.startsWith('http://') && !original.startsWith('https://')) {
    fullUrl = 'http://' + original;
  }

  const regex = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i',
  );
  if (regex.test(fullUrl)) {
    return fullUrl;
  }
  return null;
}

function generate(originalUrl: string) {
  const hash = crypto
    .createHash('md5')
    .update(originalUrl + uuidv4())
    .digest('base64')
    .substring(0, 5);
  return hash.replace(/\+/g, '0').replace(/\//g, '1');
}

export function generateShort(originalUrl: string, alias?: string) {
  return alias ? alias : generate(originalUrl);
}
