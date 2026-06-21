import { RobloxClusterNav } from '@/components/roblox/roblox-cluster-nav';

export default function NinetyNineNightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RobloxClusterNav />
      {children}
    </>
  );
}
