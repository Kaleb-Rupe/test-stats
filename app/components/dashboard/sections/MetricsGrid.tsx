import { TotalTrades } from "@/app/components/dashboard/metrics/TotalTrades";
import { WinRate } from "@/app/components/dashboard/metrics/WinRate";
import { TradeDuration } from "@/app/components/dashboard/metrics/TradeDuration";
import { LongShortRatio } from "@/app/components/dashboard/metrics/LongShortRatio";
import { styles } from "@/styles/utils";
import { Tooltip } from "@/components/shared/Tooltip";
import { METRICS } from "@/lib/constants/metrics";

interface MetricsGridProps {
  totalTrades: number;
  wins: number;
  losses: number;
  winRate: number;
  avgDuration: string;
  longPercentage: number;
  shortPercentage: number;
  longCount: number;
  shortCount: number;
}

export function MetricsGrid({
  totalTrades,
  wins,
  losses,
  winRate,
  avgDuration,
  longPercentage,
  shortPercentage,
  longCount,
  shortCount,
}: MetricsGridProps) {
  const getWinRateStatus = () => {
    if (winRate >= METRICS.WIN_LOSS_THRESHOLDS.EXCELLENT) return "Excellent";
    if (winRate >= METRICS.WIN_LOSS_THRESHOLDS.GOOD) return "Good";
    if (winRate >= METRICS.WIN_LOSS_THRESHOLDS.AVERAGE) return "Average";
    return "Needs Improvement";
  };

  return (
    <div className={styles.grid.dashboard}>
      <Tooltip content="Total number of completed trades">
        <div>
          <TotalTrades wins={wins} losses={losses} />
        </div>
      </Tooltip>

      <Tooltip content={`Win Rate Status: ${getWinRateStatus()}`}>
        <div>
          <WinRate
            winRate={winRate}
            totalWins={wins}
            totalTrades={totalTrades}
          />
        </div>
      </Tooltip>

      <Tooltip content="Average time spent in trades">
        <div>
          <TradeDuration avgDuration={avgDuration} />
        </div>
      </Tooltip>

      <Tooltip content="Distribution of long vs short positions">
        <div>
          <LongShortRatio
            longPercentage={longPercentage}
            shortPercentage={shortPercentage}
            longCount={longCount}
            shortCount={shortCount}
          />
        </div>
      </Tooltip>
    </div>
  );
}
