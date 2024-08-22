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
  const [error, setError] = useState<string>('');

  const isValidUrl = (url: string) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
      'i'
    );
    return !!urlPattern.test(url);
  };

  const handleLink = () => {
    if (isValidUrl(input)) {
      setLink(input);
      setLinkModalToggle(false);
    } else {
      setError('링크가 유효하지 않습니다.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError(''); // 입력할 때마다 에러 메시지 초기화
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
          onChange={handleChange}
          value={input}
          type='text'
          placeholder='링크 주소를 입력해주세요'
          className='w-full text-base font-normal'
        />
        {error && <p className='text-sm font-normal text-red-500'>{error}</p>}
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
