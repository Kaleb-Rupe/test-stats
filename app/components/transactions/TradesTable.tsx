import { Card } from "@tremor/react";
import {
  formatMarketValue,
  formatCurrency,
  formatTimestamp,
} from "@/lib/utils/formatters";
import { MARKETS } from "@/lib/utils/markets";
import { useState } from "react";
import { TradingHistoryData } from "@/app/lib/api/types/flash-trade";

interface TradesTableProps {
  itemsPerPage?: number;
  trades: TradingHistoryData[];
  address: string;
}

export function TradesTable({
  itemsPerPage = 10,
  trades,
  // address,
}: TradesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(trades.length / itemsPerPage);

  const sortedTrades = trades.sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTrades = sortedTrades.slice(startIndex, endIndex);

  return (
    <Card className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Trading History</h3>
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1}-{Math.min(endIndex, trades.length)} of{" "}
          {trades.length} trades
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Table headers */}
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Market</th>
              <th className="px-4 py-3 text-right">Size</th>
              <th className="px-4 py-3 text-right">PnL</th>
              <th className="px-4 py-3 text-right">Fee</th>
              <th className="px-4 py-3 text-right">Trx</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {currentTrades.map((trade) => {
              const date = formatTimestamp(trade.timestamp);
              const feeInUsd = formatCurrency(
                formatMarketValue(trade.feeAmount, trade.market)
              );

              return (
                <tr
                  key={trade.txId}
                  className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="px-4 py-3">{date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full font-medium text-xs
                      ${
                        trade.side === "long"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {trade.tradeType.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {MARKETS[trade.market]?.name || trade.market}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {trade.sizeUsd
                      ? formatCurrency(Number(trade.sizeUsd) * 1e-6)
                      : "-"}
                  </td>
                  <td
                    className={`px-4 py-3 text-right ${
                      Number(trade.pnlUsd) * 1e-6 > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {trade.pnlUsd
                      ? formatCurrency(Number(trade.pnlUsd) * 1e-6)
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-right">{feeInUsd}</td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href={`https://explorer.solana.com/tx/${trade.txId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      View
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </Card>
  );
}
