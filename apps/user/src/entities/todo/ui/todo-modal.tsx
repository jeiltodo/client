'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button, Input } from '@jeiltodo/ui/shared';
import { BaseModal } from '../../../shared/ui/base-modal';
import { Todo } from '../model/type';
import { Goal, GoalDropdown } from '../../goal';
import { useCreateTodo } from '../../../features/todo/hooks/useCreateTodo';
import { useIndividualGoals } from '../../../features/goal';
import { useQueryClient } from '@tanstack/react-query';
import { goalQueryKeys } from '../../../features/goal/api/queryKey';
import { useUpdateTodo } from '../../../features/todo/hooks/useUpdateTodo';

interface Props {
  taskOwner: string;
  setTodoToggle: Dispatch<SetStateAction<boolean>>;
  onSubmit: () => void;
  initialTodo?: Todo;
  initialGoal?: Goal;
}

export const TodoModal = ({
  taskOwner,
  setTodoToggle,
  onSubmit,
  initialTodo,
  initialGoal,
}: Props) => {
  const [title, setTitle] = useState<string>(initialTodo?.title ?? '');
  const [goalId, setGoalId] = useState<number | string | undefined>(
    initialGoal?.id
  );
  const [goalTitle, setGoalTitle] = useState<string | undefined>(
    initialGoal?.title
  );
  const { data: goals } = useIndividualGoals();
  const { mutate: createTodo } = useCreateTodo();
  const { mutate: updateTodo } = useUpdateTodo();
  const queryClient = useQueryClient();

  const handleSubmit = () => {
    initialTodo
      ? updateTodo(
          { id: initialTodo.id, title },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: goalQueryKeys.individual.todos(),
              });
            },
          }
        )
      : createTodo(
          { goal_id: goalId as number, title },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: goalQueryKeys.individual.todos(),
              });
            },
          }
        );

    onSubmit();
  };

  return (
    <BaseModal
      title={`${taskOwner}의 할 일 ${initialTodo ? '수정' : '생성'}`}
      setToggle={setTodoToggle}
      width='modal_sm:w-[520px]'
    >
      <div className='flex flex-col gap-3'>
        <p className='text-base font-pretendard-semibold'>제목</p>
        <Input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type='text'
          defaultValue={initialTodo?.title}
          placeholder={initialTodo ? undefined : '할 일을 적어주세요'}
          className='text-base font-normal w-full'
        />
      </div>
      <div className='flex flex-col gap-3 mt-6'>
        <p className='text-base font-pretendard-semibold'>목표 선택</p>

        {goals && (
          <GoalDropdown
            goals={goals?.individualGoals}
            onSelect={setGoalId}
            defaultGoal={initialGoal}
          />
        )}
      </div>
      <Button
        isDisabled={!title || !goalId}
        onClick={handleSubmit}
        className='w-full h-12 mt-10'
      >
        확인
      </Button>
    </BaseModal>
  );
};
