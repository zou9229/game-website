import {
  isValidAdSensePublisherId,
  normalizeAdSenseClientId,
} from '@/lib/adsense';

export function GoogleAdSense({ publisherId }: { publisherId: string }) {
  if (!isValidAdSensePublisherId(publisherId)) return null;

  const clientId = normalizeAdSenseClientId(publisherId);

  return (
    <script
      id="adsense-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
    />
  );
}
