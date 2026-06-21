'use client';

import { useEffect, useMemo, useState } from 'react';
import { Database, ExternalLink, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import { Link } from '@/core/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type FreshnessStatus = 'fresh' | 'due-soon' | 'stale';

type FreshnessItem = {
  title: string;
  href: string;
  kind: string;
  checkedAt: string;
  cadenceDays: number;
  owner: string;
  note: string;
  ageDays: number;
  status: FreshnessStatus;
};

type FreshnessResponse = {
  generatedAt: string;
  summary: {
    total: number;
    fresh: number;
    dueSoon: number;
    stale: number;
    automationCandidates: number;
  };
  items: FreshnessItem[];
  nextStep: string;
};

const statusTone = {
  fresh: 'default',
  'due-soon': 'secondary',
  stale: 'destructive',
} as const;

export default function AdminGameDataPage() {
  const [data, setData] = useState<FreshnessResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadFreshness({ showToast = false } = {}) {
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin/game-data/freshness', {
        cache: 'no-store',
      });
      const json = await res.json();
      if (json.code !== 0) throw new Error(json.message || 'Audit failed');
      setData(json.data);
      if (showToast) toast.success('Freshness audit refreshed');
    } catch (error: any) {
      toast.error(error.message || 'Failed to refresh audit');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadFreshness();
  }, []);

  const sortedItems = useMemo(() => {
    const rank = { stale: 0, 'due-soon': 1, fresh: 2 };
    return [...(data?.items || [])].sort((a, b) => {
      const statusDiff = rank[a.status] - rank[b.status];
      if (statusDiff !== 0) return statusDiff;
      return b.ageDays - a.ageDays;
    });
  }, [data]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Database className="text-primary size-5" />
            <h1 className="text-2xl font-bold">Game Data Freshness</h1>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Read-only audit for Quest Codes game data. It shows which Roblox
            pages are fresh, due soon, or stale before a manual source check or
            scheduled data job changes live content.
          </p>
        </div>
        <Button
          onClick={() => loadFreshness({ showToast: true })}
          disabled={refreshing}
        >
          <RefreshCw
            className={`mr-2 size-4 ${refreshing ? 'animate-spin' : ''}`}
          />
          Run audit
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[
          ['Total', data?.summary.total ?? 0],
          ['Fresh', data?.summary.fresh ?? 0],
          ['Due soon', data?.summary.dueSoon ?? 0],
          ['Stale', data?.summary.stale ?? 0],
          ['Automation candidates', data?.summary.automationCandidates ?? 0],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <CardDescription>{label}</CardDescription>
              <CardTitle>{value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audit policy</CardTitle>
          <CardDescription>
            This button refreshes audit state only. It does not scrape external
            sites, edit data files, create commits, or deploy.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2 text-sm">
          <p>
            Current implementation is intentionally conservative: codes and
            update pages can become automation candidates first, while
            guide/tier-list pages stay manual-review because wrong game data is
            worse than stale data.
          </p>
          {data ? (
            <p>
              Last audit generated at{' '}
              <span className="text-foreground font-medium">
                {new Date(data.generatedAt).toLocaleString()}
              </span>
              .
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tracked pages</CardTitle>
          <CardDescription>
            Sorted by stale risk, then by oldest checked date.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-sm">Loading audit...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3 pr-4 font-medium">Status</th>
                    <th className="py-3 pr-4 font-medium">Page</th>
                    <th className="py-3 pr-4 font-medium">Kind</th>
                    <th className="py-3 pr-4 font-medium">Checked</th>
                    <th className="py-3 pr-4 font-medium">Age</th>
                    <th className="py-3 pr-4 font-medium">Cadence</th>
                    <th className="py-3 pr-4 font-medium">Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedItems.map((item) => (
                    <tr key={item.href} className="border-b align-top">
                      <td className="py-3 pr-4">
                        <Badge variant={statusTone[item.status]}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="font-medium">{item.title}</div>
                        <p className="text-muted-foreground mt-1 max-w-md text-xs leading-5">
                          {item.note}
                        </p>
                        <Link
                          href={item.href}
                          target="_blank"
                          className="text-primary mt-2 inline-flex items-center gap-1 text-xs"
                        >
                          Open page
                          <ExternalLink className="size-3" />
                        </Link>
                      </td>
                      <td className="py-3 pr-4">{item.kind}</td>
                      <td className="py-3 pr-4">{item.checkedAt}</td>
                      <td className="py-3 pr-4">{item.ageDays}d</td>
                      <td className="py-3 pr-4">{item.cadenceDays}d</td>
                      <td className="py-3 pr-4">{item.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
