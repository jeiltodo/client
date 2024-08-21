'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button, Input } from '@jeiltodo/ui/shared';
import { BaseModal } from '../../../shared/ui/base-modal';

interface LinkModalProps {
  setLinkModalToggle: Dispatch<SetStateAction<boolean>>;
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
}
export const LinkModal = ({
  setLinkModalToggle,
  link,
  setLink,
}: LinkModalProps) => {
  const [input, setInput] = useState<string>(link || '');

  const handleLink = () => {
    setLink(input);
    setLinkModalToggle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLink();
    }
  };

  return (
    <BaseModal
      title='링크 업로드'
      setToggle={setLinkModalToggle}
      width='modal_sm:w-[520px]'
    >
      <div className='flex flex-col gap-3'>
        <p className='text-base font-pretendard-semibold'>링크</p>
        <Input
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          value={input}
          type='text'
          placeholder='링크 주소를 입력해주세요'
          className='w-full text-base font-normal'
          autoFocus
        />
      </div>
      <Button
        isDisabled={!input}
        className='w-full h-12 mt-10'
        onClick={handleLink}
      >
        확인
      </Button>
    </BaseModal>
  );
};
