import { theme } from "@/styles/theme";

export const CHART_CONFIG = {
  COLORS: {
    PROFIT: theme.colors.state.success.primary,
    LOSS: theme.colors.state.error.primary,
    PRIMARY: theme.colors.primary.DEFAULT,
    SECONDARY: theme.colors.background.secondary,
    GRID: theme.colors.background.tertiary,
  },

  CHART_STYLES: {
    BAR: {
      DEFAULT: {
        cornerRadius: 4,
        maxBarSize: 40,
      },
    },
    LINE: {
      DEFAULT: {
        strokeWidth: 2,
        dot: false,
      },
      WITH_DOTS: {
        strokeWidth: 2,
        dot: true,
        activeDot: { r: 6 },
      },
    },
  },

  TOOLTIPS: {
    DEFAULT: {
      contentStyle: {
        backgroundColor: theme.colors.background.secondary,
        border: `1px solid ${theme.colors.border.primary}`,
        borderRadius: theme.borderRadius.md,
        padding: "8px 12px",
      },
    },
  },

  RESPONSIVE_RULES: {
    DEFAULT: [
      {
        breakpoint: 1024,
        options: {
          legend: { position: "bottom" as const },
          chart: { height: 300 },
        },
      },
      {
        breakpoint: 768,
        options: {
          legend: { position: "bottom" as const },
          chart: { height: 250 },
        },
      },
    ],
  },

  ANIMATIONS: {
    DEFAULT: {
      initial: { duration: 800 },
      hover: { duration: 100 },
    },
  },
} as const;

export const CHART_LAYOUTS = {
  BASIC: {
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    height: 400,
  },
  COMPACT: {
    margin: { top: 10, right: 10, bottom: 10, left: 10 },
    height: 200,
  },
  DETAILED: {
    margin: { top: 30, right: 30, bottom: 30, left: 30 },
    height: 500,
  },
} as const;
