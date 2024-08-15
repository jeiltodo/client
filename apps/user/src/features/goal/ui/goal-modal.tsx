'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button, Input } from '@jeiltodo/ui/shared';
import { BaseModal } from '../../../shared/ui/base-modal';

interface Props {
  goalCreator: string;
  onMutateGoal: (
    goal: { id: number; title: string } | { title: string }
  ) => void;
  setGoalModalToggle: Dispatch<SetStateAction<boolean>>;
  initialGoal?: { id: number; title: string };
}
export const GoalModal = ({
  goalCreator,
  onMutateGoal,
  setGoalModalToggle: toggleModal,
  initialGoal,
}: Props) => {
  const [title, setTitle] = useState<string>(initialGoal?.title ?? '');

  const handleSubmit = () => {
    onMutateGoal(initialGoal ? { id: initialGoal.id, title } : { title });
    toggleModal(false);
  };

  return (
    <BaseModal
      title={`${goalCreator}의 목표 생성`}
      setToggle={toggleModal}
      width='modal_sm:w-[520px]'
    >
      <div className='flex flex-col gap-3'>
        <p className='text-base font-pretendard-semibold'>제목</p>
        <Input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          type='text'
          placeholder='목표를 적어주세요'
          className='w-full text-base font-normal'
        />
      </div>
      <Button
        isDisabled={!title}
        className='w-full mt-10 h-12'
        onClick={handleSubmit}
      >
        확인
      </Button>
    </BaseModal>
  );
};
