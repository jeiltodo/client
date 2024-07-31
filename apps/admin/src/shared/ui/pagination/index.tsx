import { ArrowLeft, ArrowRight } from '@jeiltodo/icons';

interface Props {
  totalCount: number;
  limit: number;
  currentPage: number;
}

export function Pagination({ totalCount, limit, currentPage }: Props) {
  const pageCount = totalCount / limit;
  const restCount = totalCount % limit;

  const handleClickPrev = () => {};

  const handleClickNext = () => {};
  return (
    <div className='flex w-full justify-center items-center gap-2 my-4'>
      <ArrowLeft
        width={24}
        height={24}
        className='mr-1 cursor-pointer'
        onClick={handleClickPrev}
      />
      {Array.from({ length: pageCount < 1 ? 1 : pageCount }).map((_, idx) => (
        <span
          className={`cursor-pointer inline-flex justify-center items-center w-5 h-5 text-sm font-medium rounded-md ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'text-slate-400 '} `}
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
