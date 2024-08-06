'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button, Input } from '@jeiltodo/ui';
import { BaseModal } from '../../../shared/ui/base-modal';

interface GroupCreateModalProps {
  setGroupCreateToggle: Dispatch<SetStateAction<boolean>>;
}
export const GroupCreateModal = ({
  setGroupCreateToggle,
}: GroupCreateModalProps) => {
  const [title, setTitle] = useState<string>('');

  return (
    <BaseModal
      title='그룹 생성'
      setToggle={setGroupCreateToggle}
      width='modal_sm:w-[520px]'
    >
      <div className='flex flex-col gap-3'>
        <p className='text-base font-pretendard-semibold'>제목</p>
        <Input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type='text'
          placeholder='그룹 이름을 적어주세요'
          className='w-full text-base font-normal'
        />
      </div>
      <Button isDisabled={!title} className='w-full mt-10'>
        확인
      </Button>
    </BaseModal>
  );
};
