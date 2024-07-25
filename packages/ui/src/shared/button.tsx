import { ButtonHTMLAttributes } from 'react';

type Variant = 'default' | 'primary' |'secondary' |'outline' | 'success' | 'warning' | 'error';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; // button 색상
  size?: Size; // 버튼 크기
  fullWidth?: boolean; // 부모의 full-width를 차지할 것인지
  isDisabled?: boolean; //disabled 인지
}

export const Button = ({ 
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isDisabled = false,
  className,
  ...props
}: ButtonProps) => {
  const baseClasses = 'font-bold rounded transition-all duration-300 ease-in-out focus:outline-none';

  const variantClasses = {
    'default': 'bg-blue-500 text-white hover:bg-blue-600',
    'primary': 'bg-blue-500 text-white hover:bg-blue-600',
    'secondary': 'bg-gray-500 text-white hover:bg-gray-600',
    'outline': 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white',
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
  ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
  ${className || ''}
`
// `.trim().replace(/\s+/g, ' ');

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;