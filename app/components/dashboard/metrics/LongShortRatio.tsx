// app/components/dashboard/metrics/LongShortRatio.tsx
import Card from "@/app/components/shared/Card";
import { motion } from "framer-motion";
import { styles } from "@/app/styles/utils";
import { theme } from "@/app/styles/theme";

interface RatioBarProps {
  percentage: number;
  color: string;
  count: number;
  label: string;
}

function RatioBar({ percentage, color, count, label }: RatioBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className={styles.text.body}>{label}</span>
        <span className="text-white font-medium">
          {percentage.toFixed(2)}% ({count})
        </span>
      </div>
      <div className="h-2 bg-[#131A2B] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

interface LongShortRatioProps {
  longPercentage: number;
  shortPercentage: number;
  longCount: number;
  shortCount: number;
}

export function LongShortRatio({
  longPercentage,
  shortPercentage,
  longCount,
  shortCount,
}: LongShortRatioProps) {
  return (
    <Card className="col-span-full lg:col-span-2">
      <div className="p-6 space-y-4">
        <h3 className={styles.text.heading}>Long/Short Ratio</h3>
        <div className="space-y-4">
          <RatioBar
            percentage={longPercentage}
            color={theme.colors.state.success.primary}
            count={longCount}
            label="Long Trades"
          />
          <RatioBar
            percentage={shortPercentage}
            color={theme.colors.state.error.primary}
            count={shortCount}
            label="Short Trades"
          />
        </div>
        <div className="pt-2">
          <p className={styles.text.body}>
            Based on {longCount + shortCount} total trades
          </p>
        </div>
      </div>
    </Card>
  );
}
