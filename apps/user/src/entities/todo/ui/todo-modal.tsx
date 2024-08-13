'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button, Input } from '@jeiltodo/ui/shared';
import { BaseModal } from '../../../shared/ui/base-modal';
import { Todo } from '../model/type';
import { Goal, GoalDropdown, useIndividualGoals } from '../../goal';
import { useCreateTodo } from '../hooks/useCreateTodo';
import { useUpdateTodo } from '../hooks/useUpdateTodo';
import { userOptions } from '../../user';
import { useQuery } from '@tanstack/react-query';

interface Props {
  setTodoToggle: Dispatch<SetStateAction<boolean>>;
  initialTodo?: Todo;
  initialGoal?: Goal;
}

export const TodoModal = ({
  setTodoToggle: toggleModal,
  initialTodo,
  initialGoal,
}: Props) => {
  const [title, setTitle] = useState<string>(initialTodo?.title ?? '');
  const [goalId, setGoalId] = useState<number | string | undefined>(
    initialGoal?.id
  );

  const { data: user } = useQuery(userOptions());
  const { data: goals } = useIndividualGoals();

  const { mutate: createTodo } = useCreateTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const handleSubmit = () => {
    initialTodo
      ? updateTodo({ id: initialTodo.id, title })
      : createTodo({ goal_id: goalId as number, title });
    toggleModal(false);
  };

  return (
    <BaseModal
      title={`${user?.data.nickname}의 할 일 ${initialTodo ? '수정' : '생성'}`}
      setToggle={toggleModal}
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
