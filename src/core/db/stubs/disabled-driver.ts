// Vinext build stub for DB drivers that aren't needed at Workers runtime.
// vite.config.ts aliases @libsql/client / mysql2 / postgres / drizzle-orm/{libsql,mysql2,postgres-js}
// to this file when building for Cloudflare. With DATABASE_PROVIDER=d1, the
// matching createSqliteDb / createMysqlDb / createPostgresDb call paths are
// never reached, so the throws below should never fire in production. The
// stubs only have to satisfy module-load-time imports, not actual usage.

function throwDisabled(): never {
  throw new Error(
    'This DB driver is stubbed in the Cloudflare Workers build (DATABASE_PROVIDER=d1 is used instead). ' +
      'If you see this error, set DATABASE_PROVIDER=d1 in wrangler.jsonc.vars.'
  );
}

// Satisfies `import { createClient } from '@libsql/client'`
export const createClient = throwDisabled;

// Satisfies `import { drizzle } from 'drizzle-orm/libsql'` (and mysql2 / postgres-js)
export const drizzle = throwDisabled;

// Default-export covers `import mysql from 'mysql2'` and `import postgres from 'postgres'`.
// Wrap in a Proxy so any property access (e.g. mysql.createConnection) returns a throwing fn.
const stubDefault = new Proxy(throwDisabled as unknown as Record<string, unknown>, {
  get(_target, _prop) {
    return throwDisabled;
  },
});

export default stubDefault;
