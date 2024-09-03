'use client';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { Button, ButtonGroup, BaseModal } from '@jeiltodo/ui/shared';

interface ConfirmationModalProps extends PropsWithChildren {
  setModalToggle: Dispatch<SetStateAction<boolean>>;
  submitButtonText: string;
  onSubmit: () => void;
}
export const ConfirmationModal = ({
  setModalToggle,
  children,
  submitButtonText,
  onSubmit,
}: ConfirmationModalProps) => {
  return (
    <BaseModal setToggle={setModalToggle} width='modal_sm:w-[450px]'>
      <div className='flex flex-col gap-6 items-center justify-center'>
        <p className='text-base font-pretendard-medium text-center'>
          {children}
        </p>
        <ButtonGroup gap={1}>
          <Button
            className='tablet:w-[120px] mobile:w-[85px] h-12'
            onClick={() => {
              setModalToggle(false);
            }}
            variant='outline'
          >
            취소
          </Button>
          <Button
            className='tablet:w-[120px] mobile:w-[85px] h-12'
            onClick={onSubmit}
          >
            {submitButtonText}
          </Button>
        </ButtonGroup>
      </div>
    </BaseModal>
  );
};
