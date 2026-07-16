import { headers } from 'next/headers';
import { buildGameDataFreshnessAudit } from '@/data/game-data-audit';

import { getAuth } from '@/core/auth';
import { getLatestGameDataSourceCheck } from '@/modules/game-data-sync/service';
import { hasPermission } from '@/modules/rbac/service';
import { buildFreshnessOverridesFromSourceCheck } from '@/lib/game-data-source-check';
import { respData, respErr } from '@/lib/resp';

export async function GET() {
  try {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return respErr('Unauthorized');

    const isAdmin = await hasPermission(session.user.id, 'admin.settings.read');
    if (!isAdmin) return respErr('Forbidden');

    const sourceCheck = await getLatestGameDataSourceCheck();
    const overrides = sourceCheck
      ? buildFreshnessOverridesFromSourceCheck(sourceCheck)
      : undefined;

    return respData(buildGameDataFreshnessAudit(new Date(), overrides));
  } catch (error: any) {
    return respErr(error.message || 'Internal error');
  }
}
