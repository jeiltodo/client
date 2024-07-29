'use client';

import { ChangeEvent, InputHTMLAttributes } from 'react';

type InputType = 'checkbox';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
  className?: string;
}

const Checkbox = ({
  onChange,
  isChecked,
  className,
  disabled = false,
  readOnly = false,
  required = false,
  placeholder,
  maxLength,
  minLength,
  'aria-label': ariaLabel,
  ...rest
}: Props) => {
  return (
    <label
      className={`inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className={`relative w-6 h-6 ${className}`} aria-hidden='true'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={onChange}
          className='sr-only'
          disabled={disabled}
          required={required}
          aria-label={ariaLabel}
        />
        <div
          className={`absolute inset-0 border-2 rounded-md transition-colors`}
        >
          {isChecked && (
            <svg
              className='w-full h-full text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
          )}
        </div>
      </div>
    </label>
  );
};

export default Checkbox;
