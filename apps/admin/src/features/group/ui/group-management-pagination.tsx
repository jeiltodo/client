import { calculateTotalPages, Pagination } from '@jeiltodo/ui/shared';
import { useTableContext } from '../../../shared';

interface Props {
  totalCount: number;
  currentPage: number;
}

export const GroupManagementPagination = ({
  totalCount,
  currentPage,
}: Props) => {
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
