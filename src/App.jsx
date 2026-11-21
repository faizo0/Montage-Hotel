import React from 'react';
import { MotionConfig } from 'framer-motion';
import { ThemeDesignProvider } from '@/context/ThemeDesignContext';
import { HotelProvider } from '@/context/HotelContext';
import { AppRouter } from '@/routes/AppRouter';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeDesignProvider>
        <HotelProvider>
          <AppRouter />
        </HotelProvider>
      </ThemeDesignProvider>
    </MotionConfig>
  );
}

export default App;
