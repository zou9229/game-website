import { SiteHeader } from '@/components/site-header';

export async function Header() {
  const navLinks = [
    { href: '/roblox', label: 'Roblox' },
    { href: '/codes', label: 'Codes' },
    { href: '/roblox/99-nights-in-the-forest/updates', label: 'Updates' },
  ];

  return <SiteHeader navLinks={navLinks} />;
}
