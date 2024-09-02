'use client';

import { Button, ProgressBar } from '@jeiltodo/ui/shared';
import { ArrowRight, Plus } from '@jeiltodo/icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { TodoList } from '../../../features/todo';
import {
  useIndividualGoals,
  userOptions,
} from '../../../entities/goal';
import type {
  GoalWithTodos} from '../../../entities/goal';
import { TodoModal } from '../../../entities/todo';

export const UserGoalCard = (goal: GoalWithTodos) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const { data: user } = useQuery(userOptions());

  const { data: goals } = useIndividualGoals();
  const formatted =
    goals?.map((item) => ({ id: item.id, title: item.title })) ?? [];

  const done = goal.todos
    .filter((todo) => todo.isDone)
    .map((todo) => ({
      ...todo,
      goal,
    }));
  const notDone = goal.todos
    .filter((todo) => !todo.isDone)
    .map((todo) => ({
      ...todo,
      goal,
    }));

  const handleAddModal = () => {
    setModalOpen(true);
  };

  const handleMore = () => {
    router.push(`/goal/${goal.id}`);
  };

  return (
    <div className='w-full p-4 tablet:p-6 desktop:p-6 rounded-3xl bg-blue-50  '>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-bold text-slate-800'>{goal.title}</p>
        <Button
          variant='text-blue'
          className='flex gap-1 items-center text-sm'
          onClick={handleAddModal}
        >
          <Plus width={16} height={16} />할 일 추가
        </Button>
      </div>

      <div className='w-full rounded-3xl py-[2px] px-2 bg-white mt-2 '>
        <ProgressBar progress={goal.progress} />
      </div>
      <div className='w-full flex flex-wrap gap-6 desktop:!flex-nowrap mt-4 mb-5 pt-4'>
        {notDone.length !== 0 && (
          <div className='w-full'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>To do</p>
            <TodoList todos={notDone} />
          </div>
        )}
        {done.length !== 0 && (
          <div className='w-full '>
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
          todoCreator={user?.nickname ?? '개인'}
          setTodoModalToggle={setModalOpen}
          initialGoal={goal}
          goals={formatted}
        />
      )}
    </div>
  );
};
