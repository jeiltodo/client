'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button, Input } from '@jeiltodo/ui/shared';
import { BaseModal } from '../../../shared/ui/base-modal';
import { Todo } from '../model/type';
import { Goal, GoalDropdown } from '../../goal';

interface Props {
  taskOwner: string;
  setTodoToggle: Dispatch<SetStateAction<boolean>>;
  initialTodo?: Todo;
  initialGoal?: Pick<Goal, 'id' | 'title'>;
}

const goalsMock: Pick<Goal, 'id' | 'title'>[] = [
  { id: 1, title: 'JavaScript' },

  { id: 2, title: 'TypeScript' },
];

export const TodoModal = ({
  taskOwner,
  setTodoToggle,
  initialTodo,
  initialGoal,
}: Props) => {
  const [title, setTitle] = useState<string>(initialTodo?.title ?? '');
  const [goalId, setGoalId] = useState<string | number | undefined>(
    initialGoal?.id
  );
  const [goalTitle, setGoalTitle] = useState<string | undefined>(
    initialGoal?.title
  );

  const handleSubmit = () => {};

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

        <GoalDropdown
          goals={goalsMock}
          onSelect={setGoalId}
          defaultGoal={initialGoal}
        />
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
