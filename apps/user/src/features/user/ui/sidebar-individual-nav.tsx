'use client';

import {
  SVGProps,
  ForwardRefExoticComponent,
  RefAttributes,
  useState,
} from 'react';
import { TodoModal } from '../../../entities/todo/ui/todo-modal';
import { useRouter } from 'next/navigation';
import { Goal, useIndividualGoals, userOptions } from '../../../entities/goal';
import Link from 'next/link';
import { Button } from '@jeiltodo/ui/shared';
import { Plus } from '@jeiltodo/icons';
import { useQuery } from '@tanstack/react-query';

interface SidebarIndividualNavProps {
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  individualGoals: Goal[] | undefined;
}

export const SidebarIndividualNav = ({
  icon: Icon,
  title,
  individualGoals,
}: SidebarIndividualNavProps) => {
  const [todoToggle, setTodoToggle] = useState<boolean>(false);
  const router = useRouter();
  const { data: goals } = useIndividualGoals();
  const { data: userInfo } = useQuery(userOptions());

  const fomatted = goals
    ? goals.map((goal) => ({ id: goal.id, title: goal.title }))
    : [];
  return (
    <div className='border-t-[1px] border-slate-200 py-4 flex flex-col items-center'>
      {todoToggle && (
        <TodoModal
          todoCreator={userInfo?.nickname ?? '개인'}
          setTodoModalToggle={setTodoToggle}
          goals={fomatted}
        />
      )}
      <div className='px-5 mb-4 flex items-center justify-start gap-2 w-full h-9'>
        <Link
          href='/'
          className='flex items-center gap-2 tablet:w-[240px] w-full h-9 hover:bg-slate-50 active:bg-slate-100 rounded-lg'
        >
          <Icon className='w-6 h-6' />
          <div className='block text-lg font-pretendard-medium text-slate-800'>
            {title}
          </div>
        </Link>
        <Button
          variant='text-blue'
          className='min-w-fit flex gap-1 items-center text-sm'
          onClick={() => setTodoToggle(true)}
        >
          <Plus width={16} height={16} color='#3B82F6' />
          <span>할일 추가</span>
        </Button>
      </div>
      <div className='px-5 max-h-36 overflow-y-scroll scrollbar-thin w-full'>
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
    </div>
  );
};
