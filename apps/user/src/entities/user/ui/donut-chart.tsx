import React, { useEffect, useState } from 'react';

interface DonutChartProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  percent,
  size = 166,
  strokeWidth = 32,
}) => {
  const [progress, setProgress] = useState(percent);
  const [initialRender, setInitialRender] = useState(true);
  const [previousPercent, setPreviousPercent] = useState(percent);
  const [changeColor, setChangeColor] = useState('text-gray-900');
  const [showChange, setShowChange] = useState(false);
  const [isIncreasing, setIsIncreasing] = useState(true);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      setProgress(percent);
      return;
    }

    setShowChange(true);
    setProgress(percent);

    const increasing = percent > previousPercent;
    setIsIncreasing(increasing);
    const color = increasing ? 'text-green-500' : 'text-red-500';
    setChangeColor(color);

    const timer = setTimeout(() => {
      setPreviousPercent(percent);
      setShowChange(false);
      setChangeColor('text-gray-900');
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [percent]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const currentStrokeDashoffset =
    circumference - (progress / 100) * circumference;
  const previousStrokeDashoffset =
    circumference - (previousPercent / 100) * circumference;

  return (
    <div className='absolute top-1/2 -translate-y-1/2 desktop:right-[92px] mobile:right-[24px] z-20'>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 배경 원 */}
        <circle
          className='text-gray-200'
          strokeWidth={strokeWidth}
          stroke='currentColor'
          fill='transparent'
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* 변화 원 */}
        <circle
          className={`transition-all duration-[2s] ease-in-out origin-center -rotate-90 -scale-y-100 ${changeColor}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={isIncreasing ? currentStrokeDashoffset : previousStrokeDashoffset}
          stroke='currentColor'
          fill='transparent'
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            opacity: showChange ? 1 : 0,
          }}
        />
        {/* 메인 원 */}
        <circle
          className='transition-all duration-[2s] ease-in-out origin-center -rotate-90 -scale-y-100 text-gray-900'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={isIncreasing ? previousStrokeDashoffset : currentStrokeDashoffset}
          stroke='currentColor'
          fill='transparent'
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
    </div>
  );
};