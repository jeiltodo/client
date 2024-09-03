'use client';

import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

interface InputSwapModeProps {
  label: string;
  value: string;
  defaultValue: string;
  isEditMode: boolean;
  isGroup?: boolean;
  isAdmin?: boolean;
  onChange: (value: string) => void;
  onSwap: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export const InputSwapMode = ({
  label,
  value,
  defaultValue,
  isEditMode,
  isGroup = false,
  isAdmin = false,
  onChange,
  onSwap,
  className,
}: InputSwapModeProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleToggle = () => {
    if (isEditMode) {
      onChange(defaultValue);
    }
    onSwap((prev) => !prev);
  };

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div className={`w-full h-fit ${className}`}>
      <label className='inline-block w-full text-sm text-slate-800 font-light opacity-50'>
        {label}
      </label>

      <div className='flex w-full gap-0.5'>
        <input
          ref={inputRef}
          value={value}
          readOnly={isEditMode}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className={`inline-block w-full text-lg text-slate-800 font-semibold border-b  focus:outline-none ${isEditMode ? ' border-slate-800' : 'border-transparent'}`}
        />
        <button
          onClick={handleToggle}
          className={`inline-block min-w-[84px] h-9 border rounded-xl ${!isEditMode ? (isGroup ? (isAdmin ? 'border-blue-500 text-blue-500' : 'border-groupColor-500 text-groupColor-500') : 'border-blue-500 text-blue-500 ') : 'bg-slate-900 text-white '}`}
        >
          {isEditMode ? '수정' : '취소'}
        </button>
      </div>
    </div>
  );
};
