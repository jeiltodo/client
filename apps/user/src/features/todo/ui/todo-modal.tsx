'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button, Dropdown, Input } from '@jeiltodo/ui/shared';
import { BaseModal } from '../../../shared/ui/base-modal';

interface TodoModalProps {
  taskOwner: string;
  setTodoToggle: Dispatch<SetStateAction<boolean>>;
}
export const TodoModal = ({ taskOwner, setTodoToggle }: TodoModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [goal, setGoal] = useState<string>('');

  return (
    <BaseModal
      title={`${taskOwner}의 할 일 생성`}
      setToggle={setTodoToggle}
      width='modal_sm:w-[520px]'
    >
      <div className='flex flex-col gap-3'>
        <p className='text-base font-pretendard-semibold'>제목</p>
        <Input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type='text'
          placeholder='할 일의 제목을 적어주세요'
          className='text-base font-normal w-full'
        />
      </div>
      <div className='flex flex-col gap-3 mt-6'>
        <p className='text-base font-pretendard-semibold'>목표 선택</p>
        <Dropdown
          hasInitialValue={false}
          onSelect={setGoal}
          size='fixed'
          round='round'
        >
          <Dropdown.Toggle>누구의 목표인지 선택해주세요</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item value='1'>1</Dropdown.Item>
            <Dropdown.Item value='2'>2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Button isDisabled={!title && !goal} className='w-full h-12 mt-10'>
        확인
      </Button>
    </BaseModal>
  );
};
