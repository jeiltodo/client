'use client';
import { Button, LayoutTitle, LoadingSpinner } from '@jeiltodo/ui/shared';
import { PlusOrange } from '@jeiltodo/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NotesPushButton } from '../../../features/goal/ui/notes-push-button';
import {
  useGroupGoals,
  useGroupSingleGoal,
} from '../../../entities/group/hooks/useGroupGoals';
import { useSingleGoalTodo } from '../../../entities/todo/hooks/useSingleGoalTodo';
import { useGroupDetail } from '../../../entities/group';
import { TitleProgressBarCard } from '../../../widgets/goal';
import { useDeleteGroupGoal } from '../../../entities/group/hooks/useDeleteGroupGoal';
import { useUpdateGroupGoal } from '../../../entities/group/hooks/useUpdateGroupGoal';
import { GoalModal } from '../../../features/goal';
import type { SingleGroupGoalTodo } from '../../../entities/todo';
import { TodoModal } from '../../../entities/todo';
import { GroupTodoDoneBoard } from '../../../features/todo';
import { userOptions } from '../../../entities/goal';

export const GroupGoalDetailPage = ({
  params,
}: {
  params: { id: string; goalid: string };
}) => {
  const goalId = Number(params.goalid);
  const groupId = Number(params.id);

  const router = useRouter();
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);
  const [isGoalToggleOpen, setIsGoalToggleOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { data: user } = useQuery(userOptions());
  const { data: group } = useGroupDetail(groupId);
  const { data: groupGoals } = useGroupGoals(groupId);

  const { data: singleGroupGoal, isLoading } = useGroupSingleGoal(goalId);
  const { data: singleGroupGoalTodo } =
    useSingleGoalTodo<SingleGroupGoalTodo[]>(goalId);
  const { mutate: editGroupGoal } = useUpdateGroupGoal(groupId);
  const { mutate: deleteGroupGoal } = useDeleteGroupGoal(groupId);

  const groupGoalsForModal =
    groupGoals?.map((goal) => ({ id: goal.id, title: goal.title })) ?? [];

  const handleEdit = ({ id, title }: { id: number; title: string }) => {
    editGroupGoal({ id, title });
  };

  const handleDelete = () => {
    deleteGroupGoal(
      { id: goalId },
      {
        onSettled: () => {
          router.back();
        },
      }
    );
  };

  const openEditModal = () => {
    setIsGoalToggleOpen(true);
  };

  const openDeleteModal = () => {
    setIsConfirmOpen(true);
  };

  const openAddTodoModal = () => {
    setIsAddTodoModalOpen(true);
  };
  return (
    <div className='max-w-[1200px]'>
      <LayoutTitle title={`${group?.title ?? '그룹'} 목표`} />
      <div className='flex flex-col gap-y-6 relative'>
        {!isLoading && singleGroupGoal && singleGroupGoalTodo ? (
          <>
            <TitleProgressBarCard
              goalData={singleGroupGoal}
              onEditGoal={openEditModal}
              onDeleteGoal={openDeleteModal}
            />
            <NotesPushButton goalData={singleGroupGoal} isGroup />
            <div className='flex items-center justify-end'>
              <Button
                variant='text-group-color'
                className='flex gap-1 items-center text-sm h-[20px]'
                onClick={openAddTodoModal}
              >
                <PlusOrange width={16} height={16} />
                할일 추가
              </Button>
            </div>
            {user?.id && (
              <GroupTodoDoneBoard
                todos={singleGroupGoalTodo}
                goal={singleGroupGoal}
                userName={user.nickname}
              />
            )}
            {isGoalToggleOpen && (
              <GoalModal
                goalCreator={group?.title ?? '그룹'}
                initialGoal={{
                  id: singleGroupGoal.id,
                  title: singleGroupGoal.title,
                }}
                setGoalModalToggle={setIsGoalToggleOpen}
                onMutateGoal={handleEdit}
              />
            )}
            {isConfirmOpen && (
              <ConfirmationModal
                setModalToggle={setIsConfirmOpen}
                submitButtonText='삭제'
                onSubmit={handleDelete}
              >
                정말 삭제 하시겠어요?
              </ConfirmationModal>
            )}
            {isAddTodoModalOpen && (
              <TodoModal
                todoCreator={group?.title ?? '그룹'}
                setTodoModalToggle={setIsAddTodoModalOpen}
                initialGoal={singleGroupGoal}
                goals={groupGoalsForModal}
                shouldCharge
              />
            )}
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};
