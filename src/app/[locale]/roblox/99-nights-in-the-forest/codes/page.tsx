import type { Metadata } from 'next';
import {
  getLatestCodeCheckedAt,
  getRobloxGame,
  type GameCodeStatus,
} from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import { AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildHowToSchema,
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
const codesPath = '/roblox/99-nights-in-the-forest/codes/';

const getPageTitle = (monthYear: string) =>
  `99 Nights in the Forest Codes (${monthYear}) - Rewards`;

const getPageDescription = (monthYear: string) =>
  `Find working 99 Nights in the Forest codes for ${monthYear}, gem rewards, all active and expired codes, redemption steps, and source checks.`;

const redeemSteps = [
  {
    name: 'Open the Roblox experience',
    text: 'Launch 99 Nights in the Forest from the official Roblox game page.',
  },
  {
    name: 'Stay in the lobby',
    text: 'Redeem codes before starting a survival round so you can reach the code menu safely.',
  },
  {
    name: 'Open the diamond or codes menu',
    text: 'Use the lobby menu that contains the code box, then paste the code exactly as shown.',
  },
  {
    name: 'Claim the reward',
    text: 'Submit the code and check the reward message before leaving the lobby.',
  },
  {
    name: 'Use chat for special codes',
    text: 'For yay fishing, try the in-game chat path because checked sources disagree on its normal code-box status.',
  },
];

const verificationNotes = [
  {
    title: 'Source cross-checks',
    text: 'We compare public guide sources and the Roblox game page instead of copying a single code list without context.',
  },
  {
    title: 'Conflict labels',
    text: 'When sources disagree, the code is marked as special or conflicting so you can decide whether it is worth testing.',
  },
  {
    title: 'Update cadence',
    text: 'Codes get reviewed after major updates, apology rewards, event drops, and visible changes in trusted source pages.',
  },
];

const troubleshootingNotes = [
  {
    title: 'The code was entered in the wrong place',
    text: 'Most codes use the lobby code menu. Special chat redemptions should be tried in chat, not the normal code box.',
  },
  {
    title: 'The code expired after an event',
    text: 'Seasonal and update apology codes can disappear quickly. Expired entries stay on this page so repeat testing is easier to avoid.',
  },
  {
    title: 'Spacing or capitalization changed',
    text: 'Copy the code exactly. A code such as yay fishing includes a space, while forestwakesup26 does not.',
  },
];

const searchDemandNotes = [
  {
    title: 'All codes in 99 Nights in the Forest',
    text: 'This page keeps active, special/conflicting, and expired entries together so an all-codes search does not send you to separate thin lists.',
  },
  {
    title: '99 Nights in the Forest codes for 700 gems',
    text: 'We do not list a 700-gem code unless checked sources verify it. Current gem rewards stay in the gem section above with each source note attached.',
  },
  {
    title: 'Codes for diamonds or gems',
    text: 'Public sources sometimes mix gems and diamonds. Quest Codes keeps the wording attached to the source and links the wider gems and diamonds guide for spending decisions.',
  },
  {
    title: 'Merch codes',
    text: 'No checked source currently confirms a public merch code for this game. Merch-only, private, or screenshot-only claims stay out of the active table until they have a source trail.',
  },
];

const relatedGuides = [
  {
    title: '99 Nights game hub',
    href: '/roblox/99-nights-in-the-forest',
    description:
      'Start here for the full 99 Nights in the Forest guide cluster.',
  },
  {
    title: 'Gems and diamonds',
    href: '/roblox/99-nights-in-the-forest/gems',
    description:
      'See which codes give gems, which badge route is source-checked, and what to save diamonds for.',
  },
  {
    title: 'Class tier list',
    href: '/roblox/99-nights-in-the-forest/class-tier-list',
    description:
      'Compare the best classes before spending diamonds on a new unlock.',
  },
  {
    title: 'All classes reference',
    href: '/roblox/99-nights-in-the-forest/classes',
    description:
      'Review class names, roles, and source-backed class notes in one place.',
  },
  {
    title: 'Survival guide',
    href: '/roblox/99-nights-in-the-forest/survival-guide',
    description:
      'Keep the campfire alive, loot safely, and avoid early-run mistakes.',
  },
  {
    title: 'Animals and taming',
    href: '/roblox/99-nights-in-the-forest/animals',
    description:
      'Check tameable animals, food requirements, flute requirements, and biome notes.',
  },
];

const faqs = [
  {
    question: 'What are the active 99 Nights in the Forest codes?',
    answer:
      'As of June 29, 2026, forestwakesup26 and afterparty are listed as active by PC Gamer and GamesRadar, while PCGamesN confirms afterparty only in the latest check. yay fishing is treated as a special in-game activation because sources disagree on its normal code-box status.',
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
    question: 'Are there 99 Nights in the Forest codes for 700 gems?',
    answer:
      'Not in the checked active table right now. We only list a 700-gem code if public sources verify the exact reward and redemption path.',
  },
  {
    question: 'Where are all 99 Nights in the Forest codes listed?',
    answer:
      'The active, special/conflicting, and expired sections on this page are the all-codes view. Expired entries stay visible so old event rewards are not retested.',
  },
  {
    question: 'Are there merch codes for 99 Nights in the Forest?',
    answer:
      'No checked public source currently confirms a merch code. If a merch code appears, it should be treated as unverified until the source and redemption path are clear.',
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
  const title = getPageTitle(monthYear);
  const description = getPageDescription(monthYear);
  const canonical = canonicalUrl(codesPath, locale);

  return {
    title,
    description,
    keywords: seoKeywords.ninetyNineNightsCodes,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Quest Codes',
      images: game
        ? [
            {
              url: game.imageUrl,
              width: 500,
              height: 280,
              alt: `${game.name} Roblox thumbnail`,
            },
          ]
        : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: game ? [game.imageUrl] : [],
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

  const monthYear = currentMonthYear();
  const canonical = canonicalUrl(codesPath, locale);
  const activeCodes = game.codes.filter((code) => code.status === 'active');
  const specialCodes = game.codes.filter((code) => code.status === 'special');
  const expiredCodes = game.codes.filter((code) => code.status === 'expired');
  const latestCodeCheckedAt = getLatestCodeCheckedAt(game);
  const activeCodeNames = activeCodes.map((code) => code.code).join(', ');
  const gemRewardCodes = game.codes.filter(
    (code) =>
      (code.status === 'active' || code.status === 'special') &&
      code.reward.toLowerCase().includes('gem')
  );
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
  const howToSchema = buildHowToSchema({
    name: 'How to redeem 99 Nights in the Forest codes',
    description:
      'Use the lobby code menu or special chat path before starting another 99 Nights in the Forest survival run.',
    steps: redeemSteps,
  });
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
      {[breadcrumbSchema, faqSchema, howToSchema, videoGameSchema].map(
        (schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )
      )}

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
            Codes checked {latestCodeCheckedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            99 Nights in the Forest codes ({monthYear})
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            Working 99 Nights in the Forest codes, reward notes, source checks,
            expired-code history, and redemption troubleshooting for Roblox
            players. We mark conflicting source data instead of hiding it.
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
              title={`${game.name} Roblox thumbnail`}
              className="aspect-[16/9] w-full rounded-md object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <p className="text-muted-foreground mt-3 text-sm">
              Official Roblox thumbnail. Game data checked from the Roblox games
              API and public Roblox game page.
            </p>
            <div className="border-border mt-4 border-t pt-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="text-primary size-4" />
                Today&apos;s copy queue
              </div>
              <div className="space-y-3">
                {[...activeCodes, ...specialCodes].map((code) => (
                  <div
                    className="bg-muted/30 rounded-md border p-3"
                    key={code.code}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="font-mono text-sm font-semibold">
                          {code.code}
                        </div>
                        <div className="text-muted-foreground mt-1 text-xs">
                          {code.reward}
                        </div>
                      </div>
                      {statusBadge(code.status)}
                    </div>
                    <div className="mt-3">
                      <CopyCodeButton code={code.code} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mt-3 text-xs leading-5">
                Special codes may need a different redemption path. Check the
                notes before assuming the code is expired.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <Card className="rounded-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold tracking-tight">
              Quick answer: working codes today
            </h2>
            <CardDescription>
              Codes checked {latestCodeCheckedAt}. Use this summary before
              starting another run.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 lg:grid-cols-[1fr_280px]">
            <div className="text-muted-foreground space-y-3 text-sm leading-6">
              <p>
                For {monthYear}, the active 99 Nights in the Forest codes we
                currently treat as working are{' '}
                <span className="text-foreground font-mono font-medium">
                  {activeCodeNames || 'no active codes'}
                </span>
                . The code <span className="font-mono">yay fishing</span> stays
                in the special section because sources disagree on whether it
                should be redeemed through chat or treated as expired.
              </p>
              <p>
                The table below keeps rewards, copy buttons, source links, and
                expired entries together so you can check a code quickly without
                retesting old event rewards.
              </p>
            </div>
            <div className="rounded-md border p-4 text-sm">
              <h3 className="font-medium">Current status</h3>
              <dl className="mt-3 space-y-2">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Active</dt>
                  <dd className="font-medium">{activeCodes.length}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Special</dt>
                  <dd className="font-medium">{specialCodes.length}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Expired</dt>
                  <dd className="font-medium">{expiredCodes.length}</dd>
                </div>
              </dl>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 rounded-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold tracking-tight">
              Common code searches we track
            </h2>
            <CardDescription>
              These notes answer rising search variants without turning each
              phrase into a duplicate page.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {searchDemandNotes.map((note) => (
              <div key={note.title} className="rounded-md border p-4">
                <h3 className="font-medium">{note.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {note.text}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mt-6 rounded-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold tracking-tight">
              99 Nights in the Forest codes for gems
            </h2>
            <CardDescription>
              Gem reward codes from the checked code table. Special entries
              still need the redemption note shown below.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            {gemRewardCodes.map((code) => (
              <div key={code.code} className="rounded-md border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-mono font-semibold">{code.code}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {code.reward}
                    </p>
                  </div>
                  {statusBadge(code.status)}
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {code.note}
                </p>
                <div className="mt-3">
                  <CopyCodeButton code={code.code} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mt-6 rounded-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold tracking-tight">
              Active 99 Nights in the Forest codes
            </h2>
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
              <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                <AlertTriangle className="size-5" />
                Special / conflicting code
              </h2>
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
                      <h3 className="font-mono text-lg font-semibold">
                        {code.code}
                      </h3>
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
              <h2 className="text-2xl font-semibold tracking-tight">
                How to redeem 99 Nights codes
              </h2>
              <CardDescription>
                Use the lobby menu before starting another run.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {redeemSteps.map((step, index) => (
                  <li className="flex gap-3" key={step.name}>
                    <span className="bg-primary text-primary-foreground flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-medium">{step.name}</h3>
                      <p className="text-muted-foreground mt-1 text-sm leading-6">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader>
              <h2 className="text-2xl font-semibold tracking-tight">
                Expired codes
              </h2>
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
                      <h3 className="font-mono font-medium">{code.code}</h3>
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

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="rounded-lg">
            <CardHeader>
              <h2 className="text-2xl font-semibold tracking-tight">
                How we verify codes
              </h2>
              <CardDescription>
                Quest Codes favors a visible source trail over blind copy-paste
                lists.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {verificationNotes.map((note) => (
                <div key={note.title} className="rounded-md border p-4">
                  <h3 className="font-medium">{note.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {note.text}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader>
              <h2 className="text-2xl font-semibold tracking-tight">
                Why a code may not work
              </h2>
              <CardDescription>
                Check these issues before assuming the whole code list is
                outdated.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {troubleshootingNotes.map((note) => (
                <div key={note.title} className="rounded-md border p-4">
                  <h3 className="font-medium">{note.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {note.text}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 rounded-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold tracking-tight">
              Related 99 Nights guides
            </h2>
            <CardDescription>
              Internal links help players move from codes to the next decision
              point in the game.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="hover:bg-accent block rounded-md border p-4"
              >
                <h3 className="font-medium">{guide.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {guide.description}
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="mt-6 rounded-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
            <CardDescription>
              Short answers for common 99 Nights code questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-md border p-4">
                <h3 className="font-medium">{faq.question}</h3>
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
