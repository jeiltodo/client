'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button, Input } from '@jeiltodo/ui/shared';
import { BaseModal } from '../../../shared/ui/base-modal';

interface LinkModalProps {
  setLinkToggle: Dispatch<SetStateAction<boolean>>;
  id: number;
}
export const LinkModal = ({ setLinkToggle, id }: LinkModalProps) => {
  const [link, setLink] = useState<string>('');

  return (
    <BaseModal
      title='링크 업로드'
      setToggle={setLinkToggle}
      width='modal_sm:w-[520px]'
    >
      <div className='flex flex-col gap-3'>
        <p className='text-base font-pretendard-semibold'>링크</p>
        <Input
          onChange={(e) => {
            setLink(e.target.value);
          }}
          type='text'
          placeholder='링크 주소를 입력해주세요'
          className='w-full text-base font-normal'
        />
      </div>
      <Button isDisabled={!link} className='w-full h-12 mt-10'>
        확인
      </Button>
    </BaseModal>
  );
};
