import { BackButton } from "./back-button";

interface LayoutTitleProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export const LayoutTitle = ({
  title,
  children,
  className,
}: LayoutTitleProps) => {
  return (
    <div
      className={`flex flex-row items-center justify-between mb-[16px] ${className}`}
    >
      <div className='flex items-center justify-start gap-2'>
        <BackButton />
        <h2 className='font-pretendard-semibold text-lg'>{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};
