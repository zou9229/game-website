import { buildGameDataFreshnessAudit } from '../src/data/game-data-audit';

const audit = buildGameDataFreshnessAudit();
const stale = audit.items.filter((row) => row.status === 'stale');

console.log('# Game Data Freshness Audit');
console.log('');
console.log(`Generated: ${audit.generatedAt}`);
console.log(`Launch MVP progress: ${audit.roadmap.launchMvpPercent}%`);
console.log(
  `Operating system progress: ${audit.roadmap.operatingSystemPercent}%`
);
console.log(`Fresh: ${audit.summary.fresh}`);
console.log(`Due soon: ${audit.summary.dueSoon}`);
console.log(`Stale: ${audit.summary.stale}`);
console.log('');
console.log(
  '| Status | Priority | Page | Kind | Checked | Cadence | Age | Owner |'
);
console.log('| --- | --- | --- | --- | --- | ---: | ---: | --- |');

for (const row of audit.items) {
  console.log(
    `| ${row.status} | ${row.priority} | ${row.title} | ${row.kind} | ${row.checkedAt} | ${row.cadenceDays}d | ${row.ageDays}d | ${row.owner} |`
  );
}

console.log('');
console.log('## Next actions');
for (const action of audit.actions.slice(0, 8)) {
  console.log(`- [${action.priority}] ${action.title}: ${action.action}`);
}

if (stale.length > 0) {
  console.log('');
  console.log('Stale pages need source review before the next content push:');
  for (const row of stale) {
    console.log(`- ${row.title}: ${row.note}`);
  }
}
