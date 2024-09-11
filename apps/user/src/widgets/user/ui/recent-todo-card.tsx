'use client';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '@jeiltodo/ui/shared';
import { individualGoalsOptions } from '../../../entities/goal/hooks';
import { useRecentTodo } from '../../../entities/todo/hooks/useRecentTodo';
import { TodoList } from '../../../features/todo';

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
        <TodoList todos={allTodos} />
      )}
    </section>
  );
};
