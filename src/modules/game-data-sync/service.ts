import { eq } from 'drizzle-orm';

import { db } from '@/core/db';
import { config } from '@/config/db/schema';
import {
  buildGameDataSourceCheckSnapshot,
  buildGameDataSourceReviewPlan,
  type GameDataSourceCheckSnapshot,
} from '@/lib/game-data-source-check';

const SNAPSHOT_KEY = 'questcodes.gameData.sourceCheck.snapshot';
const STATUS_KEY = 'questcodes.gameData.sourceCheck.status';

async function readConfigValue(name: string) {
  const [row] = await db()
    .select()
    .from(config)
    .where(eq(config.name, name))
    .limit(1);
  return row?.value ?? undefined;
}

async function writeConfigValue(name: string, value: string) {
  await db().transaction(async (tx: any) => {
    const [existing] = await tx
      .select()
      .from(config)
      .where(eq(config.name, name))
      .limit(1);

    if (existing) {
      await tx.update(config).set({ value }).where(eq(config.name, name));
    } else {
      await tx.insert(config).values({ name, value });
    }
  });
}

export async function runGameDataSourceCheck(reason = 'manual') {
  const snapshot = await buildGameDataSourceCheckSnapshot(reason);

  await writeConfigValue(SNAPSHOT_KEY, JSON.stringify(snapshot));
  await writeConfigValue(
    STATUS_KEY,
    JSON.stringify({
      generatedAt: snapshot.generatedAt,
      reason: snapshot.reason,
      sourceCount: snapshot.sourceCount,
      healthySources: snapshot.healthySources,
      attentionCount: snapshot.attentionCount,
    })
  );

  return snapshot;
}

export async function getLatestGameDataSourceCheck() {
  const raw = await readConfigValue(SNAPSHOT_KEY);
  if (!raw) return null;

  try {
    const snapshot = JSON.parse(raw) as GameDataSourceCheckSnapshot;

    if (!snapshot.reviewPlan) {
      return {
        ...snapshot,
        reviewPlan: buildGameDataSourceReviewPlan(snapshot.results ?? []),
      };
    }

    return snapshot;
  } catch {
    return null;
  }
}
