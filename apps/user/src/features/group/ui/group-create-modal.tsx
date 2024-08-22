'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button, Input } from '@jeiltodo/ui/shared';
import { BaseModal } from '../../../shared/ui/base-modal';

interface GroupCreateModalProps {
  setGroupCreateToggle: Dispatch<SetStateAction<boolean>>;
  handleCreateGroup: (title: string) => void;
  isOnError?: boolean;
}
export const GroupCreateModal = ({
  setGroupCreateToggle,
  handleCreateGroup,
  isOnError = false,
}: GroupCreateModalProps) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = () => {
    if (title) {
      handleCreateGroup(title);
      !isOnError && setGroupCreateToggle(false); // 모달 닫기
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

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
          onKeyDown={handleKeyDown}
          type='text'
          placeholder='그룹 이름을 적어주세요'
          className='w-full text-base font-normal'
          autoFocus
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
