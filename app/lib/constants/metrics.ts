export const METRICS = {
  TRADE_SIZE_RANGES: {
    SMALL: {
      label: "< $1K",
      value: 1000,
    },
    MEDIUM: {
      label: "$1K - $10K",
      value: 10000,
    },
    LARGE: {
      label: "> $10K",
      value: Infinity,
    },
  },

  DURATION_RANGES: {
    SHORT: {
      label: "< 5m",
      value: 5 * 60, // 5 minutes in seconds
    },
    MEDIUM: {
      label: "5m - 1h",
      value: 60 * 60, // 1 hour in seconds
    },
    LONG: {
      label: "> 1h",
      value: Infinity,
    },
  },

  WIN_LOSS_THRESHOLDS: {
    EXCELLENT: 70,
    GOOD: 55,
    AVERAGE: 45,
    POOR: 30,
  },

  LEVERAGE_RANGES: {
    LOW: {
      label: "1x - 3x",
      max: 3,
    },
    MEDIUM: {
      label: "3x - 10x",
      max: 10,
    },
    HIGH: {
      label: "> 10x",
      max: Infinity,
    },
  },
} as const;

export const CHART_BREAKPOINTS = {
  TIME_FRAMES: {
    HOUR: 60 * 60,
    DAY: 24 * 60 * 60,
    WEEK: 7 * 24 * 60 * 60,
    MONTH: 30 * 24 * 60 * 60,
  },
} as const;
