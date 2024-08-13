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
  memberId: number;
  updatedAt: string;
  createdAt: string;
}

interface SidebarIndividualNavProps {
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  individualGoals: IndividualGoalsProps[] | undefined;
}

export const SidebarIndividualNav = ({
  icon: Icon,
  title,
  individualGoals,
}: SidebarIndividualNavProps) => {
  const [todoToggle, setTodoToggle] = useState<boolean>(false);
  return (
    <div className='border-t-[1px] border-slate-200 py-4 flex flex-col items-center'>
      {todoToggle && (
        <TodoModal taskOwner='체다치즈' setTodoToggle={setTodoToggle} />
      )}
      <div className='mb-4 flex items-center justify-between gap-2 w-[240px] h-9 hover:bg-slate-50 active:bg-slate-100 rounded-lg'>
        <div className='flex items-center gap-2'>
          <Icon className='w-6 h-6' />
          <div className='block text-lg font-pretendard-medium text-slate-800'>
            {title}
          </div>
        </div>
      </div>
      {individualGoals?.map((goal) => (
        <div
          key={goal.id}
          className='flex items-center text-sm font-pretendard-medium text-slate-700 w-[240px] h-9 max-h-36 overflow-y-scroll scrollbar-hide hover:bg-slate-50 active:bg-slate-100 rounded-lg'
        >
          · {goal.title}
        </div>
      ))}
    </div>
  );
};
