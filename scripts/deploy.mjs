import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function loadEnvFile(path) {
  if (!existsSync(path)) return;

  const content = readFileSync(path, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadEnvFile('.env.production');

const bin = process.platform === 'win32' ? 'vinext.CMD' : 'vinext';
const vinext = join(process.cwd(), 'node_modules', '.bin', bin);
const args = ['deploy', ...process.argv.slice(2)];
const result = spawnSync(vinext, args, {
  stdio: 'inherit',
  env: process.env,
  cwd: process.cwd(),
  shell: process.platform === 'win32',
});

if (result.error) {
  console.error(result.error.message);
}

process.exit(result.status ?? 1);
