'use client';
import { useEffect } from 'react';
import { useRecentTodo } from '../../../entities/todo/hooks/useRecentTodo';
import { useInView } from 'react-intersection-observer';
import { TodoList } from '../../../features/todo';

const todos = [
  {
    id: 1,
    title: '저거저거할일',
    is_done: true,
    created_at: "yyyy-MM-dd'T'HH:mm:ss",
    updated_at: "yyyy-MM-dd'T'HH:mm:ss",
    note_id: 1,
    goal: {
      id: 1,
      title: '저거하기',
    },
  },
  {
    id: 12,
    title: '뭐뭐의할일',
    is_done: false,
    created_at: "yyyy-MM-dd'T'HH:mm:ss",
    updated_at: "yyyy-MM-dd'T'HH:mm:ss",
    note_id: 12,
    goal: {
      id: 12,
      title: '뭐뭐하기',
    },
  },
];

export const RecentTodoCard = () => {
  const { data, hasNextPage, fetchNextPage } = useRecentTodo({
    limit: 6,
    goal_ids: [], // 필요한 경우 goal_ids 추가
    is_done: null, // 필요한 경우 상태값 추가
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      hasNextPage && fetchNextPage();
    }
  }, [inView]);
  console.log(data?.pages[0].data.todos);
  return <section>
    <TodoList todos={data?.pages[0].data.todos} />
  </section>;
};
