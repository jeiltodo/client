import { calculateTotalPages, Pagination } from '@jeiltodo/ui/shared';
import { useTableContext } from '../../../shared';

interface GroupManagementDetailPaginationProps {
  totalCount: number;
  currentPage: number;
}

export const GroupManagementDetailPagination = ({
  totalCount,
  currentPage,
}: GroupManagementDetailPaginationProps) => {
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
      onClickPage={handleClickPage}
      onPrev={handlePrevPage}
      onNext={handleNextPage}
      totalCount={totalCount}
      limit={Number(tableFilters.limit)}
      currentPage={currentPage}
    />
  );
};
