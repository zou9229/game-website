import { RobloxSiteShell } from '@/components/roblox/roblox-site-shell';

export default function RobloxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RobloxSiteShell>{children}</RobloxSiteShell>;
}
