'use client'
import { useState, useEffect } from 'react';

export const useResponsive = (): boolean => {
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.matchMedia('(max-width: 1024px)').matches);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isTablet;
};
