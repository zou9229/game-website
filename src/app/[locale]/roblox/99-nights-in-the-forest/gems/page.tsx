import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsGems } from '@/data/99-nights-gems';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import { BadgeCheck, ExternalLink, Gem, ShieldAlert } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildItemListSchema,
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

const game = getRobloxGame('99-nights-in-the-forest');

const faqs = [
  {
    question: 'How do I get gems in 99 Nights in the Forest?',
    answer:
      'The best source-checked route is to redeem current gem or diamond codes first, then use confirmed badge rewards as a secondary source.',
  },
  {
    question: 'Which 99 Nights in the Forest codes give gems?',
    answer:
      'forestwakesup26 and afterparty are normal active gem rewards in the checked code set. yay fishing is treated as a special/conflicting gem reward.',
  },
  {
    question: 'Are gems and diamonds the same thing?',
    answer:
      'Public guides use both terms. Quest Codes keeps each source wording visible and groups them together because the rewards are tied to the same premium progression path.',
  },
  {
    question: 'What should I spend diamonds on first?',
    answer:
      'Spend carefully on classes only after learning the basics. Checked guide sources suggest learning with cheaper options before saving for stronger class targets.',
  },
  {
    question: 'Are Reddit gem farming claims confirmed?',
    answer:
      'No. Reddit-only tips are treated as community signals until a stronger source confirms the reward path.',
  },
];

const confidenceTone = {
  high: 'default',
  medium: 'secondary',
  low: 'outline',
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const monthYear = currentMonthYear();
  const canonical = canonicalUrl(
    '/roblox/99-nights-in-the-forest/gems/',
    locale
  );

  return {
    title: `99 Nights in the Forest Gems and Diamonds (${monthYear})`,
    description:
      'How to get 99 Nights in the Forest gems and diamonds from working codes, special rewards, badges, and checked source notes.',
    keywords: seoKeywords.ninetyNineNightsGems,
    alternates: { canonical },
    openGraph: {
      title: `99 Nights in the Forest Gems and Diamonds (${monthYear})`,
      description:
        'Source-checked gem and diamond routes for 99 Nights in the Forest.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function GemsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl('/roblox/99-nights-in-the-forest/gems/', locale);
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const gemCodes = game.codes.filter(
    (code) =>
      (code.status === 'active' || code.status === 'special') &&
      code.reward.toLowerCase().includes('gem')
  );
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: gameUrl },
    { name: 'Gems', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const itemListSchema = buildItemListSchema({
    name: '99 Nights in the Forest gem and diamond routes',
    description:
      'Source-checked ways to get or spend gems and diamonds in 99 Nights in the Forest.',
    items: ninetyNineNightsGems.methods.map((method) => ({
      name: method.title,
      url: `${pageUrl}#${method.type}`,
      description: method.summary,
    })),
  });
  const videoGameSchema = buildVideoGameSchema({
    name: game.name,
    description: game.description,
    url: gameUrl,
    imageUrl: game.imageUrl,
    developer: game.developer,
    genre: game.genre,
    dateModified: game.updatedAt,
  });

  return (
    <main className="bg-background min-h-screen">
      {[breadcrumbSchema, faqSchema, itemListSchema, videoGameSchema].map(
        (schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )
      )}

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
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
            <span className="text-foreground">Gems</span>
          </nav>

          <Badge variant="outline" className="mb-4 gap-1.5">
            <Gem className="size-3.5" />
            Checked {ninetyNineNightsGems.checkedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            99 Nights in the Forest gems and diamonds
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            A source-checked guide to gem and diamond rewards in 99 Nights in
            the Forest: current codes, special rewards, badge routes, class
            spending, and the community claims we do not treat as confirmed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roblox/99-nights-in-the-forest/codes"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            >
              Copy working codes
            </Link>
            <Link
              href="/roblox/99-nights-in-the-forest/class-tier-list"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Pick a class
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Currency wording</CardTitle>
            <CardDescription>
              Sources mix the terms gems and diamonds.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm leading-6">
            <p>{ninetyNineNightsGems.note}</p>
            <p>
              The safest action is to redeem checked codes first, then save for
              classes instead of spending before you know your route.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <BadgeCheck className="text-primary size-5" />
              <CardTitle>{gemCodes.length} gem reward codes</CardTitle>
              <CardDescription>
                Normal and special entries from the checked code table.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Gem className="text-primary size-5" />
              <CardTitle>Classes and rerolls</CardTitle>
              <CardDescription>
                Diamonds matter because they feed class progression decisions.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <ShieldAlert className="text-primary size-5" />
              <CardTitle>No fake farm routes</CardTitle>
              <CardDescription>
                Reddit-only claims are labeled as community signals.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Current codes for gems</CardTitle>
            <CardDescription>
              Use this short table if your search intent is only free gem or
              diamond codes.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            {gemCodes.map((code) => (
              <div key={code.code} className="rounded-md border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-mono font-semibold">{code.code}</h2>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {code.reward}
                    </p>
                  </div>
                  <Badge
                    variant={code.status === 'active' ? 'default' : 'secondary'}
                  >
                    {code.status}
                  </Badge>
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

        <section className="mt-6 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Source-checked gem routes
          </h2>
          <div className="grid gap-4">
            {ninetyNineNightsGems.methods.map((method) => (
              <Card id={method.type} key={method.title}>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={confidenceTone[method.confidence]}>
                      {method.confidence} confidence
                    </Badge>
                    <Badge variant="outline">{method.type}</Badge>
                  </div>
                  <CardTitle>{method.title}</CardTitle>
                  <CardDescription>{method.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-3 md:grid-cols-3">
                    {method.details.map((detail) => (
                      <div key={detail} className="rounded-md border p-4">
                        <p className="text-muted-foreground text-sm leading-6">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Sources</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {method.sources.map((source) => (
                        <a
                          key={source.url}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center gap-1.5 rounded-md border px-3 text-sm font-medium"
                        >
                          {source.name}
                          <ExternalLink className="size-3.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Related 99 Nights pages</CardTitle>
              <CardDescription>
                Move from free rewards into the next decision.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              {[
                {
                  href: '/roblox/99-nights-in-the-forest/codes',
                  title: 'Working codes and expired history',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/gem-of-the-forest',
                  title: 'Gem of the Forest route',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/badges',
                  title: 'Badge rewards and diamond notes',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/stronghold',
                  title: 'Stronghold diamond route',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/crafting-bench-5',
                  title: 'Crafting Bench 5',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/class-tier-list',
                  title: 'Class tier list',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/survival-guide',
                  title: 'Survival guide',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/updates',
                  title: 'Update and source checks',
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:bg-accent rounded-md border p-3"
                >
                  {item.title}
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>
                Short answers for gem and diamond searches.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
        </div>
      </section>
    </main>
  );
}
