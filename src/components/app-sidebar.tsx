"use client";

import { type LucideIcon, ChevronsUpDown, LayoutDashboard, Shield, Globe } from "lucide-react";
import Image from "next/image";
import { Link, usePathname } from "@/core/i18n/navigation";
import { useTranslations } from "next-intl";
import { envConfigs } from "@/config";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  group?: string;
}

const SYSTEMS = [
  { key: "admin", href: "/admin", icon: Shield },
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "landing", href: "/", icon: Globe },
] as const;

export function AppSidebar({
  brand,
  brandHref = "/",
  navItems,
  footerNavItems,
  footer,
}: {
  brand: React.ReactNode;
  brandHref?: string;
  navItems: NavItem[];
  footerNavItems?: NavItem[];
  footer?: React.ReactNode;
}) {
  const pathname = usePathname();
  const t = useTranslations("common");

  // Group nav items
  const groups: { label?: string; items: NavItem[] }[] = [];
  let currentGroup: string | undefined = '__initial__';
  for (const item of navItems) {
    if (item.group !== currentGroup) {
      groups.push({ label: item.group, items: [item] });
      currentGroup = item.group;
    } else {
      groups[groups.length - 1].items.push(item);
    }
  }

  // Detect current system
  const currentSystem = SYSTEMS.find(
    (s) => s.key !== "landing" && pathname.startsWith(s.href)
  ) || SYSTEMS[2]; // fallback to landing

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer outline-none"
              >
                <div className="flex size-6 items-center justify-center">
                  <Image
                    src={envConfigs.app_logo}
                    alt={typeof brand === 'string' ? brand : 'Logo'}
                    width={24}
                    height={24}
                    className="size-6 rounded-md"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{brand}</span>
                  <span className="text-xs text-muted-foreground">
                    {t(`systems.${currentSystem.key}`)}
                  </span>
                </div>
                <ChevronsUpDown className="size-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
                <DropdownMenuLabel>{t("systems.label")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {SYSTEMS.map((sys) => {
                  const Icon = sys.icon;
                  const isCurrent = sys.key === currentSystem.key;
                  return (
                    <DropdownMenuItem
                      key={sys.key}
                      disabled={isCurrent}
                      onClick={() => {
                        if (!isCurrent) {
                          window.open(sys.href, "_blank");
                        }
                      }}
                    >
                      <Icon className="size-4" />
                      {t(`systems.${sys.key}`)}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group, gi) => (
          <SidebarGroup key={gi}>
            {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
            <SidebarGroupContent className="flex flex-col gap-2">
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === navItems[0]?.href
                      ? pathname === item.href
                      : pathname.startsWith(item.href);
                  return (
                    <SidebarMenuItem key={item.href}>
                      <Link href={item.href}>
                        <SidebarMenuButton tooltip={item.label} isActive={isActive}>
                          <Icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        {footerNavItems && footerNavItems.length > 0 && (
          <SidebarMenu>
            {footerNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href}>
                    <SidebarMenuButton tooltip={item.label} isActive={isActive}>
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        )}
        {footer}
      </SidebarFooter>
    </Sidebar>
  );
}
