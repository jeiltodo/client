'use client';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { BackButton, Button, LoadingSpinner } from '@jeiltodo/ui/shared';
import { PlusBlue } from '@jeiltodo/icons';
import type { Goal } from '@jeiltodo/ui/shared';
import { RecentFilter } from '../../entities/user';
import { userOptions } from '../../entities/goal/hooks';
import { TodoList } from '../../features/todo';
import { individualGoalsOptions } from '../../entities/user/hooks/individualGoalOptions';
import { TodoModal } from '../../entities/todo/ui';
import type { todoQuery} from '../../entities/todo/hooks';
import { useRecentTodo } from '../../entities/todo/hooks';

export const TodoPage = () => {
  const { data: individualGoalsData } = useQuery(individualGoalsOptions());
  const { data: userInfo } = useQuery(userOptions());

  const filteredData: Pick<Goal, 'id' | 'title'>[] =
    individualGoalsData?.map(({ id, title }) => ({
      id,
      title,
    })) || [];

  const [todoQuery, setTodoQuery] = useState<todoQuery>({
    goalIds: individualGoalsData?.map((goal) => goal.id) || [],
    status: null,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const goalIdsString = todoQuery.goalIds.join(',');
  const { data, hasNextPage, fetchNextPage, isLoading } = useRecentTodo({
    limit: 15,
    goalIds: goalIdsString,
    isDone: todoQuery.status,
  });

  const handleClick = useCallback((query: todoQuery) => {
    setTodoQuery(query);
  }, []);
  const allTodos = data?.pages.flatMap((page) => page.data.todos) ?? [];

  const handleAddModal = () => {
    setModalOpen(true);
  };

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      hasNextPage && fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <div className='max-w-[1200px]'>
      {modalOpen && (
        <TodoModal
          todoCreator={userInfo?.nickname || ''}
          setTodoModalToggle={setModalOpen}
          goals={filteredData}
        />
      )}
      <div className='flex items-center justify-between mb-4'>
        <div className='w-full flex items-center justify-between'>
          <div className='flex'>
            <BackButton />
            <div className='text-lg font-semibold text-slate-900 pl-2 min-w-[166px]'>
              최근 등록한 할 일 ({allTodos.length})
            </div>
          </div>
          <Button
            variant='text-blue'
            className='flex gap-1 items-center text-sm min-w-[78px]'
            onClick={handleAddModal}
          >
            <PlusBlue width={16} height={16} />할 일 추가
          </Button>
        </div>
      </div>
      <div className='desktop:max-w-[1200px] w-full bg-white rounded-xl p-base flex flex-col'>
        <RecentFilter goals={filteredData} onClickFilter={handleClick} />
        <div className='mt-6 flex flex-col items-center overflow-y-scroll scrollbar-hide h-[400px] relative'>
          {isLoading ? (
            <div className='flex justify-center items-center h-full'>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <TodoList todos={allTodos} />
              <div ref={ref} className='h-6' />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
