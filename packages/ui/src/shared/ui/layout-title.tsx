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
      <h2 className='font-pretendard-semibold text-lg'>{title}</h2>
      <div>{children}</div>
    </div>
  );
};
