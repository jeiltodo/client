import { BoardTitle, Flyout, ProgressBar } from '@jeiltodo/ui/shared';
import { GoalWithoutTodos } from '../../entities/goal';
import { useState } from 'react';
import { Kebab } from '@jeiltodo/icons';
import { GoalModal } from '../../features/goal';
import { ConfirmationModal } from '../../shared';
import { deleteIndividualGoals } from '../../entities/goal/api/deleteIndividualGoals';
import { patchIndividualGoals } from '../../entities/goal/api/patchIndividualGoals';

interface Props {
  goalData: GoalWithoutTodos;
}

export const TitleProgressBarCard = ({ goalData }: Props) => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const [isGoalToggleOpen, setIsGoalToggleOpen] = useState(false);
  const [isComfirmOpen, setIsComfirmOpen] = useState(false);

  const handleKebab = () => {
    setIsFlyoutOpen((prev) => !prev);
  };

  const handleEdit = async (newGoalTitle: string) => {
    const response = await patchIndividualGoals({
      goalid: goalData.id,
      title: newGoalTitle,
    });
    if (response.code === 200) {
      setIsGoalToggleOpen(false);
      console.log('//이전화면으로 돌아가기: ');
    }
  };

  const handleDelete = async () => {
    const response = await deleteIndividualGoals({ goalId: goalData.id });
    if (response.code === 204) {
      setIsComfirmOpen(false);
      console.log('//이전화면으로 돌아가기: ');
    }
  };

  return (
    <div className={`min-w-[1200px] bg-white p-6 rounded-xl`}>
      <div className='flex flex-row items-center justify-between'>
        <BoardTitle className='mb-[24px]' icon='flag' title={goalData.title} />
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
                setIsComfirmOpen(true);
                setIsFlyoutOpen(false);
              }}
            />
          )}
          {isGoalToggleOpen && (
            <GoalModal
              nickname={`체다치이즈`}
              initialValue={goalData.title}
              type='edit'
              setGoalToggle={setIsGoalToggleOpen}
              onClick={handleEdit}
            />
          )}
          {isComfirmOpen && (
            <ConfirmationModal
              setModalToggle={setIsComfirmOpen}
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
          <ProgressBar progress={goalData.progress} />
        </div>
      </div>
    </div>
  );
};
