'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Individual } from '@jeiltodo/icons';
import type { Goal } from '../../../entities/goal';

interface SidebarIndividualNavProps {
  title: string;
  individualGoals: Goal[] | undefined;
}

export const SidebarIndividualNav = ({
  title,
  individualGoals,
}: SidebarIndividualNavProps) => {
  const router = useRouter();

  return (
    <div className='border-t-[1px] border-slate-200 py-4 flex flex-col items-center'>
      <div className='px-5 mb-4 flex items-center justify-start gap-2 w-full h-9'>
        <Link
          href='/'
          className='flex items-center gap-2 tablet:w-[240px] w-full h-9 hover:bg-slate-50 active:bg-slate-100 rounded-lg'
        >
          <Individual className='w-6 h-6' />
          <div className='block text-lg font-pretendard-medium text-slate-800'>
            {title}
          </div>
        </Link>
      </div>
      {individualGoals?.length !== 0 ? (
        <div className='px-5 max-h-[126px] overflow-y-scroll scrollbar-hide w-full'>
          {individualGoals?.map((goal) => (
            <div
              key={goal.id}
              onClick={() => router.push(`/goal/${goal.id}`)}
              className='flex items-center text-sm font-pretendard-medium text-slate-700 tablet:w-[240px] w-full h-9 hover:bg-slate-50 active:bg-slate-100 rounded-lg cursor-pointer'
            >
              {goal.title}
            </div>
          ))}
        </div>
      ) : (
        <div className='px-5 flex items-center text-sm font-pretendard-medium text-gray-500 tablet:w-[240px] w-full h-9'>
          Tip. 여러 개의 할 일을 한 목표에서 관리해 보세요
        </div>
      )}
    </div>
  );
};
