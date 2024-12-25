// app/components/dashboard/metrics/TotalTrades.tsx
import Card from "@/app/components/shared/Card";
import { motion } from "framer-motion";
import { styles } from "@/app/styles/utils";

interface TotalTradesProps {
  wins: number;
  losses: number;
}

export function TotalTrades({ wins, losses }: TotalTradesProps) {
  const total = wins + losses;

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className={styles.text.heading}>Total Trades</h3>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-3xl font-bold mt-2"
            >
              {total}
            </motion.p>
          </div>
          <div className="flex gap-2 text-sm">
            <span className={styles.text.success}>{wins} W</span>
            <span className="text-gray-400">/</span>
            <span className={styles.text.error}>{losses} L</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
