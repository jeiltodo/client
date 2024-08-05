'use client'
import { DeleteMenu } from '@jeiltodo/icons';
import { Dispatch, ReactNode, SetStateAction, MouseEvent } from 'react';

interface BaseModalProps {
  title?: string;
  setToggle: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  width?: string;
}

export const BaseModal = ({ title, setToggle, children, width }: BaseModalProps) => {
  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  
  return (
    <div onClick={() => setToggle(false)} className='z-30 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full y-full min-h-full bg-black/[.08]'>
      <div onClick={handleModalClick} className={`bg-white ${width} mobile:w-3/4 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl p-6`}>
        <div className='flex items-center justify-between mb-6'>
          {title ? (
            <div className='text-lg font-bold text-slate-800'>
              {title}
            </div>
          ): (<div></div>)}
          <button onClick={() => setToggle(false)} className='cursor-pointer'>
            <DeleteMenu className='w-6 h-6' />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};