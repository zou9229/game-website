import { headers } from 'next/headers';

import { envConfigs } from '@/config';
import { runGameDataSourceCheck } from '@/modules/game-data-sync/service';
import { respData, respErr } from '@/lib/resp';

function constantTimeEqual(left: string, right: string) {
  const leftBytes = new TextEncoder().encode(left);
  const rightBytes = new TextEncoder().encode(right);
  const maxLength = Math.max(leftBytes.length, rightBytes.length);
  let diff = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < maxLength; index += 1) {
    diff |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }

  return diff === 0;
}

async function requireCronSecret() {
  const expected = envConfigs.cron_secret;
  if (!expected) {
    return 'CRON_SECRET is not configured.';
  }

  const headerList = await headers();
  const authorization = headerList.get('authorization') || '';
  const bearerToken = authorization.match(/^Bearer\s+(.+)$/i)?.[1] || '';
  const headerToken = headerList.get('x-cron-secret') || '';
  const actual = bearerToken || headerToken;

  if (!actual || !constantTimeEqual(actual, expected)) {
    return 'Unauthorized cron request.';
  }

  return null;
}

async function runScheduledSourceCheck() {
  const error = await requireCronSecret();
  if (error) {
    return respErr(error, error.includes('configured') ? 503 : 401);
  }

  const snapshot = await runGameDataSourceCheck('scheduled-cron-api', {
    notifyOperator: true,
  });
  return respData({
    ...snapshot,
    publishMode: 'read-only-review-snapshot',
  });
}

export async function GET() {
  try {
    return await runScheduledSourceCheck();
  } catch (error: any) {
    return respErr(error.message || 'Cron source check failed.', 500);
  }
}

export async function POST() {
  try {
    return await runScheduledSourceCheck();
  } catch (error: any) {
    return respErr(error.message || 'Cron source check failed.', 500);
  }
}
