'use client';
import { LayoutTitle } from '@jeiltodo/ui/shared';
import { TitleProgressBarCard } from '../../../widgets/goal';
import { NotesPushButton } from '../../../features/goal/ui/notes-push-button';
import { TodoDoneBoard } from '../../../widgets/todo';
import { useSingleGoalTodo } from '../../../entities/todo/hooks/useSingleGoalTodo';
import { useIndividualSingleGoal } from '../../../entities/user/hooks/useSingleIndivGoals';
import { userOptions } from '../../../entities/user';
import { useQuery } from '@tanstack/react-query';

export const IndivDetailPage = ({ params }: { params: { id: number } }) => {
  const goalId = Number(params.id);
  const { data: singleGoal, isLoading } = useIndividualSingleGoal(goalId);
  const { data: singleGoalTodo } = useSingleGoalTodo(goalId);
  const { data: user } = useQuery(userOptions());
  return (
    <div>
      {!isLoading && singleGoal && singleGoalTodo && (
        <>
          <LayoutTitle
            title={`${decodeURIComponent(user?.nickname ?? '개인')}의 목표`}
          />
          <div className='flex flex-col gap-y-6'>
            <TitleProgressBarCard goalData={singleGoal.data} />
            <NotesPushButton goalId={goalId} />
            <TodoDoneBoard todos={singleGoalTodo} goal={singleGoal.data} />
          </div>
        </>
      )}
    </div>
  );
};
