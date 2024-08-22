'use client'
import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

import { Button, ButtonGroup } from '@jeiltodo/ui/shared';
import { BaseModal } from '../base-modal';

interface Props extends PropsWithChildren {
  setModalToggle: Dispatch<SetStateAction<boolean>>;
  submitButtonText: string;
  onSubmit: () => void;
}
export const ConfirmationModal = ({
  setModalToggle,
  children,
  submitButtonText,
  onSubmit,
}: Props) => {
  return (
    <BaseModal setToggle={setModalToggle} width='modal_sm:w-[450px]'>
      <div className='flex flex-col gap-6 items-center justify-center'>
        <p className='text-base font-meduim'>{children}</p>
        <ButtonGroup gap={1}>
          <Button
            variant='outline'
            className='tablet:w-[120px] mobile:w-[85px] h-12'
            onClick={() => {
              setModalToggle(false);
            }}
          >
            취소
          </Button>
          <Button className='tablet:w-[120px] mobile:w-[85px] h-12' onClick={onSubmit}>
            {submitButtonText}
          </Button>
        </ButtonGroup>
      </div>
    </BaseModal>
  );
};
