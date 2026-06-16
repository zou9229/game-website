import { headers } from 'next/headers';

import { getAuth } from '@/core/auth';
import {
  getCustomConfigs,
  replaceCustomConfigs,
  type CustomConfig,
} from '@/modules/config/service';
import { hasPermission } from '@/modules/rbac/service';
import { respData, respErr, respOk } from '@/lib/resp';

export async function GET() {
  try {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return respErr('Unauthorized');

    const isAdmin = await hasPermission(session.user.id, 'admin.settings.read');
    if (!isAdmin) return respErr('Forbidden');

    const configs = await getCustomConfigs();
    return respData(configs);
  } catch (error: any) {
    return respErr(error.message || 'Internal error');
  }
}

export async function POST(req: Request) {
  try {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return respErr('Unauthorized');

    const isAdmin = await hasPermission(
      session.user.id,
      'admin.settings.write'
    );
    if (!isAdmin) return respErr('Forbidden');

    const body = await req.json();
    const configs: CustomConfig[] = Array.isArray(body?.configs)
      ? body.configs
      : [];

    await replaceCustomConfigs(configs);
    return respOk();
  } catch (error: any) {
    return respErr(error.message || 'Internal error');
  }
}
