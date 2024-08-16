import { ArrowLeft, ArrowRight } from '@jeiltodo/icons';

interface Props {
  totalCount: number;
  limit: number;
  currentPage: number;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Pagination({
  totalCount,
  limit,
  currentPage,
  variant = 'primary',
  className,
}: Props) {
  const pageCount = totalCount / limit;
  const restCount = totalCount % limit;

  const handleClickPrev = () => {};

  const handleClickNext = () => {};
  return (
    <div
      className={`flex w-full justify-center items-center gap-2 my-4 ${className}`}
    >
      <ArrowLeft
        width={24}
        height={24}
        className='mr-1 cursor-pointer'
        onClick={handleClickPrev}
      />
      {Array.from({ length: pageCount < 1 ? 1 : pageCount }).map((_, idx) => (
        <span
          className={`cursor-pointer inline-flex justify-center items-center w-5 h-5 text-sm font-medium rounded-md ${currentPage === idx + 1 ? (variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500') : variant === 'primary' ? 'text-slate-400 ' : 'text-slate-950'} `}
        >
          {idx + 1}
        </span>
      ))}
      <ArrowRight
        width={24}
        height={24}
        className='ml-1 cursor-pointer'
        onClick={handleClickNext}
      />
    </div>
  );
}
