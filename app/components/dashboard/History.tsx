"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MetricsGrid } from "@/app/components/dashboard/sections/MetricsGrid";
import { ChartsGrid } from "@/app/components/dashboard/sections/ChartsGrid";
import Card from "@/app/components/shared/Card";
import { useToast } from "@/app/components/shared/Toast";
import {
  processTradingData,
  type ProcessedTradeData,
} from "@/app/lib/utils/transformations";
import { fetchTradingHistory } from "@/app/lib/api/flash-trade";
import { FilterControls } from "@/app/components/analytics/FilterControls";

interface DashboardPageProps {
  params: {
    address: string;
  };
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const [data, setData] = useState<ProcessedTradeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const trades = await fetchTradingHistory(params.address);
        const processedData = processTradingData(trades);
        setData(processedData);
      } catch (error) {
        console.error("Failed to load trading data:", error);
        showToast("Failed to load trading data", "error");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [params.address, showToast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg"
        >
          Loading trading data...
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-red-500">Error</h2>
            <p className="mt-2">
              Failed to load trading data. Please try again later.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Trading Dashboard</h1>
          <p className="text-gray-500">
            {params.address.slice(0, 6)}...{params.address.slice(-4)}
          </p>
        </div>
        <FilterControls />
      </div>

      <MetricsGrid
        totalTrades={data.metrics.totalTrades}
        wins={data.metrics.winCount}
        losses={data.metrics.lossCount}
        winRate={data.metrics.winRate}
        avgDuration={data.metrics.avgDuration}
        longPercentage={data.metrics.longRatio}
        shortPercentage={data.metrics.shortRatio}
        longCount={data.metrics.longCount || 0} // Need to add this to ProcessedTradeData
        shortCount={data.metrics.shortCount || 0} // Need to add this to ProcessedTradeData
      />

      <ChartsGrid
        tradeResultData={data.timeData}
        tradeSizeData={data.sizeData}
        durationData={data.durationData}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Additional Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Volume</span>
                <span className="font-medium">
                  ${data.metrics.totalVolume.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Win/Loss Ratio</span>
                <span className="font-medium">
                  {data.metrics.winCount}/{data.metrics.lossCount}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
