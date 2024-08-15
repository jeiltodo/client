'use client';

import React, { useEffect } from 'react';
import { progressAllOptions, useGoalsWithTodos } from '../../../entities/goal';
import {
  ProgressBoard,
  RecentTodoCard,
  UserGoalCard,
} from '../../../widgets/user';
import { useInView } from 'react-intersection-observer';
import { BoardTitle } from '@jeiltodo/ui/shared';
import { useQuery } from '@tanstack/react-query';

export const UserDashboardPage = () => {
  const { data: progress } = useQuery(progressAllOptions());
  const { data, hasNextPage, fetchNextPage } = useGoalsWithTodos({
    limit: 3,
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      hasNextPage && fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      <ProgressBoard completedPercent={progress?.progress ?? 0} />
      <div className='flex flex-wrap gap-4 bg-white px-5 rounded-xl py-5 mt-5'>
        <BoardTitle title='나의 목표' />
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.goals.map((goal) => (
              <UserGoalCard key={goal.id} {...goal} />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div ref={ref} className='h-4'></div>
    </div>
  );
};
