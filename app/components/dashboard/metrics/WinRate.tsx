// app/components/dashboard/metrics/WinRate.tsx
import Card from "@/app/components/shared/Card";
import CircularProgress from "@/app/components/shared/CircularProgress";
import { theme } from "@/app/styles/theme";
import { styles } from "@/app/styles/utils";

interface WinRateProps {
  winRate: number;
  totalWins: number;
  totalTrades: number;
}

export function WinRate({ winRate, totalWins, totalTrades }: WinRateProps) {
  return (
    <Card>
      <div className="p-6">
        <h3 className={styles.text.heading}>Win Rate</h3>
        <div className="flex items-center justify-between mt-4">
          <CircularProgress
            percentage={winRate}
            color={
              winRate >= 50
                ? theme.colors.state.success.primary
                : theme.colors.state.error.primary
            }
          />
          <div className="text-right">
            <p className={styles.text.subheading}>{totalWins} wins</p>
            <p className={styles.text.body}>out of {totalTrades} trades</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
