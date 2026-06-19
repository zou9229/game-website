import { spawnSync } from 'node:child_process';
import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs';

mkdirSync('data', { recursive: true });

if (!existsSync('src/config/db/schema.ts')) {
  const result = spawnSync(process.execPath, ['scripts/db-setup.mjs'], {
    stdio: 'inherit',
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (!existsSync('wrangler.jsonc')) {
  copyFileSync('wrangler.example.jsonc', 'wrangler.jsonc');
}

if (existsSync('.agent/skills')) {
  mkdirSync('.agents/skills', { recursive: true });
  for (const item of readdirSync('.agent/skills', { withFileTypes: true })) {
    const target = `.agents/skills/${item.name}`;
    if (!existsSync(target)) {
      cpSync(`.agent/skills/${item.name}`, target, { recursive: true });
    }
  }
}
