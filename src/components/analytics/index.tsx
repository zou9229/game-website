import { getAllConfigs } from '@/modules/config/service';

import { GoogleAnalytics } from './google-analytics';
import { Plausible } from './plausible';

type ConfigMap = Record<string, string>;

// Server component — reads the merged env+DB config (1h-cached in the
// config service, so no per-request DB hit) and renders whichever
// provider scripts have non-empty IDs configured. Drop this into the
// root layout's <body>; no client/admin gating yet (analytics IDs are
// public anyway and admin pages are a small slice of traffic).
export async function Analytics({ configs }: { configs?: ConfigMap } = {}) {
  const resolvedConfigs = configs ?? (await getAllConfigs());
  const gaId = resolvedConfigs.google_analytics_id?.trim();
  const plausibleDomain = resolvedConfigs.plausible_domain?.trim();
  const plausibleSrc = resolvedConfigs.plausible_src?.trim();

  if (!gaId && !plausibleDomain) {
    return null;
  }

  return (
    <>
      {gaId ? <GoogleAnalytics measurementId={gaId} /> : null}
      {plausibleDomain ? (
        <Plausible domain={plausibleDomain} src={plausibleSrc || undefined} />
      ) : null}
    </>
  );
}
