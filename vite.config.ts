import { defineConfig } from "vite";
import vinext from "vinext";
import mdx from "@mdx-js/rollup";
import { cloudflare } from "@cloudflare/vite-plugin";
import { fileURLToPath } from "node:url";

// Dev uses Node so the Drizzle drivers (@libsql/client, mysql2, postgres) work
// against a local DB. Build uses the Cloudflare plugin so `vinext build` and
// `vinext deploy` produce a Workers-compatible bundle.
//
// Toggle dev → Workers mode by exporting VINEXT_CLOUDFLARE_DEV=1 — useful when
// you need realistic workerd semantics, but expect the Node-native DB drivers
// to fail and to wire D1/HTTP-based drivers instead.
const isBuild = process.argv.includes("build") || process.argv.includes("deploy");
const useCloudflare = isBuild || process.env.VINEXT_CLOUDFLARE_DEV === "1";

export default defineConfig({
  plugins: [
    // MDX must run before vinext/RSC so `.mdx` files are already JSX by the time
    // RSC analyzes them. No `providerImportSource` — @mdx-js/react's MDXProvider
    // calls `React.createContext`, which is unavailable in the RSC environment.
    // Pages should pass component overrides directly via the `components` prop.
    { ...mdx(), enforce: "pre" },
    vinext(),
    ...(useCloudflare
      ? [cloudflare({ viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] } })]
      : []),
  ],
  optimizeDeps: {
    exclude: ["next-intl"],
  },
  resolve: {
    // In dev (no @cloudflare/vite-plugin), `cloudflare:workers` doesn't resolve
    // because it's a workerd-only built-in. src/core/db/d1.ts statically imports
    // `{ env }` from it for the D1 binding; even though createD1Db() is never
    // called when DATABASE_PROVIDER=sqlite locally, the static import is parsed
    // and fails module resolution. Alias to a stub that throws on actual access.
    alias: useCloudflare
      ? []
      : [
          {
            find: "cloudflare:workers",
            replacement: fileURLToPath(
              new URL("./src/core/db/cloudflare-workers-stub.ts", import.meta.url)
            ),
          },
        ],
  },
  ssr: {
    // Node-native DB drivers + their transitive CJS deps must bypass Vite's CJS interop
    // (Vite's `const module = { exports }` injection collides with `var module = ...` in
    // older CJS files like iconv-lite/encodings/index.js). Loading them via Node keeps
    // the original CJS scoping intact.
    external: ["mysql2", "postgres", "@libsql/client", "iconv-lite"],
  },
});
