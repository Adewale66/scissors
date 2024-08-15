import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 5 });
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

export function generateShort(originalUrl: string, alias?: string) {
  return alias ? alias : uid.rnd();
}
