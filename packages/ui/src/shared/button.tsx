import { ButtonHTMLAttributes } from 'react';
import '../../dist/index.css';

type Variant = 'default' | 'primary' |'rounded' |'outline' | 'success' | 'warning' | 'error';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; // button 색상
  size?: Size; // 버튼 크기
  fullWidth?: boolean; // 부모의 full-width를 차지할 것인지
  isDisabled?: boolean; //disabled 인지
  onClick?: () => void;
}

const voidFn = () => {
  // 빈함수
};

export const Button = ({ 
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isDisabled = false,
  className,
  onClick,
  ...props
}: ButtonProps) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 ease-in-out focus:outline-none m-6';

  const variantClasses = {
    'default': 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-600',
    'primary': 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-600',
    'outline': 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white',
    'rounded': 'border bg-gray-500 text-white hover:bg-gray-600',
    'success': 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white',
    'warning': 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white',
    'error': 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white',
  };

  const sizeClasses = {
    'sm': 'px-3 py-1 text-sm',
    'md': 'px-4 py-2 text-base',
    'lg': 'px-6 py-3 text-lg',
    'xl': 'px-8 py-4 text-xl',
  };

  const buttonClasses = `
  ${baseClasses}
  ${variantClasses[variant]}
  ${sizeClasses[size]}
  ${fullWidth ? 'w-full' : ''}
  ${isDisabled ? 'bg-slate-400 cursor-not-allowed no-hover' : ''}
  ${className || ''}
`
// `.trim().replace(/\s+/g, ' ');

  return (
    <button className={buttonClasses} {...props} onClick={onClick ? onClick : voidFn}>
      {children}
    </button>
  );
};

export default Button;