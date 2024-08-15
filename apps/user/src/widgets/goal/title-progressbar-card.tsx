import { BoardTitle, Flyout, ProgressBar } from '@jeiltodo/ui/shared';

import { useState } from 'react';
import { Kebab } from '@jeiltodo/icons';
import { GoalModal } from '../../features/goal';
import { ConfirmationModal } from '../../shared';

import { Goal } from '../../entities/goal';
import { useQuery } from '@tanstack/react-query';
import { userOptions } from '../../entities/user';
import { useRouter } from 'next/navigation';

interface Props {
  goalData: Goal;
}

export const TitleProgressBarCard = ({ goalData }: Props) => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const [isGoalToggleOpen, setIsGoalToggleOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const router = useRouter();

  const { data: user } = useQuery(userOptions());

  const handleKebab = () => {
    setIsFlyoutOpen((prev) => !prev);
  };

  const handleEdit = async ({ title }: { title: string }) => {
    // const response = await individualGoalsApi.patchIndividualGoal({
    //   goalId: goalData.id,
    //   title: newGoalTitle,
    // });
    // if (response.code === 200) {
    //   setIsGoalToggleOpen(false);
    //   console.log('//이전화면으로 돌아가기: ');
    // }
  };

  const handleDelete = async () => {
    // const response = await individualGoalsApi.deleteIndividualGoal({
    //   goalId: goalData.id,
    // });
    // if (response.code === 204) {
    //   setIsConfirmOpen(false);
    //   router.back();
    // }
  };

  return (
    <div className='bg-white p-6 rounded-xl'>
      <div className='flex flex-row items-center justify-between mb-[24px]'>
        <BoardTitle icon='flag' title={goalData.title} />
        <span className='inline-flex items-center gap-2 relative'>
          <Kebab
            width={24}
            height={24}
            onClick={handleKebab}
            className='cursor-pointer '
          />

          {isFlyoutOpen && (
            <Flyout
              onEdit={() => {
                setIsGoalToggleOpen(true);
                setIsFlyoutOpen(false);
              }}
              onDelete={() => {
                setIsConfirmOpen(true);
                setIsFlyoutOpen(false);
              }}
            />
          )}
          {/* TODO:: onblur 일 떄 Flyout닫히도록.*/}
          {isGoalToggleOpen && (
            <GoalModal
              goalCreator={user?.nickname ?? ''}
              initialGoal={{ id: goalData.id, title: goalData.title }}
              setGoalModalToggle={setIsGoalToggleOpen}
              onMutateGoal={handleEdit}
            />
          )}
          {isConfirmOpen && (
            <ConfirmationModal
              setModalToggle={setIsConfirmOpen}
              submitButtonText={'삭제'}
              onSubmit={handleDelete}
            >
              정말 삭제 하시겠어요?
            </ConfirmationModal>
          )}
        </span>
      </div>
      <div className='flex flex-col justify-center w-full rounded-3xl  bg-white mt-2'>
        <h3 className='text-xs font-pretendard-semibold'>Progress</h3>
        <div className='py-[6px]'>
          <ProgressBar progress={goalData.progress || 0} />
        </div>
      </div>
    </div>
  );
};
