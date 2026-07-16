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

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const builtConfigPath = join(process.cwd(), 'dist', 'server', 'wrangler.json');
if (!existsSync(builtConfigPath)) {
  console.error(
    'Cloudflare deploy succeeded, but the built Wrangler config is missing.'
  );
  process.exit(1);
}

const builtConfig = JSON.parse(readFileSync(builtConfigPath, 'utf8'));
const crons = builtConfig.triggers?.crons ?? [];

if (crons.length > 0) {
  const wranglerBin =
    process.platform === 'win32' ? 'wrangler.CMD' : 'wrangler';
  const wrangler = join(process.cwd(), 'node_modules', '.bin', wranglerBin);
  const triggerArgs = [
    'triggers',
    'deploy',
    '-c',
    builtConfigPath,
    '--name',
    builtConfig.name,
    ...crons.flatMap((cron) => ['--triggers', cron]),
  ];
  const triggerResult = spawnSync(wrangler, triggerArgs, {
    stdio: 'inherit',
    env: process.env,
    cwd: process.cwd(),
    shell: process.platform === 'win32',
  });

  if (triggerResult.error) {
    console.error(triggerResult.error.message);
  }
  if (triggerResult.status !== 0) {
    console.error(
      'Worker deployed, but scheduled trigger synchronization failed.'
    );
    process.exit(triggerResult.status ?? 1);
  }
}

process.exit(0);
