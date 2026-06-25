import { headers } from 'next/headers';

import { getAuth } from '@/core/auth';
import { getAllConfigs } from '@/modules/config/service';
import {
  getLatestGameDataAiReview,
  runGameDataAiReview,
} from '@/modules/game-data-sync/service';
import { hasPermission } from '@/modules/rbac/service';
import { respData, respErr } from '@/lib/resp';

async function requireAdmin(permission: string) {
  const auth = getAuth();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return { error: 'Unauthorized' };

  const allowed = await hasPermission(session.user.id, permission);
  if (!allowed) return { error: 'Forbidden' };

  return { session };
}

export async function GET() {
  try {
    const guard = await requireAdmin('admin.settings.read');
    if (guard.error) return respErr(guard.error);

    return respData(await getLatestGameDataAiReview());
  } catch (error: any) {
    return respErr(error.message || 'Internal error');
  }
}

export async function POST() {
  try {
    const guard = await requireAdmin('admin.settings.write');
    if (guard.error) return respErr(guard.error);

    const configs = await getAllConfigs();
    return respData(await runGameDataAiReview(configs, 'admin-manual'));
  } catch (error: any) {
    return respErr(error.message || 'Internal error');
  }
}
