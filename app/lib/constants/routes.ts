import {
  HomeIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

export const ROUTES = {
  HOME: "/",
  DASHBOARD: (address: string) => `/${address}`,
  ANALYTICS: (address: string) => `/${address}/analytics`,
  TRANSACTIONS: (address: string) => `/${address}/transactions`,
} as const;

export const NAVIGATION = (address: string) =>
  [
    {
      name: "Dashboard",
      href: ROUTES.DASHBOARD(address),
      icon: HomeIcon,
    },
    {
      name: "Analytics",
      href: ROUTES.ANALYTICS(address),
      icon: ChartBarIcon,
    },
    {
      name: "Transactions",
      href: ROUTES.TRANSACTIONS(address),
      icon: ClipboardDocumentListIcon,
    },
  ] as const;

export const API_ROUTES = {
  TRADING_HISTORY: (address: string) =>
    `https://api.prod.flash.trade/trading-history/find-all-by-user-v2/${address}`,
  PNL_INFO: (address: string) =>
    `https://api.prod.flash.trade/pnl-info/by-owner/${address}`,
} as const;
