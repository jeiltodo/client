'use client';

import { Button } from '@jeiltodo/ui/shared';
import { GoalIdAndTitle, GroupGoalWithTodos } from '../../../entities/goal';
import { ArrowRight, Plus } from '@jeiltodo/icons';
import { useState } from 'react';
import { GroupProgressBar } from '../../../entities/group/ui/group-progress-bar';
import { GroupTodoList } from '../../../features/todo/ui/group-todo-list';
import { formatGroupTodos } from '../model/formatGroupTodos';
import { useParams } from 'next/navigation';
import { useGroupGoals } from '../../../entities/group/hooks/useGroupGoals';

export const GroupGoalCard = (goal: GroupGoalWithTodos) => {
  const params: { id: string } = useParams();
  const groupId = Number(params.id);
  const [isOpenAddTodoModal, setIsOpenAddTodoModal] = useState(false);

  const { data: groupGoals } = useGroupGoals(groupId);
  const goalIdAndTitles = groupGoals?.map((goal) => ({
    id: goal.id,
    title: goal.title,
  })) as GoalIdAndTitle[];

  const done = formatGroupTodos(goal, true);
  const notDone = formatGroupTodos(goal, false);
  console.log(goalIdAndTitles)
  const handleAddTodo = () => {
    setIsOpenAddTodoModal(true);
  };

  const handleMore = () => {};

  return (
    <div className='min-w-[280px] w-full p-6 rounded-3xl bg-blue-50 tablet:min-w-[560px] '>
      <div className='flex justify-between'>
        <p className='text-lg font-bold text-slate-800'>{goal.title}</p>
        <Button
          variant='text-blue'
          className='flex gap-1 items-center text-sm'
          onClick={handleAddTodo}
        >
          <Plus width={16} height={16} />
          할일 추가
        </Button>
      </div>
      <div className='w-full rounded-3xl py-[2px] px-2 bg-white mt-2'>
        <GroupProgressBar progress={goal.progress} />
      </div>
      <div className='w-full tablet:grid tablet:grid-cols-2 tablet:divide-x tablet:divide-gray-200 mt-4 mb-5'>
        {notDone.length !== 0 && (
          <div className='w-full tablet:pr-6'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>To do</p>
            <GroupTodoList todos={notDone} />
          </div>
        )}
        {done.length !== 0 && (
          <div className='w-full mt-6 tablet:pl-6 tablet:mt-0'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>Done</p>
            <GroupTodoList todos={done} />
          </div>
        )}
      </div>
      <div className='w-full flex justify-center'>
        <Button
          variant='rounded-white'
          className='min-w-[120px] min-h-8 flex'
          onClick={handleMore}
        >
          <span className='pl-4 text-sm font-semibold text-slate-700'>
            더보기
          </span>
          <ArrowRight width={24} height={24} />
        </Button>
      </div>
      {isOpenAddTodoModal && (
        <>모달에러</>
        // <TodoModal
        //   goals={goalIdAndTitles}
        //   setTodoToggle={setIsOpenAddTodoModal}
        //   initialGoal={goal}
        // />
      )}
    </div>
  );
};
