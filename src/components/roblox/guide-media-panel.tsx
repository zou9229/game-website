import type { GuideImage, GuideVideoSearch } from '@/data/99-nights-media';
import { ExternalLink } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type GuideMediaPanelProps = {
  title: string;
  description: string;
  images: GuideImage[];
  videoSearches?: GuideVideoSearch[];
};

export function GuideMediaPanel({
  title,
  description,
  images,
  videoSearches = [],
}: GuideMediaPanelProps) {
  const heroImage = images[0];
  const supportingImages = images.slice(1);

  return (
    <Card className="quest-media-panel mb-8 overflow-hidden rounded-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {heroImage ? (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
            <figure className="relative min-h-[260px] overflow-hidden rounded-lg border bg-zinc-950 shadow-sm">
              <img
                src={heroImage.src}
                alt={heroImage.alt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/24 to-black/10" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="inline-flex rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[0.65rem] font-bold tracking-[0.14em] text-lime-100 uppercase backdrop-blur">
                  Real game thumbnail
                </p>
                <p className="mt-3 text-xl font-semibold">{heroImage.title}</p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/72">
                  {heroImage.caption}
                </p>
              </figcaption>
            </figure>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {supportingImages.map((image) => (
                <figure
                  key={image.src}
                  className="bg-card grid grid-cols-[110px_1fr] overflow-hidden rounded-lg border"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full min-h-28 w-full object-cover"
                    loading="lazy"
                  />
                  <figcaption className="space-y-1 p-3">
                    <p className="text-sm font-medium">{image.title}</p>
                    <p className="text-muted-foreground line-clamp-3 text-xs leading-5">
                      {image.caption}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : null}

        {videoSearches.length > 0 ? (
          <div className="bg-muted/30 rounded-lg border p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold">
                  Video research signals
                </h3>
                <p className="text-muted-foreground mt-1 text-sm leading-6">
                  Used for demand and visual research. Written facts still need
                  source-checked confirmation.
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {videoSearches.map((video) => (
                <a
                  key={video.href}
                  href={video.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hover:bg-accent bg-background rounded-md border p-3 transition-colors"
                >
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    {video.title}
                    <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="text-muted-foreground mt-2 block text-xs leading-5">
                    {video.description}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
