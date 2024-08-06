'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button, ButtonGroup, Input } from '@jeiltodo/ui/shared';
import { BaseModal } from '../../../shared/ui/base-modal';

interface LoadDraftModalProps {
  setLoadDraftToggle: Dispatch<SetStateAction<boolean>>;
}
export const LoadDraftModal = ({ setLoadDraftToggle }: LoadDraftModalProps) => {
  return (
    <BaseModal setToggle={setLoadDraftToggle} width='modal_sm:w-[450px]'>
      <div className='flex flex-col gap-6 items-center justify-center'>
        <p className='text-base font-meduim'>불러올 내용</p>

        <ButtonGroup gap={2}>
          <Button variant='outline' className='w-[120px] h-12'>
            취소하기
          </Button>
          <Button className='w-[120px] h-12'>불러오기</Button>
        </ButtonGroup>
      </div>
    </BaseModal>
  );
};
