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
        type='checkbox'
        checked={isChecked}
        onChange={onChange}
        className='absolute w-0 h-0 opacity-0 pointer-events-none appearance-none'
        disabled={disabled}
        required={required}
        aria-label={ariaLabel}
      />
      <div className={`absolute inset-0`}>
        {!disabled && isChecked ? (
          isGroup ? (
            <CheckboxActiveOrange width={24} height={24} aria-hidden='true' />
          ) : (
            <CheckboxActiveBlue width={24} height={24} aria-hidden='true' />
          )
        ) : (
          <CheckboxEmpty
            width={24}
            height={24}
            aria-hidden='true'
            className='text-blue-600'
          />
        )}
      </div>
      {disabled && (
        <span className='absolute w-6 h-6 bg-slate-100 border border-slate-200 rounded-md'></span>
      )}
    </label>
  );
};
