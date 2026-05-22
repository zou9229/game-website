// Dev-only stub for the `cloudflare:workers` module.
// vite.config.ts aliases `cloudflare:workers` to this file when running outside
// the Workers runtime (i.e. `pnpm dev` on Node), so static `import { env }`
// in src/core/db/d1.ts doesn't blow up at module-load time.
// In production (vinext deploy / @cloudflare/vite-plugin), this file is NOT
// used — the real `cloudflare:workers` module is provided by workerd.
//
// If anything actually tries to read env.DB through this stub (it shouldn't —
// d1.ts is only loaded when DATABASE_PROVIDER=d1, which we don't set locally),
// it surfaces a clear error rather than a confusing `undefined.prepare(...)`.
export const env = new Proxy(
  {},
  {
    get(_, prop) {
      throw new Error(
        `cloudflare:workers env.${String(prop)} accessed in non-Workers runtime. ` +
          `Did you set DATABASE_PROVIDER=d1 in local dev? Use sqlite/postgres/mysql ` +
          `locally; d1 only works in vinext deploy / wrangler dev.`
      );
    },
  }
);
