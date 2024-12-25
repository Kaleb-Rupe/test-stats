import { useState } from "react";
import { MARKETS } from "@/app/lib/utils/markets";

export function FilterControls() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("All Symbols");

  const symbols = [
    "All Symbols",
    ...Object.values(MARKETS)
      .filter((market) => !market.name.includes("-SHORT"))
      .map((market) => market.name),
  ];

  return (
    <div className="flex gap-4 items-center">
      <select
        value={selectedSymbol}
        onChange={(e) => setSelectedSymbol(e.target.value)}
        className="bg-[#131A2B] border border-[#2D3748] text-white rounded-lg px-3 py-2"
      >
        {symbols.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>
    </div>
  );
}
