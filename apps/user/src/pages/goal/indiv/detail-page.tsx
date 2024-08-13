'use client';
import { LayoutTitle } from '@jeiltodo/ui/shared';
import { TitleProgressBarCard } from '../../../widgets/goal';
import { useIndividualSingleGoal } from '../../../entities/goal/hooks/useIndividualGoals';

export const DetailPage = ({ params }: { params: { goalid: string } }) => {
  const goalId = Number(params.goalid);

  const { individualSingleGoal, error, isLoading } =
    useIndividualSingleGoal(goalId);

  return (
    <div className='max-w-[1200px]'>
      {individualSingleGoal && (
        <>
          <LayoutTitle title={'목표'} />
          <TitleProgressBarCard goalData={individualSingleGoal} />
        </>
      )}
    </div>
  );
};
