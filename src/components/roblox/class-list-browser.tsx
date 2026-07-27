'use client';

import { useMemo, useState } from 'react';
import type {
  ClassAvailability,
  ClassCurrency,
  ClassEntry,
} from '@/data/99-nights-classes';
import { ExternalLink, Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

type AvailabilityFilter = 'all' | ClassAvailability;

const filters: { label: string; value: AvailabilityFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Limited', value: 'limited' },
  { label: 'Removed', value: 'removed' },
];

const availabilityLabels: Record<ClassAvailability, string> = {
  active: 'Active pool',
  limited: 'Limited',
  removed: 'Removed',
};

const currencyLabels: Record<ClassCurrency, string> = {
  diamonds: 'diamonds',
  candy: 'candy',
  'candy-canes': 'candy canes',
  eggs: 'eggs',
};

function sourceUrl(entry: ClassEntry) {
  const title = entry.sourceTitle ?? entry.name;
  return `https://99-nights-in-the-forest.fandom.com/wiki/${encodeURIComponent(title).replace(/%20/g, '_')}`;
}

export function ClassListBrowser({ classes }: { classes: ClassEntry[] }) {
  const [query, setQuery] = useState('');
  const [availability, setAvailability] = useState<AvailabilityFilter>('all');

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return classes.filter((entry) => {
      const matchesAvailability =
        availability === 'all' || entry.availability === availability;
      const matchesQuery =
        !normalizedQuery ||
        entry.name.toLowerCase().includes(normalizedQuery) ||
        currencyLabels[entry.currency].includes(normalizedQuery);

      return matchesAvailability && matchesQuery;
    });
  }, [availability, classes, query]);

  return (
    <div className="rounded-lg border">
      <div className="border-b p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <label className="space-y-2">
            <span className="text-sm font-medium">Find a class</span>
            <span className="relative block">
              <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                className="w-full pl-9 lg:min-w-80"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Cyborg, Engineer, Vampire..."
                type="search"
                value={query}
              />
            </span>
          </label>

          <div className="flex flex-wrap gap-2" aria-label="Class availability">
            {filters.map((filter) => (
              <button
                className={cn(
                  'min-h-9 rounded-md border px-3 text-sm font-medium transition-colors',
                  availability === filter.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background hover:bg-accent'
                )}
                key={filter.value}
                onClick={() => setAvailability(filter.value)}
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-muted-foreground mt-4 text-sm" aria-live="polite">
          Showing {results.length} of {classes.length} classes from the checked
          source snapshot.
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {results.map((entry) => (
            <div
              className="border-b p-4 sm:border-r sm:p-5 lg:[&:nth-child(3n)]:border-r-0"
              key={entry.name}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{entry.name}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {entry.price.toLocaleString()}{' '}
                    {currencyLabels[entry.currency]}
                  </p>
                </div>
                <Badge
                  variant={
                    entry.availability === 'active' ? 'secondary' : 'outline'
                  }
                >
                  {availabilityLabels[entry.availability]}
                </Badge>
              </div>
              <a
                className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
                href={sourceUrl(entry)}
                rel="noopener noreferrer"
                target="_blank"
              >
                Source entry
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="font-medium">No matching class</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Try a shorter name or switch the availability filter.
          </p>
        </div>
      )}
    </div>
  );
}
