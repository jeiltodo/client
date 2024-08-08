'use client';

import { Meatball } from '@jeiltodo/icons';

interface FlyoutMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onEdit: () => void;
  onDelete: () => void;
}

export const FlyoutMenu = ({
  isOpen,
  setIsOpen,
  onEdit,
  onDelete,
}: FlyoutMenuProps) => {
  return (
    <div className='relative w-[24px]'>
      <button
        type='button'
        className='flex items-center justify-center w-[24px] h-[24px] rounded-full bg-slate-50'
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Meatball width={14} height={14} />
      </button>

      {/* Flyout menu */}
      <div
        className={`absolute top-full right-0 z-10 mt-[8px] flex w-[81px]  transition-transform transition-opacity 
        ${isOpen ? 'opacity-100 translate-y-1 duration-200 ease-out' : 'opacity-0 translate-y-0 duration-150 ease-in'}
        `}
      >
        <div className='w-full flex-auto overflow-hidden text-center font-pretendard-light text-sm text-gray-900 rounded-xl shadow-sm'>
          <button
            onClick={onEdit}
            className='block w-full hover:bg-gray-50 bg-white px-[16px] py-[8px] border-b-[1px] border-slate-50'
          >
            수정하기
          </button>
          <button
            onClick={onDelete}
            className='block w-full hover:bg-gray-50 bg-white px-[16px] py-[8px]'
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};
