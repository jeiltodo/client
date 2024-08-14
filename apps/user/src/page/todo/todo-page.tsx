'use client'
import { useCallback, useEffect, useState } from 'react';
import { RecentFilter } from '../../entities/user';
import { todoQuery, useRecentTodo } from '../../entities/todo';
import { useInView } from 'react-intersection-observer';
import { Goal, individualGoalsOptions } from '../../entities/goal';
import { useQuery } from '@tanstack/react-query';

export const TodoPage = () => {
  const { data: individualGoalsData } = useQuery(individualGoalsOptions());

  const filteredData: Pick<Goal, 'id' | 'title'>[] = (
    individualGoalsData?.data.individualGoals.map(({ id, title }) => ({ id, title })) || []
  );
  const [query, setQuery] = useState<todoQuery>({
    goalIds: individualGoalsData?.data.individualGoals.map((goal) => goal.id) || [],
    status: null,
  });

  // const { data, hasNextPage, fetchNextPage } = useRecentTodo({
  //   limit: 6,
  //   goal_ids: query.goalIds,
  //   is_done: query.status,  
  // });
  
  const handleClick = useCallback((query: todoQuery) => {
    setQuery(query);
  }, []);

  // const { ref, inView } = useInView();

  // useEffect(() => {
  //   if (inView) {
  //     hasNextPage && fetchNextPage();
  //   }
  // }, [inView]);

  return (
    <div>
      <div className='text-lg font-semibold text-slate-900 mb-6'>최근 등록한 할일 (6)</div>
      <div className='desktop:max-w-[1200px] w-full bg-white rounded-xl p-base'>
        <RecentFilter goals={filteredData} onClickFilter={handleClick} />
      </div>
    </div>
  );
};
