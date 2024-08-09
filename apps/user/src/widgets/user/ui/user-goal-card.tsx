'use client';

import { Button, ProgressBar } from '@jeiltodo/ui/shared';
import { Goal } from '../../../entities/goal';
import { Todo, TodoModal } from '../../../entities/todo';
import { TodoList } from '../../../features/todo';
import { ArrowRight, Plus } from '@jeiltodo/icons';
import { useState } from 'react';

const Todos: Todo[] = [
  {
    id: 1,
    done: false,
    title: '자바스크립트 비동기 처리',
  },
  {
    id: 2,
    done: true,
    title: '타입스크립트 처리',
  },
];

export const UserGoalCard = (goal: Goal) => {
  const [modalOpen, setModalOpen] = useState(false);

  const done = goal.todos
    .filter((todo) => todo.done === true)
    .map((todo) => ({
      ...todo,
      goal: { id: goal.id, title: goal.title },
    }));
  const notDone = goal.todos
    .filter((todo) => todo.done === false)
    .map((todo) => ({
      ...todo,
      goal: { id: goal.id, title: goal.title },
    }));

  const handleAdd = () => {
    setModalOpen(true);
  };

  const handleMore = () => {};
  return (
    <div className='min-w-[280px] w-full p-6 rounded-3xl bg-blue-50 tablet:min-w-[560px] '>
      <div className='flex justify-between'>
        <p className='text-lg font-bold text-slate-800'>{goal.title}</p>
        <Button
          variant='text-blue'
          className='flex gap-1 items-center text-sm'
          onClick={handleAdd}
        >
          <Plus width={16} height={16} />
          할일 추가
        </Button>
      </div>

      <div className='w-full rounded-3xl py-[2px] px-2 bg-white mt-2'>
        <ProgressBar progress={64} />
      </div>
      <div className='w-full tablet:grid tablet:grid-cols-2 tablet:divide-x tablet:divide-gray-200 mt-4 mb-5'>
        {notDone.length !== 0 && (
          <div className='w-full tablet:pr-6'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>To do</p>
            <TodoList todos={notDone} />
          </div>
        )}
        {done.length !== 0 && (
          <div className='w-full mt-6 tablet:pl-6 tablet:mt-0'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>Done</p>
            <TodoList todos={done} />
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
      {modalOpen && (
        <TodoModal
          taskOwner='User'
          setTodoToggle={setModalOpen}
          initialGoal={goal}
        />
      )}
    </div>
  );
};