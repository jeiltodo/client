'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Button, Input } from '@jeiltodo/ui/shared';
import { BaseModal } from '../../../shared/ui/base-modal';

interface GoalModalProps {
  nickname: string;
  initialValue: string;
  type?: 'edit' | 'create';
  setGoalToggle: Dispatch<SetStateAction<boolean>>;
  onClick: (value: string) => void;
}
export const GoalModal = ({
  nickname,
  initialValue,
  type = 'create',
  setGoalToggle,
  onClick,
}: GoalModalProps) => {
  const [title, setTitle] = useState<string>(initialValue);

  useEffect(() => {
    setTitle(initialValue);
  }, [initialValue]);

  return (
    <BaseModal
      title={`${nickname}의 목표 ${type === 'edit' ? '수정' : '생성'}`}
      setToggle={setGoalToggle}
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
          placeholder='목표의 제목을 적어주세요'
          className='w-full text-base font-normal'
        />
      </div>
      <Button
        isDisabled={!title}
        className='w-full mt-10 h-12'
        onClick={() => {
          onClick(title);
        }}
      >
        확인
      </Button>
    </BaseModal>
  );
};
