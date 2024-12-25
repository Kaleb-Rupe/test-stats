"use client";

import { useEffect, useState } from "react";
import { TradesTable } from "@/components/transactions/TradesTable";
import { fetchTradingHistory } from "@/lib/api/flash-trade";

export default function TransactionsPage({
  params,
}: {
  params: { address: string };
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [trades, setTrades] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTrades = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTradingHistory(params.address);
        setTrades(data);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrades();
  }, [params.address]);

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
      <TradesTable trades={trades} address={params.address} itemsPerPage={20} />
    </div>
  );
}
