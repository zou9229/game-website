import { getAllConfigs } from '@/modules/config/service';
import {
  isValidAdSensePublisherId,
  normalizeAdSenseClientId,
} from '@/lib/adsense';

type ConfigMap = Record<string, string>;

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

export async function ConfiguredGoogleAdSense({
  configs,
}: {
  configs?: ConfigMap;
} = {}) {
  const resolvedConfigs = configs ?? (await getAllConfigs());
  const adsenseEnabled = resolvedConfigs.google_adsense_enabled === 'true';
  const adsensePublisherId =
    resolvedConfigs.google_adsense_publisher_id?.trim();

  if (!adsenseEnabled || !adsensePublisherId) return null;

  return <GoogleAdSense publisherId={adsensePublisherId} />;
}
