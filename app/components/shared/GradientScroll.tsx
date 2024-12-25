"use client";

import { useRef, ReactNode } from "react";
import { useScrollGradient } from "@/hooks/useScrollGradient";
import { motion, AnimatePresence } from "framer-motion";

interface GradientScrollProps {
  children: ReactNode;
  className?: string;
}

export function GradientScroll({
  children,
  className = "",
}: GradientScrollProps) {
  // Changed type to be more specific
  const containerRef = useRef<HTMLDivElement>(null);
  const { showStartGradient, showEndGradient } = useScrollGradient(
    containerRef as React.RefObject<HTMLElement>
  );

  return (
    <div className="relative">
      <AnimatePresence>
        {showStartGradient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.15), transparent)",
            }}
          />
        )}
      </AnimatePresence>

      <div
        ref={containerRef}
        className={`overflow-x-auto scrollbar-hide ${className}`}
      >
        {children}
      </div>

      <AnimatePresence>
        {showEndGradient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to left, rgba(0,0,0,0.15), transparent)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
