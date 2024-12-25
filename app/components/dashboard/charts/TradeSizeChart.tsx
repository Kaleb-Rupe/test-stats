// app/components/dashboard/charts/TradeSizeChart.tsx
import Card from "@/app/components/shared/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { theme } from "@/app/styles/theme";
import { styles } from "@/app/styles/utils";

interface TradeSizeData {
  size: string;
  wins: number;
  losses: number;
}

interface TradeSizeChartProps {
  data: TradeSizeData[];
}

export function TradeSizeChart({ data }: TradeSizeChartProps) {
  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className={styles.text.heading}>Trade Size Report</h3>
            <p className={styles.text.body}>
              A breakdown of your trades segmented by size (USD)
            </p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <XAxis
                type="number"
                stroke={theme.colors.text.muted}
                tick={{ fill: theme.colors.text.muted }}
              />
              <YAxis
                type="category"
                dataKey="size"
                stroke={theme.colors.text.muted}
                tick={{ fill: theme.colors.text.muted }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.colors.background.secondary,
                  border: `1px solid ${theme.colors.border.primary}`,
                }}
                labelStyle={{ color: theme.colors.text.primary }}
              />
              <Bar
                dataKey="wins"
                fill={theme.colors.state.success.primary}
                stackId="stack"
              />
              <Bar
                dataKey="losses"
                fill={theme.colors.state.error.primary}
                stackId="stack"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
