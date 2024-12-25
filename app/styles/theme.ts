// Theme configuration for the application
export const theme = {
  colors: {
    // Brand Colors
    primary: {
      DEFAULT: "#00E6E6", // Cyan/aqua color for primary elements
      hover: "#00FFFF",
      muted: "#00B3B3",
    },
    // Background Colors
    background: {
      primary: "#0A0B0F", // Main background
      secondary: "#131A2B", // Card/section background
      tertiary: "#1E2B45", // Elevated elements
      hover: "#1A2337",
    },
    // Text Colors
    text: {
      primary: "#FFFFFF",
      secondary: "#A0AEC0",
      muted: "#718096",
    },
    // State Colors
    state: {
      success: {
        primary: "#00E6A6", // Green for positive values
        background: "#063D2C",
        text: "#00FF9D",
      },
      error: {
        primary: "#FF5E6B", // Red/coral for negative values
        background: "#3D0F14",
        text: "#FF4D58",
      },
      warning: "#FFB547",
      info: "#47B5FF",
    },
    // Chart Colors
    chart: {
      positive: "#00E6E6", // Cyan for positive bars/lines
      negative: "#FF5E6B", // Coral for negative bars/lines
      grid: "#1E2B45", // Chart grid lines
      tooltip: {
        background: "#1A2337",
        border: "#2D3748",
      },
    },
    // Border Colors
    border: {
      primary: "#2D3748",
      secondary: "#1E2B45",
    },
    // Card Colors
    card: {
      background: "#131A2B",
      hover: "#1A2337",
      border: "#2D3748",
      shadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
  },
  // Animation Durations
  animation: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },
  // Border Radius
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "1rem",
    full: "9999px",
  },
  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  // Spacing/Layout
  spacing: {
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
  },
} as const;

// Utility type for theme colors
export type ThemeColors = typeof theme.colors;

// Custom CSS Properties
export const cssVariables = {
  // Generate CSS variables from theme
  toCssVariables(): string {
    return `
      :root {
        --color-primary: ${theme.colors.primary.DEFAULT};
        --color-primary-hover: ${theme.colors.primary.hover};
        --color-primary-muted: ${theme.colors.primary.muted};
        
        --color-bg-primary: ${theme.colors.background.primary};
        --color-bg-secondary: ${theme.colors.background.secondary};
        --color-bg-tertiary: ${theme.colors.background.tertiary};
        
        --color-text-primary: ${theme.colors.text.primary};
        --color-text-secondary: ${theme.colors.text.secondary};
        --color-text-muted: ${theme.colors.text.muted};
        
        --color-success: ${theme.colors.state.success.primary};
        --color-error: ${theme.colors.state.error.primary};
        --color-warning: ${theme.colors.state.warning};
        --color-info: ${theme.colors.state.info};
        
        --border-radius-sm: ${theme.borderRadius.sm};
        --border-radius-md: ${theme.borderRadius.md};
        --border-radius-lg: ${theme.borderRadius.lg};
        
        --animation-fast: ${theme.animation.fast};
        --animation-normal: ${theme.animation.normal};
        --animation-slow: ${theme.animation.slow};
      }
    `;
  },
};

export default theme;
