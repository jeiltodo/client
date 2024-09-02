'use client';
import type { Dispatch, SetStateAction} from 'react';
import { useState } from 'react';
import { Button, Input , BaseModal } from '@jeiltodo/ui/shared';

interface GroupAttendModalProps {
  setGroupAttendToggle: Dispatch<SetStateAction<boolean>>;
  handleAttendGroup: (secretCode: string) => void;
  isOnError?: boolean;
}
export const GroupAttendModal = ({
  setGroupAttendToggle,
  handleAttendGroup,
  isOnError = false,
}: GroupAttendModalProps) => {
  const [secretCode, setSecretCode] = useState<string>('');

  const handleSubmit = () => {
    if (secretCode) {
      handleAttendGroup(secretCode);
      !isOnError && setGroupAttendToggle(false); // 모달 닫기
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

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
          onKeyDown={handleKeyDown}
          type='text'
          placeholder='그룹의 초대코드를 적어주세요'
          className='w-full text-base font-normal'
          autoFocus
        />
      </div>
      <Button
        isDisabled={!secretCode}
        className='w-full mt-10 h-12'
        onClick={handleSubmit}
      >
        확인
      </Button>
    </BaseModal>
  );
};
