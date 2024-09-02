'use client'
import React, { useEffect, useState } from 'react';

interface PercentDisplayProps {
  value: number;
}

export const PercentDisplay: React.FC<PercentDisplayProps> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [change, setChange] = useState<string | null>(null);

  useEffect(() => {
    if (!change) return;
    const timer = setTimeout(() => {
      setChange(null);

      return () => {
        clearTimeout(timer);
      };
    }, 2000);
  }, [change]);

  useEffect(() => {
    if (value === displayValue) {
      return;
    }

    const diff = value - displayValue;
    const newChange = diff > 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`;

    setChange(newChange);
    setDisplayValue(value);

  }, [value]);



  return (
    <div className='relative inline-flex items-center flex-col z-20'>
      <div className='text-3xl font-pretendard-semibold not-italic flex items-center justify-start gap-1'>
        <h1>{displayValue.toFixed(1)}</h1>
        <h3 className='text-base font-semibold'>&#37;</h3>
      </div>
      {change !== null && (
      <span
        className={`ml-2 text-base font-medium animate-fade-in-out
            ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}
      >
        {change}
      </span>
      )}
    </div>
  );
};
