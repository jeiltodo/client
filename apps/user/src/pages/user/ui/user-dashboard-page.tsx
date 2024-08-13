'use client';

import React, { useEffect } from 'react';
import { useGoalsWithTodos, useProgressAll } from '../../../entities/goal';
import { ProgressBoard, UserGoalCard } from '../../../widgets/user';
import { useInView } from 'react-intersection-observer';

export const UserDashboardPage = () => {
  const { data: progress } = useProgressAll();
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
      <div className='flex flex-wrap gap-4'>
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
