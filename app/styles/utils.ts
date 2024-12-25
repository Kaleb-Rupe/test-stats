import { theme } from "./theme";

// Use theme values to ensure consistency with our theme system
export const styles = {
  // Layout
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",

  layout: {
    root: "flex min-h-screen bg-[#0A0B0F]",
    main: "flex-1 ml-64 p-8",
  },

  // Card styles
  card: {
    base: `bg-[${theme.colors.background.secondary}] rounded-lg border border-[${theme.colors.border.primary}] transition-all duration-${theme.animation.normal}`,
    hover: "hover:shadow-lg hover:border-[#1E2B45]",
    content: "p-6",
  },

  // Text styles
  text: {
    heading: "text-white font-bold tracking-tight",
    subheading: `text-[${theme.colors.text.secondary}] font-medium`,
    body: `text-[${theme.colors.text.muted}]`,
    success: `text-[${theme.colors.state.success.text}]`,
    error: `text-[${theme.colors.state.error.text}]`,
  },

  // Button styles
  button: {
    base: "rounded-lg font-medium transition-all duration-300",
    primary: "bg-[#00E6E6] hover:bg-[#00FFFF] text-black",
    secondary: "bg-[#1E2B45] hover:bg-[#2D3748] text-white",
    sizes: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3",
    },
  },

  // Chart styles
  chart: {
    container: "bg-[#131A2B] rounded-lg p-4",
    tooltip: "bg-[#1A2337] border border-[#2D3748] rounded-md shadow-lg p-2",
  },

  // Grid layouts
  grid: {
    dashboard: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    analytics: "grid grid-cols-1 lg:grid-cols-2 gap-6",
  },

  // Navigation
  nav: {
    item: "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200",
    active: "bg-[#1E2B45] text-white",
    inactive: "text-[#718096] hover:bg-[#1A2337] hover:text-white",
  },

  // Animations
  animation: {
    fadeIn: "animate-fadeIn",
    slideIn: "animate-slideIn",
    popup: "animate-popup",
  },

  // Scrollbar (for desktop only)
  scrollbar: {
    hide: "scrollbar-hide",
    custom:
      "scrollbar-thin scrollbar-thumb-[#2D3748] scrollbar-track-transparent",
  },

  walletInput: {
    container: "w-full max-w-2xl mx-auto space-y-6 px-4",
    title: `text-center tracking-tighter font-bold text-4xl md:text-[4.5rem]`,
    inputWrapper: "w-full relative",
    input: (isValid: boolean | null) => `
      w-full px-4 py-3 rounded-xl transition-colors focus:ring-0
      ${
        isValid === true
          ? "border-2 border-green-500 focus:border-green-600"
          : isValid === false
          ? "border-2 border-red-500 focus:border-red-600"
          : "border-2 border-zinc-800 focus:border-zinc-700"
      }
      bg-zinc-900 text-white placeholder-zinc-500 focus:outline-none
      text-sm md:text-base
      text-ellipsis overflow-hidden whitespace-nowrap
    `,
    button: (isValid: boolean) => `
      w-full md:w-auto md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 
      py-3 md:py-2 px-4 rounded-xl
      font-medium transition-all
      disabled:opacity-30 disabled:cursor-not-allowed
      flex items-center justify-center gap-2
      ${isValid ? "text-black" : "bg-zinc-800 text-zinc-500"}
    `,
    clearButton: `
      w-full md:w-auto md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 
      py-3 md:py-2 px-4 rounded-xl
      font-medium transition-all
      bg-red-500 hover:bg-red-600 text-white
      flex items-center justify-center gap-2
    `,
    loadingSpinner:
      "w-4 h-4 border-2 border-current border-t-transparent rounded-xl animate-spin",
    buttonContainer: "mt-3 md:mt-0",
  },

  // Mobile specific
  mobile: {
    gradientFade: {
      left: "bg-gradient-to-r from-[#0A0B0F] to-transparent",
      right: "bg-gradient-to-l from-[#0A0B0F] to-transparent",
    },
    menu: "fixed inset-y-0 right-0 w-64 bg-[#131A2B] shadow-xl transform transition-transform duration-300",
  },
};

// Utility function to combine Tailwind classes
export const cx = (...classes: string[]) => classes.filter(Boolean).join(" ");
