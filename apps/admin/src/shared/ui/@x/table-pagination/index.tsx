import { calculateTotalPages, Pagination } from '@jeiltodo/ui/shared';
import { useTableContext } from '../../..';

interface TablePaginationProps {
  totalCount: number;
  currentPage: number;
}

export function TablePagination({
  totalCount,
  currentPage,
}: TablePaginationProps) {
  const { tableFilters, setTableFilters } = useTableContext();
  const handleNextPage = () => {
    const totalPages = calculateTotalPages(
      totalCount,
      Number(tableFilters.limit)
    );
    currentPage !== totalPages &&
      setTableFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const handlePrevPage = () => {
    currentPage !== 1 &&
      setTableFilters((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const handleClickPage = (nextPageNum: number) => {
    setTableFilters((prev) => ({ ...prev, page: nextPageNum }));
  };
  return (
    <Pagination
      currentPage={currentPage}
      limit={Number(tableFilters.limit)}
      onClickPage={handleClickPage}
      onNext={handleNextPage}
      onPrev={handlePrevPage}
      totalCount={totalCount}
    />
  );
}
