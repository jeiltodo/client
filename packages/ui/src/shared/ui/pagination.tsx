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
    } 
      return isGr ? 'bg-white text-groupColor-500' : 'bg-white text-blue-500';
    
  };

  return (
    <div
      className={`flex w-full justify-center items-center gap-2 my-4 ${className}`}
    >
      <ArrowLeft
        className='mr-1 cursor-pointer'
        height={24}
        onClick={onPrev}
        width={24}
      />
      {Array.from({ length: pageCount < 1 ? 1 : pageCount }).map((_, idx) => (
        <button
          className={`cursor-pointer inline-flex justify-center items-center w-5 h-5 text-sm font-medium rounded-md ${currentPage === idx + 1 ? getClassNames(variant, isGroup) : variant === 'primary' ? 'text-slate-400 ' : 'text-slate-950'} `}
          key={idx}
          onClick={() => {
            onClickPage(idx + 1);
          }}
          type='button'
        >
          {idx + 1}
        </button>
      ))}
      <ArrowRight
        className='ml-1 cursor-pointer'
        height={24}
        onClick={onNext}
        width={24}
      />
    </div>
  );
}
