'use client';
import { LayoutTitle } from '@jeiltodo/ui/shared';
import { TitleProgressBarCard } from '../../../widgets/goal';
import { NotesPushButton } from '../../../features/goal/ui/notes-push-button';
import { useIndividualSingleGoal } from '../../../entities/goal/hooks/useIndividualGoals';
import { TodoDoneBoard } from '../../../widgets/todo';

export const DetailPage = ({ params }: { params: { goalid: string } }) => {
  const goalId = Number(params.goalid);
  const {
    data: singleGoalTodo,
    error,
    isLoading,
  } = useIndividualSingleGoal(goalId);

  return (
    <div>
      {!isLoading && singleGoalTodo && (
        <>
          <LayoutTitle title={'목표'} />
          <div className='flex flex-col gap-y-6'>
            <TitleProgressBarCard goalData={singleGoalTodo.data} />
            <NotesPushButton goalId={goalId} />
            <TodoDoneBoard goalId={goalId} />
          </div>
        </>
      )}
    </div>
  );
};
