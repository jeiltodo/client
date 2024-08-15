'use client';
import { LayoutTitle } from '@jeiltodo/ui/shared';
import { TitleProgressBarCard } from '../../../widgets/goal';
import { NotesPushButton } from '../../../features/goal/ui/notes-push-button';
import { TodoDoneBoard } from '../../../widgets/todo';
import { useGroupSingleGoal } from '../../../entities/goal/hooks/useGroupGoals';
import { useIndividualSingleGoal } from '../../../entities/goal';

export const GroupDetailPage = ({ params }: { params: { goalid: number } }) => {
  const goalId = Number(params.goalid);
  const {
    data: singleGroupGoal,
    error,
    isLoading,
  } = useGroupSingleGoal(goalId);
  const { data: singleGoalTodo } = useIndividualSingleGoal(goalId);
  return (
    <>
      {!isLoading && singleGroupGoal && singleGoalTodo ? (
        <>
          <LayoutTitle title='그룹 목표' />
          <div className='flex flex-col gap-y-6'>
            <TitleProgressBarCard goalData={singleGroupGoal.data} />
            <NotesPushButton goalId={goalId} />
            <TodoDoneBoard
              todos={singleGoalTodo.data}
              goal={singleGroupGoal.data}
            />
          </div>
        </>
      ) : null}
    </>
  );
};
