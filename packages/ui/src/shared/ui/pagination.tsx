import { ArrowLeft, ArrowRight } from '@jeiltodo/icons';
import { calculateTotalPages } from '../lib/calculateTotalPages';

interface PaginationProps {
  totalCount: number;
  limit: number;
  currentPage: number;
  onNext: () => void;
  onPrev: () => void;
  onClickPage: (nextPage: number) => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  isGroup?: boolean;
}

export function Pagination({
  totalCount,
  limit,
  currentPage,
  onPrev,
  onNext,
  onClickPage,
  variant = 'primary',
  className,
  isGroup = false,
}: PaginationProps) {
  const pageCount = calculateTotalPages(totalCount, limit);

  const getClassNames = (vari: string, isGr: boolean): string => {
    if (vari === 'primary') {
      return isGr ? 'bg-groupColor-500 text-white' : 'bg-blue-500 text-white';
    } else {
      return isGr ? 'bg-white text-groupColor-500' : 'bg-white text-blue-500';
    }
  };

  return (
    <div
      className={`flex w-full justify-center items-center gap-2 my-4 ${className}`}
    >
      <ArrowLeft
        width={24}
        height={24}
        className='mr-1 cursor-pointer'
        onClick={onPrev}
      />
      {Array.from({ length: pageCount < 1 ? 1 : pageCount }).map((_, idx) => (
        <button
          type='button'
          key={idx}
          className={`cursor-pointer inline-flex justify-center items-center w-5 h-5 text-sm font-medium rounded-md ${currentPage === idx + 1 ? getClassNames(variant, isGroup) : variant === 'primary' ? 'text-slate-400 ' : 'text-slate-950'} `}
          onClick={() => {
            onClickPage(idx + 1);
          }}
        >
          {idx + 1}
        </button>
      ))}
      <ArrowRight
        width={24}
        height={24}
        className='ml-1 cursor-pointer'
        onClick={onNext}
      />
    </div>
  );
}
