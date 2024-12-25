import { useState, useEffect } from "react";
import { fetchTradingHistory } from "@/lib/api/flash-trade";
import { processTradingData } from "@/lib/utils/transformations";
import type { TradingHistoryData } from "@/lib/api/types/flash-trade";

export function useTransactions(address: string) {
  const [data, setData] = useState<TradingHistoryData[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [processedData, setProcessedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const trades = await fetchTradingHistory(address);
        setData(trades);

        const processed = processTradingData(trades);
        setProcessedData(processed);
      } catch (e) {
        setError(
          e instanceof Error ? e : new Error("Failed to load transactions")
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (address) {
      loadData();
    }
  }, [address]);

  return {
    data,
    processedData,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      return fetchTradingHistory(address);
    },
  };
}
