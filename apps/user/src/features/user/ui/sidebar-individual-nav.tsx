'use client';
import { Plus } from '@jeiltodo/icons';
import { Button } from '@jeiltodo/ui/shared';
import {
  SVGProps,
  ForwardRefExoticComponent,
  RefAttributes,
  useState,
} from 'react';
import { TodoModal } from '../../../entities/todo/ui/todo-modal';

interface IndividualGoalsProps {
  id: number;
  title: string;
  userId: number;
  updatedAt: string;
  createdAt: string;
}

interface SidebarIndividualNavProps {
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  individualGoals: IndividualGoalsProps[];
}

export const SidebarIndividualNav = ({
  icon: Icon,
  title,
  individualGoals,
}: SidebarIndividualNavProps) => {
  const [todoToggle, setTodoToggle] = useState<boolean>(false);
  return (
    <div>
      {todoToggle && (
        <TodoModal taskOwner='체다치즈' setTodoToggle={setTodoToggle} />
      )}
      <div className='px-6 py-[18px] flex items-center justify-between gap-2 border-t-[1px] border-slate-200'>
        <div className='flex items-center gap-2'>
          <Icon className='w-6 h-6' />
          <div className='block text-lg font-pretendard-medium text-slate-800'>
            {title}
          </div>
        </div>
        <button
          className='flex items-center gap-1'
          onClick={() => setTodoToggle(true)}
        >
          <Plus className='w-4 h-4' />
          <div className='text-blue-500 text-sm font-pretendard-semibold'>
            할 일 추가
          </div>
        </button>
      </div>
      {individualGoals.map((goal) => (
        <div
          key={goal.id}
          className='block pl-8 py-2 text-sm font-pretendard-medium text-slate-700'
        >
          · {goal.title}
        </div>
      ))}
    </div>
  );
};
