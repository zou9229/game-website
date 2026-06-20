import {
  getFreshnessAgeDays,
  getFreshnessStatus,
  ninetyNineNightsFreshnessEntries,
} from '../src/data/99-nights-freshness';

const statusRank = {
  stale: 0,
  'due-soon': 1,
  fresh: 2,
} as const;

const rows = ninetyNineNightsFreshnessEntries
  .map((entry) => {
    const ageDays = getFreshnessAgeDays(entry.checkedAt);
    const status = getFreshnessStatus(entry);

    return {
      status,
      ageDays,
      title: entry.title,
      href: entry.href,
      kind: entry.kind,
      checkedAt: entry.checkedAt,
      cadenceDays: entry.cadenceDays,
      owner: entry.owner,
      note: entry.note,
    };
  })
  .sort((a, b) => {
    const statusDiff = statusRank[a.status] - statusRank[b.status];
    if (statusDiff !== 0) return statusDiff;
    return b.ageDays - a.ageDays;
  });

const stale = rows.filter((row) => row.status === 'stale');
const dueSoon = rows.filter((row) => row.status === 'due-soon');
const fresh = rows.filter((row) => row.status === 'fresh');

console.log('# Game Data Freshness Audit');
console.log('');
console.log(`Generated: ${new Date().toISOString()}`);
console.log(`Fresh: ${fresh.length}`);
console.log(`Due soon: ${dueSoon.length}`);
console.log(`Stale: ${stale.length}`);
console.log('');
console.log('| Status | Page | Kind | Checked | Cadence | Age | Owner |');
console.log('| --- | --- | --- | --- | ---: | ---: | --- |');

for (const row of rows) {
  console.log(
    `| ${row.status} | ${row.title} | ${row.kind} | ${row.checkedAt} | ${row.cadenceDays}d | ${row.ageDays}d | ${row.owner} |`
  );
}

if (stale.length > 0) {
  console.log('');
  console.log('Stale pages need source review before the next content push:');
  for (const row of stale) {
    console.log(`- ${row.title}: ${row.note}`);
  }
}
