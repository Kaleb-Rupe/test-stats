// app/components/dashboard/metrics/TradeDuration.tsx
import Card from "@/app/components/shared/Card";
import { motion } from "framer-motion";
import { styles } from "@/app/styles/utils";
import { ClockIcon } from "@heroicons/react/24/outline";

interface TradeDurationProps {
  avgDuration: string; // Format: "1h 3m 23s"
  showDetail?: boolean;
}

export function TradeDuration({
  avgDuration,
  showDetail = true,
}: TradeDurationProps) {
  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-[#00E6E6]" />
              <h3 className={styles.text.heading}>Avg Trade Duration</h3>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2"
            >
              <p className="text-2xl font-bold text-white">{avgDuration}</p>
              {showDetail && (
                <p className={styles.text.body}>Average time in position</p>
              )}
            </motion.div>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#131A2B] p-2 rounded-lg"
          >
            <span className="text-[#00E6E6]">View →</span>
          </motion.div>
        </div>
      </div>
    </Card>
  );
}
