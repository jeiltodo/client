'use client';

import { ProgressBoard, UserGoalCard } from '../../../widgets/user';
import { useProgressAll } from '../../../features/goal/hooks/useProgressAll';
import { useGoalsWithTodos } from '../../../features/goal/hooks/useGoalsWithTodos';
import { useSuspenseQuery } from '@tanstack/react-query';
// import { progressOptions } from '../../../features/goal/api/progressOptions';

export const UserDashboardPage = () => {
  const { data: progress } = useProgressAll();
  const { data: goals } = useGoalsWithTodos();
  if (!goals) return <div>loading</div>;

  // const { data: progress } = useSuspenseQuery(progressOptions);
  return (
    <div>
      <ProgressBoard completedPercent={progress?.progress ?? 0} />
      <div className='flex flex-wrap gap-4'>
        {goals.map((goal) => (
          <UserGoalCard key={goal.id} {...goal} />
        ))}
      </div>
    </div>
  );
};
