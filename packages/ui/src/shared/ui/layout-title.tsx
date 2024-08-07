interface LayoutTitleProps {
  title: string;
  children?: React.ReactNode;
}

export const LayoutTitle = ({ title, children }: LayoutTitleProps) => {
  return (
    <div className='flex flex-row items-center justify-between mb-[16px] tablet:flex tablet:pt-[24px] mobile:hidden'>
      <h2 className='font-pretendard-semibold text-lg'>{title}</h2>
      <div>{children}</div>
    </div>
  );
};
