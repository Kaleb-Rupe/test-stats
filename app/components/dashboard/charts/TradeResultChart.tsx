// app/components/dashboard/charts/TradeResultChart.tsx
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

interface TradeResultData {
  time: string;
  value: number;
}

interface TradeResultChartProps {
  data: TradeResultData[];
}

export function TradeResultChart({ data }: TradeResultChartProps) {
  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className={styles.text.heading}>Trade Result By Time</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="time"
                stroke={theme.colors.text.muted}
                tick={{ fill: theme.colors.text.muted }}
              />
              <YAxis
                stroke={theme.colors.text.muted}
                tick={{ fill: theme.colors.text.muted }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.colors.background.secondary,
                  border: `1px solid ${theme.colors.border.primary}`,
                }}
                labelStyle={{ color: theme.colors.text.primary }}
              />
              <Bar
                dataKey="value"
                fill={theme.colors.primary.DEFAULT}
                radius={[4, 4, 0, 0]}
                fillOpacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
