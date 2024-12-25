// app/components/shared/Card.tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { styles } from "@/app/styles/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export default function Card({
  children,
  className = "",
  animate = true,
}: CardProps) {
  if (!animate) {
    return (
      <div className={`${styles.card.base} ${styles.card.hover} ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className={`${styles.card.base} ${styles.card.hover} ${className}`}
    >
      {children}
    </motion.div>
  );
}