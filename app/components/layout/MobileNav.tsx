"use client";

import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const params = useParams();
  const address = params.address as string;

  const navigation = [
    {
      name: "Dashboard",
      href: `/${address}`,
      icon: HomeIcon,
      current: pathname === `/${address}`,
    },
    {
      name: "Analytics",
      href: `/${address}/analytics`,
      icon: ChartBarIcon,
      current: pathname === `/${address}/analytics`,
    },
    {
      name: "Transactions",
      href: `/${address}/transactions`,
      icon: ClipboardDocumentListIcon,
      current: pathname === `/${address}/transactions`,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Navigation Panel */}
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-64 bg-[#131A2B] shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white">
                  ⚡ Flash Tracker
                </h2>
              </div>

              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      item.current
                        ? "bg-[#1E2B45] text-white"
                        : "text-gray-400 hover:bg-[#1A2337] hover:text-white"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
