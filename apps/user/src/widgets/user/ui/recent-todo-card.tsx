'use client'
import { useQuery } from '@tanstack/react-query';
import { individualGoalsOptions } from '../../../entities/goal';
import { useRecentTodo } from '../../../entities/todo/hooks/useRecentTodo';
import { TodoList } from '../../../features/todo';

export const RecentTodoCard = () => {
  const { data: individualGoals } = useQuery(individualGoalsOptions());
  const goalIdsString = individualGoals?.map((goal) => goal.id).join(',') || '';

  const { data } = useRecentTodo({
    limit: 5,
    goalIds: goalIdsString,
    isDone: null,
  });
  const allTodos = data?.pages.flatMap((page) => page.data.todos) ?? [];

  return (
    <section className='h-[152px]'>
      <TodoList todos={allTodos} />
    </section>
  );
};
