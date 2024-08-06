'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button, Input } from '@jeiltodo/ui';
import { BaseModal } from '../../../shared/ui/base-modal';

interface GoalModalProps {
  setGoalToggle: Dispatch<SetStateAction<boolean>>;
}
export const GoalModal = ({ setGoalToggle }: GoalModalProps) => {
  const [title, setTitle] = useState<string>('');

  return (
    <BaseModal
      title='체다치즈의 목표 생성'
      setToggle={setGoalToggle}
      width='modal_sm:w-[520px]'
    >
      <div className='flex flex-col gap-3'>
        <p className='text-base font-pretendard-semibold'>제목</p>
        <Input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type='text'
          placeholder='목표의 제목을 적어주세요'
          className='w-full text-base font-normal'
        />
      </div>
      <Button isDisabled={!title} className='w-full h-12 mt-10'>
        확인
      </Button>
    </BaseModal>
  );
};
