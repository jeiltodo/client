'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button, Input } from '@jeiltodo/ui/shared';
import { BaseModal } from '../../../shared/ui/base-modal';
import { Todo } from '../model/type';
import { GoalDropdown, GoalIdAndTitle } from '../../goal';
import { useCreateTodo } from '../hooks/useCreateTodo';
import { useUpdateTodo } from '../hooks/useUpdateTodo';

interface Props {
  todoCreator: string;
  setTodoModalToggle: Dispatch<SetStateAction<boolean>>;
  goals: { id: number; title: string }[];
  initialTodo?: Todo;
  initialGoal?: GoalIdAndTitle;
}

export const TodoModal = ({
  todoCreator,
  setTodoModalToggle,
  goals,
  initialTodo,
  initialGoal,
}: Props) => {
  const [title, setTitle] = useState<string>(initialTodo?.title ?? '');
  const [goalId, setGoalId] = useState<number | string | undefined>(
    initialGoal?.id
  );

  const { mutate: createTodo } = useCreateTodo();
  const { mutate: updateTodo } = useUpdateTodo();
  console.log('initialTodo: ', initialTodo);
  const handleSubmit = () => {
    initialTodo
      ? updateTodo({ id: initialTodo.id, title })
      : createTodo({ goalId: goalId as number, title });
    setTodoModalToggle(false);
  };

  return (
    <BaseModal
      title={`${todoCreator}의 할 일 ${initialTodo ? '수정' : '생성'}`}
      setToggle={setTodoModalToggle}
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
            goals={goals}
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
