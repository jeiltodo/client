interface SearchSummaryProps {
  totalCount: number;
  searchedCount?: number;
  className?: string;
}

export function SearchSummary({
  totalCount,
  searchedCount,
  className,
}: SearchSummaryProps) {
  return (
    <div className={className}>
      {searchedCount === totalCount ? (
        <span className='text-slate-800 font-medium text-sm'>
          전체 : {totalCount}
        </span>
      ) : (
        <div className='flex items-center gap-x-2'>
          <span className='text-slate-800 font-medium text-sm'>
            전체 : {totalCount}
          </span>
          <span className='w-px h-3 bg-slate-600'></span>
          <span className='text-slate-800 font-medium text-sm'>
            검색 : {searchedCount}
          </span>
        </div>
      )}
    </div>
  );
}
