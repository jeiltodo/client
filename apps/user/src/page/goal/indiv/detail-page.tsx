'use client';
import { LayoutTitle } from '@jeiltodo/ui/shared';
import { TitleProgressBarCard } from '../../../widgets/goal';
import { useIndividualSingleGoal } from '../../../entities/goal/hooks/useIndividualGoals';
import { NotesPushButton } from '../../../features/goal/ui/notes-push-button';

export const DetailPage = ({ params }: { params: { goalid: string } }) => {
  const goalId = Number(params.goalid);

  const { individualSingleGoal, error, isLoading } =
    useIndividualSingleGoal(goalId);
  console.log('individualSingleGoal: ', individualSingleGoal);

  return (
    <div className='max-w-[1200px]'>
      {!isLoading && individualSingleGoal && (
        <>
          <LayoutTitle title={'목표'} />
          <div className='flex flex-col gap-y-6'>
            <TitleProgressBarCard goalData={individualSingleGoal.data} />
            <NotesPushButton goalId={goalId} />
          </div>
        </>
      )}
    </div>
  );
};
