'use client';
import { useCallback, useEffect, useState } from 'react';
import { RecentFilter } from '../../entities/user';
import { TodoModal, todoQuery, useRecentTodo } from '../../entities/todo';
import { useInView } from 'react-intersection-observer';
import { Goal, individualGoalsOptions } from '../../entities/goal';
import { useQuery } from '@tanstack/react-query';
import { TodoList } from '../../features/todo';
import { Button } from '@jeiltodo/ui/shared';
import { PlusBlue } from '@jeiltodo/icons';

export const TodoPage = () => {
  const { data: individualGoalsData } = useQuery(individualGoalsOptions());

  const filteredData: Pick<Goal, 'id' | 'title'>[] =
    individualGoalsData?.data.individualGoals.map(({ id, title }) => ({
      id,
      title,
    })) || [];
  const [query, setQuery] = useState<todoQuery>({
    goalIds:
      individualGoalsData?.data.individualGoals.map((goal) => goal.id) || [],
    status: null,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const goalIdsString = query.goalIds.join(',');
  const { data, hasNextPage, fetchNextPage } = useRecentTodo({
    limit: 10,
    goalIds: goalIdsString,
    isDone: query.status,
  });

  const handleClick = useCallback((query: todoQuery) => {
    setQuery(query);
  }, []);
  const allTodos = data?.pages.flatMap((page) => page.data.todos) ?? [];

  const handleAddModal = () => {
    setModalOpen(true);
  };

  const { ref, inView } = useInView();
  console.log(inView);
  useEffect(() => {
    if (inView) {
      if (hasNextPage) {
        console.log('hasNextPage: ', hasNextPage);
        fetchNextPage();
      }
    }
  }, [inView]);

  return (
    <div>
      {modalOpen && <TodoModal setTodoToggle={setModalOpen} />}
      <div className='flex items-center justify-between mb-6 '>
        <div className='text-lg font-semibold text-slate-900 min-w-[280px]'>
          최근 등록한 할일 ({allTodos?.length})
        </div>
        <Button
          variant='text-blue'
          className='flex gap-1 items-center text-sm'
          onClick={handleAddModal}
        >
          <PlusBlue width={16} height={16} />
          할일 추가
        </Button>
      </div>
      <div className='desktop:max-w-[1200px] w-full min-h-[40vh]  bg-white rounded-xl p-base flex flex-col'>
        <RecentFilter goals={filteredData} onClickFilter={handleClick} />
        <div className='mt-6 flex flex-wrap overflow-y-scroll h-[200px] bg-gray-500'>
          <TodoList todos={allTodos} variant='user' />
          <div ref={ref} className='h-12 w-full bg-red-700' />
        </div>
      </div>
    </div>
  );
};
