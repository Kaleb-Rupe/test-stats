"use client";

// app/components/layout/Sidebar.tsx
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChartBarIcon, HomeIcon, ClockIcon } from "@heroicons/react/24/outline";
import { cx, styles } from "@/app/styles/utils";

interface SidebarProps {
  params: { address: string };
}

export default function Sidebar({ params }: SidebarProps) {
  const pathname = usePathname();
  // const address = pathname.split("/")[1];

  const navigation = [
    {
      name: "Dashboard",
      href: `/${params.address}`,
      icon: HomeIcon,
      matcher: (path: string) => path === `/${params.address}`,
    },
    {
      name: "Analytics",
      href: `/${params.address}/analytics`,
      icon: ChartBarIcon,
      matcher: (path: string) => path.includes("/analytics"),
    },
    {
      name: "Transactions",
      href: `/${params.address}/transactions`,
      icon: ClockIcon,
      matcher: (path: string) => path.includes("/transactions"),
    },
  ];

  return (
    <div className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-0 bg-[#131A2B] border-r border-[#2D3748]">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight">⚡ Flash Tracker</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cx(
              styles.nav.item,
              item.matcher(pathname) ? styles.nav.active : styles.nav.inactive
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Flash Trade Link */}
      <div className="p-4">
        <a
          href="https://beast.flash.trade?referral=Beast_1373"
          target="_blank"
          rel="noopener noreferrer"
          className={
            styles.button.primary +
            " " +
            styles.button.sizes.md +
            " w-full text-center"
          }
        >
          Trade on Flash
        </a>
      </div>
    </div>
  );
}
