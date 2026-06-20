import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsSurvivalGuide } from '@/data/99-nights-survival-guide';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import { ExternalLink } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildVideoGameSchema,
  canonicalUrl,
  currentMonthYear,
} from '@/lib/seo';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const game = getRobloxGame('99-nights-in-the-forest');

const priorityLabels = {
  first: 'Do first',
  early: 'Early route',
  'mid-run': 'Mid-run',
  team: 'Team safety',
  utility: 'Utility',
};

const priorityStyles = {
  first: 'border-red-500/40 bg-red-500/10',
  early: 'border-amber-500/40 bg-amber-500/10',
  'mid-run': 'border-blue-500/40 bg-blue-500/10',
  team: 'border-emerald-500/40 bg-emerald-500/10',
  utility: 'border-purple-500/30 bg-purple-500/10',
};

const faqs = [
  {
    question: 'What should I do first in 99 Nights in the Forest?',
    answer:
      'Feed and protect the campfire before taking long looting trips. A run becomes much harder if the fire is neglected.',
  },
  {
    question: 'How do I survive the first nights?',
    answer:
      'Stabilize camp, search nearby buildings for supplies, return before night pressure gets out of control, and avoid wasting recovery items.',
  },
  {
    question: 'What tools help with exploration?',
    answer:
      'The checked guide source highlights practical navigation and timing tools such as the map, compass, workbench, and sundial.',
  },
  {
    question: 'Should I save bandages?',
    answer:
      'Yes. Bandages are best treated as revive and recovery resources, especially in team runs where one revive can save the route.',
  },
  {
    question: 'Is this an official 99 Nights in the Forest guide?',
    answer:
      "No. This is a fan-made guide based on checked source material and is not affiliated with Roblox or Grandma's Favourite Games.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const monthYear = currentMonthYear();
  const canonical = canonicalUrl(
    '/roblox/99-nights-in-the-forest/survival-guide/',
    locale
  );

  return {
    title: `99 Nights in the Forest Survival Guide (${monthYear})`,
    description:
      'A checked 99 Nights in the Forest survival guide for campfire priorities, early looting, upgrades, navigation tools, and team recovery.',
    keywords: seoKeywords.ninetyNineNightsSurvivalGuide,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `99 Nights in the Forest Survival Guide (${monthYear})`,
      description:
        'Learn the practical survival route for 99 Nights in the Forest before wasting resources or losing the campfire.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function SurvivalGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/survival-guide/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const robloxUrl = canonicalUrl('/roblox/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Roblox', item: robloxUrl },
    { name: game.name, item: gameUrl },
    { name: 'Survival Guide', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const videoGameSchema = buildVideoGameSchema({
    name: game.name,
    description: game.description,
    url: game.robloxUrl,
    imageUrl: game.imageUrl,
    developer: game.developer,
    genre: game.genre,
    dateModified: game.updatedAt,
  });

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoGameSchema),
        }}
      />

      <section className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Survival guide</Badge>
            <Badge variant="outline">
              Checked {ninetyNineNightsSurvivalGuide.checkedAt}
            </Badge>
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              99 Nights in the Forest Survival Guide
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg">
              A practical route for keeping the fire alive, looting safely,
              choosing upgrades, and avoiding the early mistakes that collapse a
              run.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium shadow-xs"
              href="/roblox/99-nights-in-the-forest/codes"
            >
              Check codes
            </Link>
            <Link
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium shadow-xs"
              href="/roblox/99-nights-in-the-forest/classes"
            >
              Compare classes
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Source trail</CardTitle>
            <CardDescription>
              This page avoids invented stats, drop rates, and hidden formulas.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm">
            <p>
              Source: {ninetyNineNightsSurvivalGuide.source.name}, checked{' '}
              {ninetyNineNightsSurvivalGuide.source.checkedAt}.
            </p>
            <a
              className="text-foreground inline-flex items-center gap-1 font-medium underline underline-offset-4"
              href={ninetyNineNightsSurvivalGuide.source.url}
              rel="noreferrer"
              target="_blank"
            >
              Open source
              <ExternalLink className="size-3.5" />
            </a>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Quick survival checklist</CardTitle>
            <CardDescription>
              Use this as the short version before starting a run.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground space-y-2 text-sm">
              {ninetyNineNightsSurvivalGuide.quickChecklist.map((item) => (
                <li className="flex gap-2" key={item}>
                  <span className="text-primary mt-1 size-1.5 shrink-0 rounded-full bg-current" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common mistakes</CardTitle>
            <CardDescription>
              These are the failure points to avoid in early runs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground space-y-2 text-sm">
              {ninetyNineNightsSurvivalGuide.mistakes.map((item) => (
                <li className="flex gap-2" key={item}>
                  <span className="text-destructive mt-1 size-1.5 shrink-0 rounded-full bg-current" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Survival Route
          </h2>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Follow the route in priority order: keep the camp alive first, then
            improve exploration, upgrades, and team recovery.
          </p>
        </div>

        <div className="grid gap-4">
          {ninetyNineNightsSurvivalGuide.sections.map((section) => (
            <Card
              className={priorityStyles[section.priority]}
              key={section.title}
            >
              <CardHeader>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>{priorityLabels[section.priority]}</Badge>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </div>
                <CardDescription>{section.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-3">
                  {section.actions.map((action) => (
                    <div
                      className="bg-background/80 rounded-md border p-3 text-sm"
                      key={action}
                    >
                      {action}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>How this guide stays current</CardTitle>
            <CardDescription>
              Survival guidance changes slower than code lists, but it still
              needs a source check.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm">
            <p>
              The strategy is not second-by-second realtime data. Each guide
              page carries a checked date and source trail, then gets reviewed
              when the game updates or when higher-priority sources change.
            </p>
            <p>
              Codes pages get the highest refresh cadence. Guides, class lists,
              and wiki pages are refreshed on a weekly or update-triggered
              cadence unless the game has a major balance patch.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related pages</CardTitle>
            <CardDescription>
              Continue the 99 Nights cluster with codes and class choices.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/codes"
            >
              Working codes and source history
            </Link>
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/crafting"
            >
              Crafting guide and bench upgrades
            </Link>
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/bandages"
            >
              How to craft bandages
            </Link>
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/classes"
            >
              All classes reference
            </Link>
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/animals"
            >
              Animals and taming
            </Link>
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/taming-flute"
            >
              Taming Flute upgrades
            </Link>
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/class-tier-list"
            >
              Class tier list
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <CardHeader>
                <CardTitle className="text-base">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                {faq.answer}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
