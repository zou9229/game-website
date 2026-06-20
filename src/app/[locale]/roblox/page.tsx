import type { Metadata } from 'next';
import { robloxGames } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import { Gamepad2 } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  buildBreadcrumbSchema,
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const monthYear = currentMonthYear();
  const canonical = canonicalUrl('/roblox/', locale);

  return {
    title: `Roblox Codes and Game Tools (${monthYear})`,
    description:
      'Fresh Roblox codes, game guides, tier lists, and tool pages for high-demand Roblox games.',
    keywords: seoKeywords.robloxHub,
    alternates: { canonical },
    openGraph: {
      title: `Roblox Codes and Game Tools (${monthYear})`,
      description:
        'Fresh Roblox codes, game guides, tier lists, and tool pages for high-demand Roblox games.',
      url: canonical,
      type: 'website',
    },
  };
}

export default async function RobloxHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const canonical = canonicalUrl('/roblox/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonical },
  ]);

  return (
    <main className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-4 gap-1.5">
            <Gamepad2 className="size-3.5" />
            Roblox tools hub
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            Roblox codes, guides, and game tools
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            Focused Roblox pages for current high-demand games. We start with
            verified code pages, then expand into class lists, tier lists, and
            calculators only after the data source is solid.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {robloxGames.map((game) => (
            <Card key={game.slug} className="rounded-lg">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-xl">{game.name}</CardTitle>
                    <CardDescription>
                      {game.genre} by {game.developer}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">Live</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <img
                  src={game.imageUrl}
                  alt={`${game.name} Roblox thumbnail`}
                  className="aspect-[16/9] w-full rounded-md object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
                <p className="text-muted-foreground text-sm leading-6">
                  {game.description}
                </p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="rounded-md border p-3">
                    <div className="text-muted-foreground text-xs">Playing</div>
                    <div className="font-semibold">
                      {game.stats.playing.toLocaleString()}
                    </div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-muted-foreground text-xs">Visits</div>
                    <div className="font-semibold">
                      {(game.stats.visits / 1000000000).toFixed(1)}B
                    </div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-muted-foreground text-xs">
                      Favorites
                    </div>
                    <div className="font-semibold">
                      {(game.stats.favorites / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/roblox/${game.slug}`}
                    className="text-primary text-sm font-medium underline-offset-4 hover:underline"
                  >
                    Game hub
                  </Link>
                  {game.pages
                    .filter((page) => page.status === 'live')
                    .map((page) => (
                      <Link
                        key={page.href}
                        href={page.href}
                        className="text-primary text-sm font-medium underline-offset-4 hover:underline"
                      >
                        {page.title}
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
