'use client';
import { LayoutTitle } from '@jeiltodo/ui/shared';
import { TitleProgressBarCard } from '../../../widgets/goal';
import { NotesPushButton } from '../../../features/goal/ui/notes-push-button';
import { useIndividualSingleGoal } from '../../../entities/goal/hooks/useIndividualGoals';
import { TodoDoneBoard } from '../../../widgets/todo';
import { useSingleGoalTodo } from '../../../entities/todo/hooks/useSingleGoalTodo';

export const IndivDetailPage = ({
  params,
}: {
  params: { goalid: number; nickname: string };
}) => {
  const goalId = Number(params.goalid);
  const {
    data: singleGoal,
    error,
    isLoading,
  } = useIndividualSingleGoal(goalId);
  const { data: singleGoalTodo } = useSingleGoalTodo(goalId);
  console.log('detail-page singleGoal: ', singleGoal);
  console.log('detail-page singleGoalTodo: ', singleGoalTodo);

  return (
    <div>
      {!isLoading && singleGoal && singleGoalTodo && (
        <>
          <LayoutTitle title={`${params.nickname}의 목표`} />
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
