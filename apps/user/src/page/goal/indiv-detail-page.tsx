'use client';
import { LayoutTitle } from '@jeiltodo/ui/shared';
import { TitleProgressBarCard } from '../../widgets/goal';
import { NotesPushButton } from '../../features/goal/ui/notes-push-button';
import { TodoDoneBoard } from '../../widgets/todo';
import { useIndividualSingleGoal } from '../../entities/user/hooks/useSingleIndivGoals';
import { userOptions } from '../../entities/user';
import { useQuery } from '@tanstack/react-query';
import { useSingleGoalTodo } from '../../entities/todo/hooks/useSingleGoalTodo';
import { GoalModal } from '../../features/goal';
import { ConfirmationModal } from '../../shared';
import { useState } from 'react';
import {
  useDeleteSingleGoal,
  useEditSingleGoal,
} from '../../entities/user/hooks/useSingleGoalMuate';

export const IndivDetailPage = ({ params }: { params: { id: number } }) => {
  const goalId = Number(params.id);
  const { data: singleGoal, isLoading } = useIndividualSingleGoal(goalId);
  const { data: singleGoalTodo } = useSingleGoalTodo(goalId);
  const { data: user } = useQuery(userOptions());

  const [isGoalToggleOpen, setIsGoalToggleOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { mutate: editGoal } = useEditSingleGoal();
  const { mutate: deleteGoal } = useDeleteSingleGoal();

  const handleEdit = ({ title }: { title: string }) => {
    editGoal({ goalId: singleGoal!.id, title });
  };

  const handleDelete = () => {
    deleteGoal({ goalId: singleGoal!.id });
  };

  const openEditModal = () => {
    setIsGoalToggleOpen(true);
  };

  const openDeleteModal = () => {
    setIsConfirmOpen(true);
  };
  return (
    <div>
      {!isLoading && singleGoal && singleGoalTodo && (
        <>
          <LayoutTitle
            title={`${decodeURIComponent(user?.nickname ?? '개인')}의 목표`}
          />
          <div className='flex flex-col gap-y-6'>
            <TitleProgressBarCard
              goalData={singleGoal}
              onEditGoal={openEditModal}
              onDeleteGoal={openDeleteModal}
            />
            <NotesPushButton goalId={goalId} />
            <TodoDoneBoard todos={singleGoalTodo} goal={singleGoal} />

            {isGoalToggleOpen && (
              <GoalModal
                goalCreator={user?.nickname ?? ''}
                initialGoal={{ id: singleGoal.id, title: singleGoal.title }}
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
          </div>
        </>
      )}
    </div>
  );
};
