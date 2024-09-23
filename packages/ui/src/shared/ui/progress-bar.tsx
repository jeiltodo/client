'use client';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar = ({ progress, className }: ProgressBarProps) => {
  return (
    <div className='flex items-center justify-start gap-2'>
      <div
        className={`flex items-center w-full h-1 bg-slate-100 rounded-md ${className}`}
      >
        <div
          className='h-full bg-slate-900 rounded-md transition-all duration-500 ease-in-out'
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className='block text-xs font-semibold text-slate-900 '>{progress}%</p>
    </div>
  );
};
