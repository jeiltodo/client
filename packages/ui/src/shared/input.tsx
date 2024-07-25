'use client';

import { ChangeEvent, InputHTMLAttributes } from 'react';

type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
  type: InputType;
  value: string;
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type={type}
      readOnly={readOnly}
      value={value}
      onChange={handleChange}
      className={className}
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
