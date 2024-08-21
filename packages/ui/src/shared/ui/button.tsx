import { ButtonHTMLAttributes, MouseEvent } from 'react';

type Variant =
  | 'default'
  | 'primary'
  | 'dark'
  | 'outline'
  | 'outline-no-border'
  | 'group-dark'
  | 'group-outline'
  | 'outline-date'
  | 'outline-status'
  | 'outline-goal'
  | 'outline-dark'
  | 'rounded-white'
  | 'rounded-outline-blue'
  | 'text-gray'
  | 'text-blue'
  | 'text-group-color'
  | 'success'
  | 'warning'
  | 'error';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; // button 색상
  isDisabled?: boolean; //disabled 인지
  isSelected?: boolean; //select된 버튼인지
  isSelectDuplicated?: boolean; //중복select된 버튼인지
  width?: number; //버튼 너비
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface ButtonGroupProps {
  children:
    | React.ReactElement<typeof Button>
    | React.ReactElement<typeof Button>[];
  gap?: number;
}

const voidFn = (): void => {
  // 빈함수
};

const addClass = (className: string): string => {
  let addedClassName = className;
  if (!addedClassName.includes('h-')) {
    addedClassName += ' h-12';
  }
  return addedClassName;
};

export function Button({
  children,
  variant = 'primary',
  isDisabled = false,
  isSelected = false,
  isSelectDuplicated = false,
  className,
  onClick,
  ...props
}: ButtonProps): React.ReactElement {
  const baseClasses =
    'font-pretendard-medium text-base transition-all duration-300 ease-in-out cursor';

  const variantClasses = {
    default:
      'bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-800',
    primary:
      'bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-800',
    dark: 'bg-slate-900 px-[10px] text-white rounded-xl hover:bg-slate-600 active:bg-slate-800',
    outline:
      'bg-transparent text-blue-500 border border-blue-500 rounded-xl hover:border-blue-600 hover:text-blue-600 active:border-blue-800 active:text-blue-800',
    'outline-no-border':
      'bg-transparent rounded-xl hover:text-groupColor-600 active:border-groupColor-800 active:text-groupColor-800',
    'group-outline':
      'bg-transparent text-groupColor-500 border border-groupColor-500 rounded-xl hover:border-groupColor-600 hover:text-groupColor-600 active:border-groupColor-800 active:text-groupColor-800',
    'group-dark':
      'text-white rounded-xl bg-groupColor-900 hover:bg-groupColor-950 active:bg-groupColor-950',
    'outline-date':
      'bg-transparent text-blue-500 border border-blue-500 rounded-[8px] hover:border-blue-600 hover:text-blue-600 active:border-blue-800 active:text-blue-800',
    'outline-status':
      'bg-transparent text-slate-800 border border-slate-200 rounded-[8px] hover:border-blue-600 hover:text-blue-600 active:border-blue-800 active:text-blue-800',
    'outline-goal':
      'bg-transparent text-slate-800 border border-slate-200 rounded-[99px] hover:border-blue-500 active:border-blue-100',
    'outline-dark':
      'bg-transparent text-slate-800 border border-slate-800 rounded-[12px] hover:border-slate-900 active:border-slate-900',
    'rounded-white':
      'text-slate-700 rounded-full bg-white hover:text-slate-800',
    'rounded-outline-blue':
      'border border-[1px] border-blue-500 rounded-full text-blue-500 bg-white hover:border-blue-600 hover:text-blue-600 active:border-blue-800 active:text-blue-800',
    'text-gray': 'text-slate-600 hover:text-slate-700 active:text-slate-800',
    'text-group-color':
      'text-groupColor-600 hover:text-groupColor-800 active:text-groupColor-900',
    'text-blue':
      'text-blue-500 hover:text-blue-600 active:text-blue-800 active:border-none',
    success:
      'bg-transparent text-blue-500 border border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white',
    warning:
      'bg-transparent text-blue-500 border border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white',
    error:
      'bg-transparent text-blue-500 border border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white',
  };
  const buttonClasses = `
  items-center justify-center
  ${baseClasses}
  ${variantClasses[variant]}
  ${isDisabled && variant !== 'outline' && variant !== 'rounded-outline-blue' ? 'disabled:bg-slate-400 cursor' : ''}
  ${isDisabled && (variant === 'outline' || variant === 'rounded-outline-blue') ? 'disabled:text-slate-400 disabled:border-slate-400' : ''}
  ${isDisabled && variant === 'text-blue' ? 'disabled:text-slate-400 disabled:bg-transparent' : ''}
  ${isSelected && (variant === 'outline-date' || variant === 'outline-status') ? '!bg-blue-500  text-white hover:text-white active:border-blue-800 active:bg-blue-800 active:text-white' : ''}
  ${isSelectDuplicated && variant === 'outline-goal' ? '!bg-blue-100 border !border-blue-500 active:border-blue-800 active:bg-blue-800' : ''}
  ${className ? addClass(className) : ''}
`
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <button
      className={buttonClasses}
      {...props}
      style={{ outline: 'none', boxShadow: 'none' }}
      onClick={onClick ? onClick : voidFn}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export const ButtonGroup = ({ children, gap = 2 }: ButtonGroupProps) => {
  const gapClass = `gap-${gap}`;
  return <div className={`flex flex-wrap ${gapClass}`}>{children}</div>;
};
