'use client';
import { useQuery } from '@tanstack/react-query';
import { individualGoalsOptions } from '../../../entities/goal';
import { useRecentTodo } from '../../../entities/todo/hooks/useRecentTodo';
import { IndividualTodoList } from '../../../features/todo';
import { LoadingSpinner } from '@jeiltodo/ui/shared';

export const RecentTodoCard = () => {
  const { data: individualGoals } = useQuery(individualGoalsOptions());
  const goalIdsString = individualGoals?.map((goal) => goal.id).join(',') || '';

  const { data, isLoading } = useRecentTodo({
    limit: 5,
    goalIds: goalIdsString,
    isDone: null,
  });
  const allTodos = data?.pages.flatMap((page) => page.data.todos) ?? [];

  return (
    <section className='w-full h-[152px] relative'>
      {isLoading ? (
        <div className='flex justify-center items-center h-full'>
          <LoadingSpinner />
        </div>
      ) : (
        <IndividualTodoList todos={allTodos} />
      )}
    </section>
  );
};
