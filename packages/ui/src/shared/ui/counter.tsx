interface CounterProps {
  data: string[] | string;
  limitNumber: number;
}
export const Counter = ({ data, limitNumber }: CounterProps) => {
  return (
    <div className='text-sm font-pretendard-medium text-right min-w-[48px]'>
      <span className='text-slate-800'>{data ? data.length : 0}</span>&#47;
      <span className='text-blue-500'>{limitNumber}</span>
    </div>
  );
};
