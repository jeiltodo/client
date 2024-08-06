'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Button, Input } from '@jeiltodo/ui';
import { BaseModal } from '../../../shared/ui/base-modal';

interface LinkModalProps {
  setLinkToggle: Dispatch<SetStateAction<boolean>>;
  id: number;
}
export const LinkModal = ({ setLinkToggle, id }: LinkModalProps) => {
  const [link, setLink] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(true);

  useEffect(() => {
    if (link) {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
  }, [link]);
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
      <Button isDisabled={submit} className='w-full mt-10'>
        확인
      </Button>
    </BaseModal>
  );
};