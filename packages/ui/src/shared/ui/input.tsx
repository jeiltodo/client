'use client';

import { ChangeEvent, InputHTMLAttributes } from 'react';

type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'date';

interface InputProps
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
}: InputProps) => {
  return (
    <input
      aria-label={ariaLabel}
      className={`text-base text-slate-800  placeholder-slate-400 rounded-xl py-3 px-6 border border-slate-50 font-pretendard-regular placeholder:font-pretendard-regular hover:border-blue-300 focus:border-blue-500 bg-slate-50 focus:outline-none ${className}`}
      disabled={disabled}
      maxLength={maxLength}
      minLength={minLength}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      type={type}
      value={value}
      {...rest}
    />
  );
};
