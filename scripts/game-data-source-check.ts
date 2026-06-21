import { buildGameDataSourceCheckSnapshot } from '../src/lib/game-data-source-check';

const snapshot = await buildGameDataSourceCheckSnapshot('local-cli');

console.log('# Game Data Source Check');
console.log('');
console.log(`Generated: ${snapshot.generatedAt}`);
console.log(
  `Sources: ${snapshot.healthySources}/${snapshot.sourceCount} healthy`
);
console.log(`Attention: ${snapshot.attentionCount}`);
console.log('');
console.log(
  '| Status | HTTP | Source | Kind | Matched | Missing | Error | Action |'
);
console.log('| --- | ---: | --- | --- | --- | --- | --- | --- |');

for (const result of snapshot.results) {
  console.log(
    [
      result.ok ? 'ok' : 'review',
      result.httpStatus ?? '-',
      result.sourceName,
      result.kind,
      result.matchedTerms.join(', ') || '-',
      result.missingTerms.join(', ') || '-',
      result.error || '-',
      result.action,
    ]
      .map((value) => `| ${String(value).replace(/\|/g, '\\|')} `)
      .join('') + '|'
  );
}
