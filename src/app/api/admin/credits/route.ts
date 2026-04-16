import { headers } from 'next/headers';
import { respPage, respErr } from '@/lib/resp';
import { getAuth } from '@/core/auth';
import { hasPermission } from '@/modules/rbac/service';
import { db } from '@/core/db';
import { credit } from '@/config/db/schema';
import { desc, count, eq, and, type SQL } from 'drizzle-orm';

export async function GET(req: Request) {
  try {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return respErr('Unauthorized');

    const isAdmin = await hasPermission(session.user.id, 'admin.*');
    if (!isAdmin) return respErr('Forbidden');

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get('pageSize') || '10')));
    const offset = (page - 1) * pageSize;

    const transactionType = searchParams.get('transactionType');
    const status = searchParams.get('status');

    const conditions: SQL[] = [];
    if (transactionType) conditions.push(eq(credit.transactionType, transactionType));
    if (status) conditions.push(eq(credit.status, status));
    else conditions.push(eq(credit.status, 'active'));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [totalResult] = await db().select({ count: count() }).from(credit).where(where);
    const total = totalResult.count;

    const credits = await db()
      .select({
        id: credit.id,
        userId: credit.userId,
        userEmail: credit.userEmail,
        transactionNo: credit.transactionNo,
        transactionType: credit.transactionType,
        transactionScene: credit.transactionScene,
        credits: credit.credits,
        remainingCredits: credit.remainingCredits,
        description: credit.description,
        expiresAt: credit.expiresAt,
        status: credit.status,
        createdAt: credit.createdAt,
      })
      .from(credit)
      .where(where)
      .orderBy(desc(credit.createdAt))
      .limit(pageSize)
      .offset(offset);

    return respPage(credits, total);
  } catch (error: any) {
    return respErr(error.message || 'Internal error');
  }
}
