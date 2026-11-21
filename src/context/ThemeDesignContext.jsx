import React, { createContext, useContext, useMemo, useState } from 'react';

const LIGHT_LUXURY_TOKENS = {
  ivory: '#F8F3EA',
  cream: '#F2EAE2',
  champagne: '#E3D5CE',
  burgundy: '#702D43',
  burgundyHover: '#572133',
  roseBeige: '#E9DDE0',
  gold: '#C6A46A',
  charcoal: '#29232A',
  muted: '#877B80',
  white: '#FFFFFF',
};

const ThemeDesignContext = createContext(null);

export function ThemeDesignProvider({ children }) {
  const [smoothScrollEnabled, setSmoothScrollEnabled] = useState(true);

  const value = useMemo(
    () => ({
      mode: 'light-luxury',
      tokens: LIGHT_LUXURY_TOKENS,
      smoothScrollEnabled,
      setSmoothScrollEnabled,
    }),
    [smoothScrollEnabled]
  );

  return (
    <ThemeDesignContext.Provider value={value}>
      {children}
    </ThemeDesignContext.Provider>
  );
}

export function useThemeDesign() {
  const ctx = useContext(ThemeDesignContext);
  if (!ctx) {
    throw new Error('useThemeDesign must be used within a ThemeDesignProvider');
  }
  return ctx;
}
