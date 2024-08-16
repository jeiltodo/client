interface TodoTitleProps {
  title: string;
  className?: string;
}
export const TodoTitle = ({ title, className }: TodoTitleProps) => {
  return (
    <div className={`${className}`}>
      <span className='inline-block bg-slate-100 rounded text-xs font-pretendard-medium h-[20px] px-[3px] py-[2px] mr-[8px]'>
        To do
      </span>
      <span className='text-sm'>{title}</span>
    </div>
  );
};
