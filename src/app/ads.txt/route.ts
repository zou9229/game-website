import { getAllConfigs } from '@/modules/config/service';
import {
  isValidAdSensePublisherId,
  normalizeAdSensePublisherId,
} from '@/lib/adsense';

export const dynamic = 'force-dynamic';

export async function GET() {
  const configs = await getAllConfigs();
  const publisherId = normalizeAdSensePublisherId(
    configs.google_adsense_publisher_id
  );

  if (!isValidAdSensePublisherId(publisherId)) {
    return new Response('Google AdSense publisher ID is not configured.\n', {
      status: 404,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      },
    });
  }

  return new Response(
    `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`,
    {
      headers: {
        'cache-control': 'public, max-age=3600',
        'content-type': 'text/plain; charset=utf-8',
      },
    }
  );
}
