import { TradingHistoryData } from "@/app/lib/api/types/flash-trade";
import { MARKETS } from "@/app/lib/utils/markets";

export interface ProcessedTradeData {
  timeData: {
    time: string;
    value: number;
  }[];
  sizeData: {
    size: string;
    wins: number;
    losses: number;
  }[];
  durationData: {
    duration: string;
    wins: number;
    losses: number;
  }[];
  metrics: {
    totalTrades: number;
    winCount: number;
    lossCount: number;
    winRate: number;
    avgDuration: string;
    longRatio: number;
    shortRatio: number;
    longCount: number;
    shortCount: number;
    avgTradeSize: number;
    totalVolume: number;
    netPnl: number;
  };
}

export function processTradingData(
  trades: TradingHistoryData[],
  selectedSymbol?: string
): ProcessedTradeData {
  // Initialize metrics
  let totalTrades = 0;
  let winCount = 0;
  let lossCount = 0;
  let totalVolume = 0;
  let netPnl = 0;
  let totalDuration = 0;
  let longCount = 0;
  let shortCount = 0;

  // Filter trades by symbol if selected
  const filteredTrades =
    selectedSymbol && selectedSymbol !== "All Symbols"
      ? trades.filter((trade) => {
          const market = MARKETS[trade.market];
          return market && market.name === selectedSymbol;
        })
      : trades;

  // Time-based aggregation
  const timeMap = new Map<string, number>();
  const sizeMap = new Map<string, { wins: number; losses: number }>();
  const durationMap = new Map<string, { wins: number; losses: number }>();

  // Use filteredTrades instead of trades for processing
  filteredTrades.forEach((trade) => {
    if (trade.tradeType === "CLOSE_POSITION") {
      totalTrades++;
      const pnl = trade.pnlUsd * 1e-6;
      netPnl += pnl;

      // Time data
      const hour = new Date(trade.timestamp * 1000).getHours();
      const timeKey = `${hour}:00`;
      timeMap.set(timeKey, (timeMap.get(timeKey) || 0) + pnl);

      // Trade size data
      const sizeUsd = (trade.sizeUsd * 1e-6).toFixed(0);
      const sizeRange = getSizeRange(Number(sizeUsd));
      const sizeData = sizeMap.get(sizeRange) || { wins: 0, losses: 0 };
      if (pnl > 0) sizeData.wins++;
      else sizeData.losses++;
      sizeMap.set(sizeRange, sizeData);

      // Duration data
      const duration = trade.duration || 0;
      const durationRange = getDurationRange(duration);
      const durationData = durationMap.get(durationRange) || {
        wins: 0,
        losses: 0,
      };
      if (pnl > 0) durationData.wins++;
      else durationData.losses++;
      durationMap.set(durationRange, durationData);

      // Metrics
      if (pnl > 0) winCount++;
      else lossCount++;
      totalDuration += duration;
      if (trade.side === "long") longCount++;
      else shortCount++;
      totalVolume += trade.sizeUsd * 1e-6;
    }
  });

  return {
    timeData: Array.from(timeMap.entries())
      .map(([time, value]) => ({ time, value }))
      .sort((a, b) => parseInt(a.time) - parseInt(b.time)),
    sizeData: Array.from(sizeMap.entries())
      .map(([size, data]) => ({ size, ...data }))
      .sort((a, b) => getSizeRangeValue(a.size) - getSizeRangeValue(b.size)),
    durationData: Array.from(durationMap.entries())
      .map(([duration, data]) => ({ duration, ...data }))
      .sort(
        (a, b) =>
          getDurationRangeValue(a.duration) - getDurationRangeValue(b.duration)
      ),
    metrics: {
      totalTrades,
      winCount,
      lossCount,
      winRate: totalTrades > 0 ? (winCount / totalTrades) * 100 : 0,
      avgDuration: formatDuration(
        totalTrades > 0 ? totalDuration / totalTrades : 0
      ),
      longRatio: totalTrades > 0 ? (longCount / totalTrades) * 100 : 0,
      shortRatio: totalTrades > 0 ? (shortCount / totalTrades) * 100 : 0,
      longCount,
      shortCount,
      avgTradeSize: totalTrades > 0 ? totalVolume / totalTrades : 0,
      totalVolume,
      netPnl,
    },
  };
}

function getSizeRange(sizeUsd: number): string {
  if (sizeUsd < 1000) return "< $1K";
  if (sizeUsd < 5000) return "$1K - $5K";
  if (sizeUsd < 10000) return "$5K - $10K";
  if (sizeUsd < 50000) return "$10K - $50K";
  return "> $50K";
}

function getDurationRange(duration: number): string {
  const minutes = duration / 60;
  if (minutes < 5) return "< 5m";
  if (minutes < 15) return "5m - 15m";
  if (minutes < 60) return "15m - 1h";
  if (minutes < 240) return "1h - 4h";
  return "> 4h";
}

function getSizeRangeValue(range: string): number {
  const values = {
    "< $1K": 1,
    "$1K - $5K": 2,
    "$5K - $10K": 3,
    "$10K - $50K": 4,
    "> $50K": 5,
  };
  return values[range as keyof typeof values] || 0;
}

function getDurationRangeValue(range: string): number {
  const values = {
    "< 5m": 1,
    "5m - 15m": 2,
    "15m - 1h": 3,
    "1h - 4h": 4,
    "> 4h": 5,
  };
  return values[range as keyof typeof values] || 0;
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  return `${Math.round(seconds / 3600)}h`;
}
