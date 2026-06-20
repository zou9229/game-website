import type { Metadata } from 'next';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import { ExternalLink } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  buildBreadcrumbSchema,
  buildVideoGameSchema,
  canonicalUrl,
  currentMonthYear,
  getBaseUrl,
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
const heroImageUrl = '/imgs/roblox/99-nights-thumbnail-1.jpg';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const monthYear = currentMonthYear();
  const canonical = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);

  return {
    title: `99 Nights in the Forest Guide and Tools (${monthYear})`,
    description:
      '99 Nights in the Forest Roblox hub with codes, class references, tier list, animals, survival guide, and checked game facts.',
    keywords: seoKeywords.ninetyNineNightsHub,
    alternates: { canonical },
    openGraph: {
      title: `99 Nights in the Forest Guide and Tools (${monthYear})`,
      description:
        '99 Nights in the Forest Roblox hub with codes, class references, tier list, animals, survival guide, and checked game facts.',
      url: canonical,
      images: [
        { url: `${getBaseUrl()}${heroImageUrl}`, width: 1280, height: 720 },
      ],
      type: 'website',
    },
  };
}

export default async function GameHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!game) return null;

  const canonical = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: canonical },
  ]);
  const videoGameSchema = buildVideoGameSchema({
    name: game.name,
    description: game.description,
    url: canonical,
    imageUrl: game.imageUrl,
    developer: game.developer,
    genre: game.genre,
    dateModified: game.updatedAt,
  });

  return (
    <main className="bg-background min-h-screen">
      {[breadcrumbSchema, videoGameSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <Badge variant="outline" className="mb-4">
            Roblox {game.genre}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            {game.name} guide and tools
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            Verified facts, codes, classes, animals, tier list, and survival
            guidance for one of the current high-demand Roblox survival games.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roblox/99-nights-in-the-forest/codes"
              className="bg-primary text-primary-foreground inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium"
            >
              View codes
            </Link>
            <a
              href={game.robloxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border px-4 text-sm font-medium"
            >
              Roblox page
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>

        <Card className="rounded-lg">
          <CardContent className="pt-4">
            <img
              src={heroImageUrl}
              alt="Official Roblox thumbnail for 99 Nights in the Forest showing players defending a camp from the forest creature"
              className="aspect-[16/9] w-full rounded-md object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <p className="text-muted-foreground mt-3 text-sm">
              Official Roblox thumbnail used for identification and guide
              commentary. Game facts and code status are kept in the
              source-checked data tables below.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-12 sm:px-6 md:grid-cols-4 lg:px-8">
        {[
          ['Playing', game.stats.playing.toLocaleString()],
          ['Visits', game.stats.visits.toLocaleString()],
          ['Favorites', game.stats.favorites.toLocaleString()],
          ['Max players', game.maxPlayers.toString()],
        ].map(([label, value]) => (
          <Card key={label} className="rounded-lg">
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle>{value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          99 Nights pages
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {game.pages.map((page) => (
            <Card key={page.href} className="rounded-lg">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle>{page.title}</CardTitle>
                  <Badge
                    variant={page.status === 'live' ? 'default' : 'outline'}
                  >
                    {page.status === 'live' ? 'Live' : 'Planned'}
                  </Badge>
                </div>
                <CardDescription>{page.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {page.status === 'live' ? (
                  <Link
                    href={page.href}
                    className="text-primary text-sm font-medium underline-offset-4 hover:underline"
                  >
                    Open {page.title.toLowerCase()}
                  </Link>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Planned after a verified data pass.
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
