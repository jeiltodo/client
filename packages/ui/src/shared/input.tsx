'use client';

import { ChangeEvent, InputHTMLAttributes } from 'react';

type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: InputType;
  value?: string | number;
  className?: string;
}

export const Input = ({
  type,
  onChange,
  value,
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
    <input
      type={type}
      readOnly={readOnly}
      value={value}
      onChange={onChange}
      className={`text-base text-slate-800 placeholder-slate-400 rounded-xl py-3 px-6 hover:border hover:border-blue-300 focus:border focus:border-blue-500 bg-slate-50 focus:outline-none ${className}`}
      maxLength={maxLength}
      minLength={minLength}
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      aria-label={ariaLabel}
      {...rest}
    />
  );
};
