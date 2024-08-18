'use client';
import ReactDOM from 'react-dom';
import { Dispatch, ReactNode, SetStateAction, MouseEvent } from 'react';

import { DeleteMenu } from '@jeiltodo/icons';

interface BaseModalProps {
  title?: string;
  setToggle: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  width?: string;
}

export const BaseModal = ({
  title,
  setToggle,
  children,
  width,
}: BaseModalProps) => {
  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div
      role='dialog'
      aria-labelledby='modal-title'
      aria-modal='true'
      onClick={() => setToggle(false)}
      className='z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full y-full min-h-full bg-[#000000]/30'
    >
      <div
        role='document'
        onClick={handleModalClick}
        className={`bg-white ${width} mobile:w-3/4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-6`}
      >
        <div className='flex items-center justify-between mb-6'>
          {title ? (
            <div className='text-lg font-bold text-slate-800'>{title}</div>
          ) : (
            <div></div>
          )}
          <button onClick={() => setToggle(false)} className='cursor-pointer'>
            <DeleteMenu className='w-6 h-6' />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};
