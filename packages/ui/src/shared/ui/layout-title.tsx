import { BackButton } from './back-button';

interface LayoutTitleProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  isFirstPage?: boolean;
}

export function LayoutTitle({
  title,
  children,
  className,
  isFirstPage = false,
}: LayoutTitleProps) {
  return (
    <div
      className={`flex flex-row items-center justify-between mb-[16px] ${className}`}
    >
      <div className='flex items-center justify-start gap-4'>
        {isFirstPage || <BackButton />}
        <h2 className='font-pretendard-semibold text-lg'>{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}
