import { headers } from 'next/headers';
import {
  getFreshnessAgeDays,
  getFreshnessStatus,
  ninetyNineNightsFreshnessEntries,
} from '@/data/99-nights-freshness';

import { getAuth } from '@/core/auth';
import { hasPermission } from '@/modules/rbac/service';
import { respData, respErr } from '@/lib/resp';

export async function GET() {
  try {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return respErr('Unauthorized');

    const isAdmin = await hasPermission(session.user.id, 'admin.settings.read');
    if (!isAdmin) return respErr('Forbidden');

    const generatedAt = new Date().toISOString();
    const items = ninetyNineNightsFreshnessEntries.map((entry) => ({
      ...entry,
      ageDays: getFreshnessAgeDays(entry.checkedAt),
      status: getFreshnessStatus(entry),
    }));

    return respData({
      generatedAt,
      summary: {
        total: items.length,
        fresh: items.filter((item) => item.status === 'fresh').length,
        dueSoon: items.filter((item) => item.status === 'due-soon').length,
        stale: items.filter((item) => item.status === 'stale').length,
        automationCandidates: items.filter(
          (item) => item.owner === 'automation-candidate'
        ).length,
      },
      items,
      nextStep:
        'This endpoint performs a safe read-only freshness audit. It does not mutate source data or trigger deployment.',
    });
  } catch (error: any) {
    return respErr(error.message || 'Internal error');
  }
}
