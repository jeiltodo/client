'use client';

import { DoughnutGraph } from '@jeiltodo/icons';
import { DonutChart, PercentDisplay } from '../../../entities/user';

interface ProgressBoardProps {
  completedPercent: number;
}

export const ProgressBoard: React.FC<ProgressBoardProps> = ({
  completedPercent,
}) => {
  return (
    <section className='relative h-[250px] flex flex-row min-w-[280px] bg-blue-500 w-full desktop:max-w-[588px] rounded-[12px] p-base overflow-hidden'>
      <div className='flex flex-col gap-y-1 text-white text-lg'>
        <span className='w-[40px] h-[40px] flex items-center justify-center bg-slate-900 rounded-[15px] mb-3'>
          <DoughnutGraph className='w-[17px]' />
        </span>
        <h2>내 진행 상황</h2>
        <span>
          <PercentDisplay value={completedPercent} />
        </span>
      </div>
      <DonutChart percent={completedPercent} />
      <DoughnutGraph className='absolute z-10 -right-10 -bottom-20 w-[224px] opacity-10  rotate-45 ' />
    </section>
  );
};
