'use client';
import type { Dispatch, SetStateAction} from 'react';
import { useState } from 'react';
import { Button, Input , BaseModal } from '@jeiltodo/ui/shared';

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
      '^(https?:\\/\\/)?' + // 프로토콜 (http 또는 https)
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z\\d]{2,}|' + // 도메인 이름 또는 IP 주소 (IPv4)
        '\\[?[a-f\\d:]+\\]?)' + // IPv6
        '(\\:\\d+)?' + // 포트 번호
        '(\\/[-a-z\\d%_.~+&:@\\u0021-\\uFFFF]*)*' + // 경로 (확장된 유니코드 포함)
        '(\\?[;&a-z\\d%_.~+=:@\\u0021-\\uFFFF]*)?' + // 쿼리 스트링 (확장된 유니코드 포함)
        '(\\#[-a-z\\d_\\/\\u0021-\\uFFFF]*)?$', // 프래그먼트 (확장된 유니코드 포함)
      'i'
    );
    return Boolean(urlPattern.test(url));
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
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={input}
          type='text'
          placeholder='링크 주소를 입력해주세요'
          className='w-full text-base font-normal'
          autoFocus
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
