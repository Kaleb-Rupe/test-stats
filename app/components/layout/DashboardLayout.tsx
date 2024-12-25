"use client";

import { ReactNode, useState } from "react";
import { MobileNav } from "@/app/components/layout/MobileNav";
import { useWindowSize } from "@/hooks/useWindowSize";

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export function DashboardLayout({
  children,
  className = "",
}: DashboardLayoutProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width < 768; // md breakpoint

  return (
    <div className="min-h-screen bg-[#0A0B0F]">
      {/* Mobile Navigation Toggle */}
      {isMobile && (
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="fixed top-4 right-4 z-50 p-2 bg-[#131A2B] rounded-lg"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileNavOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      )}

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Main Content */}
      <main
        className={`transition-all duration-200 ${
          isMobile ? "pt-16" : ""
        } ${className}`}
      >
        <div
          className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
            isMobileNavOpen ? "blur-sm" : ""
          }`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
