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
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          {images.map((image) => (
            <figure
              key={image.src}
              className="overflow-hidden rounded-lg border"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-video w-full object-cover"
                loading="lazy"
              />
              <figcaption className="bg-muted/40 space-y-1 p-3">
                <p className="text-sm font-medium">{image.title}</p>
                <p className="text-muted-foreground text-xs leading-5">
                  {image.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {videoSearches.length > 0 ? (
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-semibold">Video research signals</h3>
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              These links are used as demand signals and visual research. They
              do not override source-checked written data.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {videoSearches.map((video) => (
                <a
                  key={video.href}
                  href={video.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-accent rounded-md border p-3"
                >
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    {video.title}
                    <ExternalLink className="size-3.5" />
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
