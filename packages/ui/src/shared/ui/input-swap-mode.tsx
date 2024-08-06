'use client';

import { useState } from 'react';

interface Props {
  labelText: string;
  inputName: string;
  defaultValue: string;

  className?: string;
}

export const InputSwapMode = ({
  labelText,
  inputName,
  defaultValue,
  className,
}: Props) => {
  const [isEditMode, swapMode] = useState<boolean>(false);

  const handleToggle = () => {
    swapMode((prev) => !prev);
  };
  return (
    <div className={`w-full h-fit ${className}`}>
      <label className='inline-block w-full text-sm text-slate-800 font-semibold opacity-50'>
        {labelText}
      </label>

      <div className='flex w-full gap-4'>
        <input
          name={inputName}
          readOnly={isEditMode === false}
          defaultValue={defaultValue}
          className={`inline-block w-full text-lg text-slate-800 font-semibold pt-1 border-b ${isEditMode === false ? 'border-transparent' : ' border-slate-800'}`}
        />
        <button
          onClick={handleToggle}
          className={`inline-block min-w-[84px] h-9 border rounded-xl ${isEditMode === false ? 'border-blue-500 text-blue-500 ' : 'bg-slate-900 text-white '}`}
        >
          {isEditMode === false ? '수정' : '취소'}
        </button>
      </div>
    </div>
  );
};
