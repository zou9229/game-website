import { getAllConfigs } from '@/modules/config/service';

import { Crisp } from './crisp';
import { Tawk } from './tawk';

type ConfigMap = Record<string, string>;

export async function CustomerService({
  configs,
}: {
  configs?: ConfigMap;
} = {}) {
  const resolvedConfigs = configs ?? (await getAllConfigs());

  const crispEnabled = resolvedConfigs.crisp_enabled === 'true';
  const crispWebsiteId = resolvedConfigs.crisp_website_id?.trim();

  const tawkEnabled = resolvedConfigs.tawk_enabled === 'true';
  const tawkPropertyId = resolvedConfigs.tawk_property_id?.trim();
  const tawkWidgetId = resolvedConfigs.tawk_widget_id?.trim();

  if (!crispEnabled && !tawkEnabled) return null;

  return (
    <>
      {crispEnabled && crispWebsiteId ? (
        <Crisp websiteId={crispWebsiteId} />
      ) : null}
      {tawkEnabled && tawkPropertyId && tawkWidgetId ? (
        <Tawk propertyId={tawkPropertyId} widgetId={tawkWidgetId} />
      ) : null}
    </>
  );
}
