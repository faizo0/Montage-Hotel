import { useEffect, useState } from 'react';

export const BREAKPOINTS = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1440px)',
};

export function useMediaQuery(query) {
  const resolvedQuery = BREAKPOINTS[query] || query;

  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(resolvedQuery).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mediaQueryList = window.matchMedia(resolvedQuery);
    const handleChange = (event) => setMatches(event.matches);

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', handleChange);

    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [resolvedQuery]);

  return matches;
}

export default useMediaQuery;
