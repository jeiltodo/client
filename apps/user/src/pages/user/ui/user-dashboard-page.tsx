'use client';

import { useGoalsWithTodos, useProgressAll } from '../../../entities/goal';
import { ProgressBoard, UserGoalCard } from '../../../widgets/user';
export const UserDashboardPage = () => {
  const { data: progress } = useProgressAll();
  const { data: goals } = useGoalsWithTodos();
  if (!goals) return <div>loading</div>;

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
