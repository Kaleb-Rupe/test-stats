import { Card } from "@tremor/react";
import { TradeResultChart } from "../charts/TradeResultChart";
import { TradeSizeChart } from "../charts/TradeSizeChart";
import { DurationChart } from "../charts/DurationChart";
import { CHART_CONFIG, CHART_LAYOUTS } from "@/lib/constants/chart-config";
import { GradientScroll } from "@/components/shared/GradientScroll";

export interface ChartsGridProps {
  tradeResultData: {
    time: string;
    value: number;
  }[];
  tradeSizeData: {
    size: string;
    wins: number;
    losses: number;
  }[];
  durationData: {
    duration: string;
    wins: number;
    losses: number;
  }[];
}

export function ChartsGrid({
  tradeResultData,
  tradeSizeData,
  durationData,
}: ChartsGridProps) {
  return (
    <GradientScroll className="space-y-6">
      <Card>
        <TradeResultChart
          data={tradeResultData}
          config={CHART_CONFIG.CHART_STYLES.LINE.DEFAULT}
          layout={CHART_LAYOUTS.BASIC}
        />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <TradeSizeChart
            data={tradeSizeData}
            config={CHART_CONFIG.CHART_STYLES.BAR.DEFAULT}
            layout={CHART_LAYOUTS.COMPACT}
          />
        </Card>
        <Card>
          <DurationChart
            data={durationData}
            config={CHART_CONFIG.CHART_STYLES.BAR.DEFAULT}
            layout={CHART_LAYOUTS.COMPACT}
          />
        </Card>
      </div>
    </GradientScroll>
  );
}
