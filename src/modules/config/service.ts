import { eq } from 'drizzle-orm';
import { db } from '@/core/db';
import { config } from '@/config/db/schema';
import { envConfigs } from '@/config';

type ConfigMap = Record<string, string>;

// In-memory cache
let cachedConfigs: ConfigMap | null = null;
let cacheTime = 0;
const CACHE_TTL = 3600_000; // 1 hour

/**
 * Get all configs from database.
 */
export async function getDbConfigs(): Promise<ConfigMap> {
  const now = Date.now();
  if (cachedConfigs && now - cacheTime < CACHE_TTL) {
    return cachedConfigs;
  }

  try {
    if (!envConfigs.database_url && envConfigs.database_provider !== 'd1') {
      return {};
    }

    const rows = await db().select().from(config);
    const result: ConfigMap = {};
    for (const row of rows) {
      if (row.name && row.value) {
        result[row.name] = row.value;
      }
    }

    cachedConfigs = result;
    cacheTime = now;
    return result;
  } catch {
    return {};
  }
}

/**
 * Get all configs merged: env + database (database overrides env).
 */
export async function getAllConfigs(): Promise<ConfigMap> {
  const dbConfigs = await getDbConfigs();
  return { ...envConfigs, ...dbConfigs };
}

/**
 * Keys that must never be written through the admin UI / DB config layer.
 *
 * These are infrastructure-critical or session-signing secrets that should
 * only ever come from environment variables. Allowing a compromised admin
 * (or a confused-deputy bug) to overwrite them would let an attacker rotate
 * the session-signing key out from under us, swap the database connection,
 * etc.
 */
const PROTECTED_CONFIG_KEYS: ReadonlySet<string> = new Set([
  'auth_secret',
  'database_url',
  'database_auth_token',
  'database_provider',
  'db_schema',
  'db_singleton_enabled',
  'db_max_connections',
]);

/**
 * Save multiple configs to database (upsert). Protected keys are silently
 * dropped — see PROTECTED_CONFIG_KEYS.
 */
export async function saveConfigs(configs: ConfigMap) {
  const entries = Object.entries(configs).filter(
    ([name]) => !PROTECTED_CONFIG_KEYS.has(name)
  );
  if (entries.length === 0) {
    return;
  }

  await db().transaction(async (tx: any) => {
    for (const [name, value] of entries) {
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
    }
  });

  // Invalidate cache
  cachedConfigs = null;
  cacheTime = 0;
}

/**
 * Get a single config value.
 */
export async function getConfig(name: string): Promise<string | undefined> {
  const configs = await getAllConfigs();
  return configs[name];
}

/**
 * Filter configs to only include public-safe keys.
 */
export function filterPublicConfigs(configs: ConfigMap, publicKeys: string[]): ConfigMap {
  const result: ConfigMap = {};
  for (const key of publicKeys) {
    if (configs[key]) {
      result[key] = configs[key];
    }
  }
  return result;
}
