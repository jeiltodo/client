'use client';
import { Button, LayoutTitle } from '@jeiltodo/ui/shared';
// import { TitleProgressBarCard } from '../../../widgets/goal';
import { NotesPushButton } from '../../../features/goal/ui/notes-push-button';
// import { TodoDoneBoard } from '../../../widgets/todo';
import { useSingleGoalTodo } from '../../../entities/todo/hooks/useSingleGoalTodo';
import { useIndividualSingleGoal } from '../../../entities/user/hooks/useSingleIndivGoals';
import { userOptions } from '../../../entities/user';
import { useQuery } from '@tanstack/react-query';
// import { TodoModal } from '../../../entities/todo';
// import { useState } from 'react';
import { useIndividualGoals } from '../../../entities/goal';
import { Plus } from '@jeiltodo/icons';

export const IndivDetailPage = ({ params }: { params: { id: number } }) => {
  const goalId = Number(params.id);
  // const [modalOpen, setModalOpen] = useState(false);
  const { data: singleGoal, isLoading } = useIndividualSingleGoal(goalId);
  const { data: singleGoalTodo } = useSingleGoalTodo(goalId);
  const { data: user } = useQuery(userOptions());
  // const { data: goals } = useIndividualGoals();
  // const formatted =
  //   goals?.map((goal) => ({ id: goal.id, title: goal.title })) ?? [];

  // const handleAddModal = () => {
  //   setModalOpen(true);
  // };

  return (
    <div>
      {!isLoading && singleGoal && singleGoalTodo && (
        <>
          <LayoutTitle
            title={`${decodeURIComponent(user?.nickname ?? '개인')}의 목표`}
          />
          <div className='flex flex-col gap-y-6'>
            {/* <TitleProgressBarCard goalData={singleGoal} /> */}
            <NotesPushButton goalId={goalId} />
            <div className='w-full flex justify-end'>
              <Button
                variant='text-blue'
                className='flex gap-1 items-center text-sm h-[20px]'
                // onClick={handleAddModal}
              >
                <Plus width={16} height={16} />
                할일 추가
              </Button>
            </div>

            {/* <TodoDoneBoard todos={singleGoalTodo} goal={singleGoal} /> */}
            {/* {modalOpen && (
              <TodoModal
                todoCreator={user?.nickname ?? '개인'}
                goals={formatted}
                setTodoModalToggle={setModalOpen}
                initialGoal={{ id: singleGoal.id, title: singleGoal.title }}
              />
            )} */}
          </div>
        </>
      )}
    </div>
  );
};
