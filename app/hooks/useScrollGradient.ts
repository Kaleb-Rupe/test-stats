import { useEffect, useState, useCallback, RefObject } from "react";
import { useWindowSize } from "./useWindowSize";

interface ScrollGradientOptions {
  threshold?: number;
}

export function useScrollGradient(
  containerRef: RefObject<HTMLElement>,
  options: ScrollGradientOptions = {}
) {
  const { threshold = 20 } = options;
  const [showStartGradient, setShowStartGradient] = useState(false);
  const [showEndGradient, setShowEndGradient] = useState(false);
  const windowSize = useWindowSize();

  const checkScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setShowStartGradient(scrollLeft > threshold);
    setShowEndGradient(scrollWidth - (scrollLeft + clientWidth) > threshold);
  }, [containerRef, threshold]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    // Initial check
    checkScroll();

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [containerRef, checkScroll, windowSize]);

  return {
    showStartGradient,
    showEndGradient,
    checkScroll,
  };
}
