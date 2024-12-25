"use client";

import { useEffect, useState } from "react";
import { FilterControls } from "@/app/components/analytics/FilterControls";
import { PnLBreakdown } from "@/app/components/dashboard/PnLBreakdown";
import TradingMetricsDisplay from "@/app/components/dashboard/TradingMetricsDisplay";
import { fetchTradingHistory } from "@/lib/api/flash-trade";
import { TradingData } from "@/app/lib/api/types/flash-trade";

export default function AnalyticsPage({
  params,
}: {
  params: { address: string };
}) {
  const [trades, setTrades] = useState<TradingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTradingHistory(params.address);
        setTrades(data);
      } catch (error) {
        console.error("Failed to load analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [params.address]);

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <FilterControls />
      </div>

      <PnLBreakdown trades={trades} />
      <TradingMetricsDisplay trades={trades} />
    </div>
  );
}
