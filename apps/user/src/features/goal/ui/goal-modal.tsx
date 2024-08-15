'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Button, Input } from '@jeiltodo/ui/shared';
import { BaseModal } from '../../../shared/ui/base-modal';
import { useUpdateGoal } from '../../../entities/goal/hooks/useUpdateGoal';
import { useCreateGoal } from '../../../entities/goal/hooks/useCreateGoal';
import { useParams } from 'next/navigation';
import { useGroupDetail } from '../../../entities/group';

interface GoalModalProps {
  nickname: string;
  initialValue: string;
  type?: 'edit' | 'create';
  setGoalToggle: Dispatch<SetStateAction<boolean>>;
  initialGoal?: { id: number; title: string };
}
export const GoalModal = ({
  setGoalToggle: toggleModal,
  initialGoal,
}: Props) => {
  const { id }: { id: string } = useParams();
  const groupId = Number(id);
  const { data: group } = useGroupDetail(groupId);

  const [title, setTitle] = useState<string>(initialGoal?.title ?? '');
  const { mutate: createGoal } = useCreateGoal(groupId);
  const { mutate: updateGoal } = useUpdateGoal(groupId);

  const handleSubmit = () => {
    initialGoal ? updateGoal({ id: initialGoal.id, title }) : createGoal(title);
    toggleModal(false);
  };

  return (
    <BaseModal
      title={`${group?.title}의 목표 생성`}
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
          value={title}
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
