'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button, Input } from '@jeiltodo/ui';
import { BaseModal } from '../../../shared/ui/base-modal';

interface GroupAttendModalProps {
  setGroupAttendToggle: Dispatch<SetStateAction<boolean>>;
}
export const GroupAttendModal = ({
  setGroupAttendToggle,
}: GroupAttendModalProps) => {
  const [secretCode, setSecretCode] = useState<string>('');
 
  return (
    <BaseModal
      title='그룹 참여'
      setToggle={setGroupAttendToggle}
      width='modal_sm:w-[520px]'
    >
      <div className='flex flex-col gap-3'>
        <p className='text-base font-pretendard-semibold'>초대코드</p>
        <Input
          onChange={(e) => {
            setSecretCode(e.target.value);
          }}
          type='text'
          placeholder='그룹의 초대코드를 적어주세요'
          className='w-full text-base font-normal'
        />
      </div>
      <Button isDisabled={!secretCode} className='w-full mt-10 h-12'>
        확인
      </Button>
    </BaseModal>
  );
};
