import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createClient } from '@libsql/client';

import {
  isValidAdSensePublisherId,
  normalizeAdSenseClientId,
} from '../src/lib/adsense';
import {
  decryptSecret,
  encryptSecret,
  isEncryptedSecret,
} from '../src/lib/crypto';
import {
  isAllowedAppProtocolUrl,
  resolveAfterAuthUrl,
  safeInternalPath,
} from '../src/lib/redirect';
import { respData, respErr } from '../src/lib/resp';
import {
  getSettingGroups,
  getSettings,
  getSettingTabs,
} from '../src/modules/config/settings';

test('API responses preserve local numeric statuses and upstream response options', async () => {
  const local = respErr('Forbidden', 403);
  assert.equal(local.status, 403);
  assert.deepEqual(await local.json(), { code: -1, message: 'Forbidden' });
  const upstream = respErr('Retry', {
    status: 503,
    headers: { 'Retry-After': '60' },
  });
  assert.equal(upstream.status, 503);
  assert.equal(upstream.headers.get('Retry-After'), '60');
  assert.equal(respErr('Legacy').status, 200);
  assert.deepEqual(await respData(false).json(), {
    code: 0,
    message: 'ok',
    data: false,
  });
  assert.deepEqual(await respData(0).json(), {
    code: 0,
    message: 'ok',
    data: 0,
  });
  assert.equal(
    respData({}, { headers: { 'Cache-Control': 'no-store' } }).headers.get(
      'Cache-Control'
    ),
    'no-store'
  );
});

test('login return paths reject external targets and auth loops', () => {
  assert.equal(
    safeInternalPath('/admin/game-data?tab=audit'),
    '/admin/game-data?tab=audit'
  );
  assert.equal(safeInternalPath('/zh/settings/profile'), '/settings/profile');
  for (const path of [
    'https://example.org/',
    '//example.org/',
    '/\\example.org/',
    '/en//example.org/',
    '/zh/../sign-in',
    '/sign-up',
    '/auth-callback?redirect=x',
    '/%73ign-in',
    '/%2fexample.org',
    '/\n/example.org',
  ]) {
    assert.equal(safeInternalPath(path), null, path);
  }
  assert.equal(
    resolveAfterAuthUrl({ callbackUrl: '/admin/game-data' }),
    '/admin/game-data'
  );
  assert.equal(isAllowedAppProtocolUrl('questcodes://auth', ''), false);
  assert.equal(
    isAllowedAppProtocolUrl('javascript:alert(1)', 'javascript'),
    false
  );
  assert.equal(
    isAllowedAppProtocolUrl('questcodes://auth', 'questcodes'),
    true
  );
});

test('AdSense settings keep one publisher ID and the operations tab', () => {
  const settings = getSettings();
  const names = settings.map((s) => s.name);
  assert.equal(new Set(names).size, names.length);
  assert.ok(names.includes('google_adsense_publisher_id'));
  assert.ok(names.includes('google_adsense_enabled'));
  assert.ok(!names.includes('adsense_code'));
  assert.ok(names.includes('game_data_auto_ai_review_enabled'));
  const tabs = new Set(getSettingTabs().map((t) => t.name));
  const groups = getSettingGroups();
  for (const setting of settings) {
    assert.ok(tabs.has(setting.tab), setting.name);
    assert.ok(
      groups.some((g) => g.name === setting.group && g.tab === setting.tab),
      setting.name
    );
  }
  assert.ok(isValidAdSensePublisherId('pub-6801555055690403'));
  assert.equal(
    normalizeAdSenseClientId('pub-6801555055690403'),
    'ca-pub-6801555055690403'
  );
  assert.equal(isValidAdSensePublisherId('<script>'), false);
});

test('merge keeps registration closed, admin game data visible and ads out of root layout', () => {
  const read = (path: string) =>
    readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
  const signup = read('src/app/[locale]/(auth)/sign-up/page.tsx');
  assert.match(signup, /redirect\(`/);
  assert.ok(!signup.includes('signUp.email'));
  const auth = read('src/core/auth/index.ts');
  assert.match(auth, /disableSignUp: true/);
  const admin = read('src/app/[locale]/admin/layout.tsx');
  assert.equal(admin.match(/href: '\/admin\/game-data'/g)?.length, 1);
  assert.equal(admin.match(/label: t\('nav.content'\)/g)?.length, 1);
  assert.ok(!read('src/app/layout.tsx').includes('<Ads'));
  assert.match(read('src/proxy.ts'), /X-Robots-Tag/);
  assert.match(read('src/app/ads.txt/route.ts'), /google_adsense_publisher_id/);
});

test('additive SQLite migration preserves existing rows and supports upstream fields', async () => {
  const db = createClient({ url: ':memory:' });
  try {
    const sql = (file: string) =>
      readFileSync(new URL(`../drizzle/${file}`, import.meta.url), 'utf8');
    await db.executeMultiple(sql('0000_clear_lionheart.sql'));
    await db.execute(
      "INSERT INTO user (id, name, email) VALUES ('merge-test', 'Merge Test', 'merge@example.invalid')"
    );
    await db.execute(
      "INSERT INTO apikey (id, user_id, key_hash, key_prefix, title, status) VALUES ('old-key', 'merge-test', 'hash', 'sk_old', 'Existing', 'active')"
    );
    await db.executeMultiple(sql('0001_upstream_tickets_api_keys.sql'));
    const result = await db.execute(
      "SELECT id, key, last_used_at FROM apikey WHERE id='old-key'"
    );
    assert.equal(result.rows.length, 1);
    assert.equal(result.rows[0].key, null);
    assert.equal(result.rows[0].last_used_at, null);
    await db.execute(
      "INSERT INTO ticket (id, user_id, title, created_at, updated_at) VALUES ('ticket-1', 'merge-test', 'Test', 1, 1)"
    );
    await db.execute(
      "INSERT INTO ticket_message (id, ticket_id, user_id, content, created_at) VALUES ('message-1', 'ticket-1', 'merge-test', 'Test message', 1)"
    );
    assert.equal(
      (await db.execute('SELECT * FROM ticket_message')).rows.length,
      1
    );
  } finally {
    db.close();
  }
});

test('recoverable API keys require encryption, with hash-only fallback', async () => {
  const originalKey = process.env.CONFIG_ENCRYPTION_KEY;
  const plain = 'sk_merge_test_not_a_real_key';
  try {
    delete process.env.CONFIG_ENCRYPTION_KEY;
    assert.equal(isEncryptedSecret(await encryptSecret(plain)), false);
    process.env.CONFIG_ENCRYPTION_KEY = 'merge-test-only-encryption-key';
    const encrypted = await encryptSecret(plain);
    assert.equal(isEncryptedSecret(encrypted), true);
    assert.notEqual(encrypted, plain);
    assert.equal(await decryptSecret(encrypted), plain);
    process.env.CONFIG_ENCRYPTION_KEY = 'different-test-key';
    assert.equal(await decryptSecret(encrypted), null);
    const service = readFileSync(
      new URL('../src/modules/apikeys/service.ts', import.meta.url),
      'utf8'
    );
    assert.match(
      service,
      /key: isEncryptedSecret\(encryptedKey\) \? encryptedKey : null/
    );
  } finally {
    if (originalKey === undefined) delete process.env.CONFIG_ENCRYPTION_KEY;
    else process.env.CONFIG_ENCRYPTION_KEY = originalKey;
  }
});
