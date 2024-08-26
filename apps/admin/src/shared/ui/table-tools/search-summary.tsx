interface SearchSummaryProps {
  totalCount: number;
  searchedCount: number;
  className?: string;
}

export function SearchSummary({
  totalCount,
  searchedCount,
  className,
}: SearchSummaryProps) {
  return (
    <div className={className}>
      {searchedCount === 0 ? (
        <span className='text-slate-800 font-medium text-xs'>
          전체 : {totalCount}명
        </span>
      ) : (
        <div className='flex items-center gap-x-2'>
          <span className='text-slate-800 font-medium text-xs'>
            전체 : {totalCount}명
          </span>
          <span className='w-px h-3 bg-slate-600'></span>
          <span className='text-slate-800 font-medium text-xs'>
            검색결과 : {searchedCount}명
          </span>
        </div>
      )}
    </div>
  );
}