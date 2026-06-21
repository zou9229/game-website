const ADSENSE_PUBLISHER_ID_PATTERN = /^pub-\d{16}$/;

export function normalizeAdSensePublisherId(value?: string): string {
  const raw = (value || '').trim();
  if (!raw) return '';
  return raw.startsWith('ca-') ? raw.slice(3) : raw;
}

export function normalizeAdSenseClientId(value?: string): string {
  const publisherId = normalizeAdSensePublisherId(value);
  return publisherId ? `ca-${publisherId}` : '';
}

export function isValidAdSensePublisherId(value?: string): boolean {
  const publisherId = normalizeAdSensePublisherId(value);
  return ADSENSE_PUBLISHER_ID_PATTERN.test(publisherId);
}
