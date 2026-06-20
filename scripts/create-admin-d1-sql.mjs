import { randomUUID } from 'node:crypto';
import { hashPassword } from 'better-auth/crypto';

function q(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error('ADMIN_EMAIL and ADMIN_PASSWORD are required.');
  process.exit(1);
}

const userId = randomUUID();
const accountId = randomUUID();
const userRoleId = randomUUID();
const hashedPassword = await hashPassword(password);
const now = "(cast((julianday('now') - 2440587.5)*86400000 as integer))";

const lines = [
  `INSERT OR IGNORE INTO "user" (id, name, email, email_verified, created_at, updated_at, utm_source, ip, locale) VALUES (${q(userId)}, 'Admin', ${q(email)}, 1, ${now}, ${now}, '', '', 'en');`,
  `UPDATE "user" SET email_verified = 1, updated_at = ${now} WHERE email = ${q(email)};`,
  `INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
SELECT ${q(accountId)}, u.id, 'credential', u.id, ${q(hashedPassword)}, ${now}, ${now}
FROM "user" u
WHERE u.email = ${q(email)}
  AND NOT EXISTS (
    SELECT 1 FROM account a
    WHERE a.user_id = u.id AND a.provider_id = 'credential'
  );`,
  `UPDATE account
SET password = ${q(hashedPassword)}, updated_at = ${now}
WHERE provider_id = 'credential'
  AND user_id = (SELECT id FROM "user" WHERE email = ${q(email)});`,
  `INSERT INTO user_role (id, user_id, role_id, created_at, updated_at)
SELECT ${q(userRoleId)}, u.id, r.id, ${now}, ${now}
FROM "user" u, role r
WHERE u.email = ${q(email)}
  AND r.name = 'super_admin'
  AND NOT EXISTS (
    SELECT 1 FROM user_role ur
    WHERE ur.user_id = u.id AND ur.role_id = r.id
  );`,
];

process.stdout.write(`${lines.join('\n')}\n`);
