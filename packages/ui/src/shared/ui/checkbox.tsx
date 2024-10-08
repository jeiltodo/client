'use client';

import {
  CheckboxActiveBlue,
  CheckboxActiveOrange,
  CheckboxEmpty,
} from '@jeiltodo/icons';
import { ChangeEvent, InputHTMLAttributes } from 'react';

interface CheckBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
  isGroup?: boolean;
  className?: string;
}

export const Checkbox = ({
  onChange,
  isChecked,
  className,
  isGroup = false,
  disabled = false,
  readOnly = false,
  required = false,
  placeholder,
  maxLength,
  minLength,
  'aria-label': ariaLabel,
  ...rest
}: CheckBoxProps) => {
  return (
    <label className='relative inline-flex w-6 h-6 items-center justify-center cursor-pointer'>
      <input
        aria-label={ariaLabel}
        checked={isChecked}
        className='absolute w-0 h-0 opacity-0 pointer-events-none appearance-none'
        disabled={disabled}
        onChange={onChange}
        required={required}
        type='checkbox'
      />
      <div className="absolute inset-0">
        {!disabled && isChecked ? (
          isGroup ? (
            <CheckboxActiveOrange aria-hidden='true' height={24} width={24} />
          ) : (
            <CheckboxActiveBlue aria-hidden='true' height={24} width={24} />
          )
        ) : (
          <CheckboxEmpty
            aria-hidden='true'
            className={isGroup ? 'text-groupColor-500' : 'text-blue-600'}
            height={24}
            width={24}
          />
        )}
      </div>
      {disabled ? <span className='absolute w-[18px] h-[18px] bg-slate-100 border border-slate-200 rounded-md' /> : null}
    </label>
  );
};
