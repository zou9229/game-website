import type { Metadata } from 'next';
import { getRobloxGame, type GameCodeStatus } from '@/data/roblox-games';
import { AlertTriangle, ExternalLink } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildVideoGameSchema,
  canonicalUrl,
  currentMonthYear,
} from '@/lib/seo';
import { CopyCodeButton } from '@/components/roblox/copy-code-button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const game = getRobloxGame('99-nights-in-the-forest');

const faqs = [
  {
    question: 'What are the active 99 Nights in the Forest codes?',
    answer:
      'As of June 20, 2026, forestwakesup26 and afterparty are listed as active by checked sources. yay fishing is treated as a special chat redemption because sources disagree on its status.',
  },
  {
    question: 'How do I redeem 99 Nights in the Forest codes?',
    answer:
      'Open 99 Nights in the Forest on Roblox, stay in the lobby, open the diamond or codes menu, enter a working code, and claim the reward before starting another survival run.',
  },
  {
    question: 'Why is yay fishing marked as special?',
    answer:
      'PC Gamer describes yay fishing as a chat-based redemption, while PCGamesN lists it as expired. For that reason, it is not shown as a normal active code.',
  },
  {
    question: 'How often should I check for new codes?',
    answer:
      'Check after major updates, event drops, and developer apology rewards. This page keeps a source trail so code changes can be audited later.',
  },
  {
    question: 'Is this site affiliated with Roblox?',
    answer:
      "No. This is a fan-made guide page and is not affiliated with Roblox or Grandma's Favourite Games.",
  },
];

function statusBadge(status: GameCodeStatus) {
  if (status === 'active') return <Badge>Active</Badge>;
  if (status === 'special') return <Badge variant="secondary">Special</Badge>;
  return <Badge variant="outline">Expired</Badge>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const monthYear = currentMonthYear();
  const canonical = canonicalUrl(
    '/roblox/99-nights-in-the-forest/codes/',
    locale
  );

  return {
    title: `99 Nights in the Forest Codes (${monthYear})`,
    description:
      'Current 99 Nights in the Forest codes with source checks, rewards, special redemption notes, and expired code history.',
    alternates: { canonical },
    openGraph: {
      title: `99 Nights in the Forest Codes (${monthYear})`,
      description:
        'Current 99 Nights in the Forest codes with source checks, rewards, special redemption notes, and expired code history.',
      url: canonical,
      images: game ? [{ url: game.imageUrl, width: 500, height: 280 }] : [],
      type: 'article',
    },
  };
}

export default async function CodesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!game) return null;

  const canonical = canonicalUrl(
    '/roblox/99-nights-in-the-forest/codes/',
    locale
  );
  const activeCodes = game.codes.filter((code) => code.status === 'active');
  const specialCodes = game.codes.filter((code) => code.status === 'special');
  const expiredCodes = game.codes.filter((code) => code.status === 'expired');
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    {
      name: game.name,
      item: canonicalUrl('/roblox/99-nights-in-the-forest/', locale),
    },
    { name: 'Codes', item: canonical },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const videoGameSchema = buildVideoGameSchema({
    name: game.name,
    description: game.description,
    url: canonicalUrl('/roblox/99-nights-in-the-forest/', locale),
    imageUrl: game.imageUrl,
    developer: game.developer,
    genre: game.genre,
    dateModified: game.updatedAt,
  });

  return (
    <main className="bg-background min-h-screen">
      {[breadcrumbSchema, faqSchema, videoGameSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <nav className="text-muted-foreground mb-5 flex flex-wrap gap-2 text-sm">
            <Link href="/roblox" className="hover:text-foreground">
              Roblox
            </Link>
            <span>/</span>
            <Link
              href="/roblox/99-nights-in-the-forest"
              className="hover:text-foreground"
            >
              {game.name}
            </Link>
            <span>/</span>
            <span className="text-foreground">Codes</span>
          </nav>

          <Badge variant="outline" className="mb-4">
            Checked {game.stats.checkedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            99 Nights in the Forest codes ({currentMonthYear()})
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            Current 99 Nights in the Forest codes, reward notes, source checks,
            and expired-code history. We mark conflicting source data instead of
            hiding it.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a
              href={game.robloxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border px-4 font-medium"
            >
              Play on Roblox
              <ExternalLink className="size-3.5" />
            </a>
            <Link
              href="/roblox/99-nights-in-the-forest"
              className="bg-secondary text-secondary-foreground inline-flex h-9 items-center justify-center rounded-lg px-4 font-medium"
            >
              Game hub
            </Link>
          </div>
        </div>

        <Card className="rounded-lg">
          <CardContent className="pt-4">
            <img
              src={game.imageUrl}
              alt={`${game.name} Roblox thumbnail`}
              className="aspect-[16/9] w-full rounded-md object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <p className="text-muted-foreground mt-3 text-sm">
              Official Roblox thumbnail. Game data checked from the Roblox games
              API and public Roblox game page.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Active codes</CardTitle>
            <CardDescription>
              These codes are listed as active by checked sources.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Reward</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Copy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeCodes.map((code) => (
                  <TableRow key={code.code}>
                    <TableCell className="font-mono font-semibold">
                      {code.code}
                    </TableCell>
                    <TableCell>{code.reward}</TableCell>
                    <TableCell>{statusBadge(code.status)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {code.sources.map((source) => (
                          <a
                            key={`${code.code}-${source.name}`}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline-offset-4 hover:underline"
                          >
                            {source.name}
                          </a>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <CopyCodeButton code={code.code} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {specialCodes.length > 0 && (
          <Card className="mt-6 rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="size-5" />
                Special / conflicting code
              </CardTitle>
              <CardDescription>
                These are not treated as normal active codes because source data
                conflicts or the redemption path differs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {specialCodes.map((code) => (
                <div key={code.code} className="rounded-md border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-mono text-lg font-semibold">
                        {code.code}
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {code.reward}
                      </p>
                    </div>
                    {statusBadge(code.status)}
                  </div>
                  <p className="mt-3 text-sm leading-6">{code.note}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm">
                    {code.sources.map((source) => (
                      <a
                        key={`${code.code}-${source.name}`}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        {source.name}: {source.status.replace('-', ' ')}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>How to redeem codes</CardTitle>
              <CardDescription>
                Use the lobby menu before starting another run.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="text-muted-foreground list-decimal space-y-3 pl-5 text-sm leading-6">
                <li>Open 99 Nights in the Forest on Roblox.</li>
                <li>Stay in the lobby before beginning a survival round.</li>
                <li>Open the diamond or codes menu.</li>
                <li>Paste a working code and claim the reward.</li>
                <li>
                  For <span className="font-mono">yay fishing</span>, try the
                  in-game chat path noted above instead of the normal code box.
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Expired codes</CardTitle>
              <CardDescription>
                Old codes are kept here to reduce repeat testing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expiredCodes.map((code) => (
                  <div
                    key={code.code}
                    className="flex items-center justify-between gap-3 rounded-md border p-3"
                  >
                    <div>
                      <div className="font-mono font-medium">{code.code}</div>
                      <p className="text-muted-foreground text-sm">
                        {code.note}
                      </p>
                    </div>
                    {statusBadge(code.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 rounded-lg">
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
            <CardDescription>
              Short answers for common 99 Nights code questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-md border p-4">
                <h2 className="font-medium">{faq.question}</h2>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
