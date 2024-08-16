'use client';
import { Button, LayoutTitle } from '@jeiltodo/ui/shared';
import { TitleProgressBarCard } from '../../widgets/goal';
import { NotesPushButton } from '../../features/goal/ui/notes-push-button';
import { TodoDoneBoard } from '../../widgets/todo';
import {
  useGroupGoals,
  useGroupSingleGoal,
} from '../../entities/group/hooks/useGroupGoals';
import { useSingleGoalTodo } from '../../entities/todo/hooks/useSingleGoalTodo';
import { useState } from 'react';
import { TodoModal } from '../../entities/todo';
import { Plus } from '@jeiltodo/icons';
import { useGroupDetail } from '../../entities/group';

export const GroupDetailPage = ({
  params,
}: {
  params: { id: string; goalid: string };
}) => {
  const goalId = Number(params.goalid);
  const groupId = Number(params.id);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: singleGroupGoal, isLoading } = useGroupSingleGoal(goalId);
  const { data: singleGoalTodo } = useSingleGoalTodo(goalId);
  const { data: groupGoals } = useGroupGoals(groupId);
  const { data: group } = useGroupDetail(groupId);

  const groupGoalsForModal =
    groupGoals?.map((goal) => ({ id: goal.id, title: goal.title })) ?? [];

  const handleAddModal = () => {
    setModalOpen(true);
  };
  return (
    <>
      {!isLoading && singleGroupGoal && singleGoalTodo ? (
        <>
          <LayoutTitle title='그룹 목표' />
          <div className='flex flex-col gap-y-6'>
            <TitleProgressBarCard goalData={singleGroupGoal} />
            <NotesPushButton goalId={goalId} />
            <Button
              variant='text-blue'
              className='flex gap-1 items-center text-sm h-[20px]'
              onClick={handleAddModal}
            >
              <Plus width={16} height={16} />
              할일 추가
            </Button>
            <TodoDoneBoard todos={singleGoalTodo} goal={singleGroupGoal} />
            {modalOpen && (
              <TodoModal
                todoCreator={group?.title ?? '그룹'}
                setTodoToggle={setModalOpen}
                initialGoal={singleGroupGoal}
                goals={groupGoalsForModal}
              />
            )}
          </div>
        </>
      ) : null}
    </>
  );
};
