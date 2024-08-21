'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

interface Props {
  label: string;
  value: string;
  defaultValue: string;
  isEditMode: boolean;
  isGroup?: boolean;
  onChange: (value: string) => void;
  onSwap: Dispatch<SetStateAction<boolean>>;
  className?: string;
  colorVariant?: 'blue' | 'orange';
}

export const InputSwapMode = ({
  label,
  value,
  defaultValue,
  isEditMode,
  isGroup = false,
  onChange,
  onSwap,
  className,
  colorVariant = 'blue',
}: Props) => {
  const handleToggle = () => {
    if (isEditMode === true) {
      onChange(defaultValue);
    }
    onSwap((prev) => !prev);
  };

  return (
    <div className={`w-full h-fit ${className}`}>
      <label className='inline-block w-full text-sm text-slate-800 font-light opacity-50'>
        {label}
      </label>

      <div className='flex w-full gap-0.5'>
        <input
          value={value}
          readOnly={isEditMode === false}
          defaultValue={defaultValue}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className={`inline-block w-full text-lg text-slate-800 font-semibold border-b ${isEditMode === false ? 'border-transparent' : ' border-slate-800'}`}
        />
        <button
          onClick={handleToggle}
          className={`inline-block min-w-[84px] h-9 border rounded-xl ${isEditMode === false ? (isGroup ? 'border-groupColor-500 text-groupColor-500 ' : 'border-blue-500 text-blue-500 ') : 'bg-slate-900 text-white '}`}
        >
          {isEditMode === false ? '수정' : '취소'}
        </button>
      </div>
    </div>
  );
};
