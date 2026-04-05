import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/constants';

export function useBreakpoint() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    windowWidth,
    isMobile: windowWidth < BREAKPOINTS.md,
    isTablet: windowWidth >= BREAKPOINTS.md && windowWidth < BREAKPOINTS.lg,
    isDesktop: windowWidth >= BREAKPOINTS.lg,
    breakpoint:
      windowWidth < BREAKPOINTS.md
        ? 'mobile'
        : windowWidth < BREAKPOINTS.lg
        ? 'tablet'
        : windowWidth < BREAKPOINTS.xl
        ? 'desktop'
        : 'large',
  };
}
