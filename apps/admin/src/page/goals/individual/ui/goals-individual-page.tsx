'use client';

import { GOALS_INDIVIDUAL_FIILTERS } from '../../../../entities/goals/individual/constants/goals-individual-filters';
import { useGetAllIndividualGoals } from '../../../../entities/goals/individual/hooks/useIndividualGoals';
import { TablePagination } from '../../../../features/goals/individual';
import {
  SearchFilter,
  TableToolBarWithCheck,
  useTableContext,
} from '../../../../shared';
import { GoalsIndividualTable } from '../../../../widgets/goals/individual';
import { LayoutTitle, LoadingSpinner } from '@jeiltodo/ui/shared';
import { sortBy, SortOptions } from '../../../../shared/lib/sortBy';
import { IndividualGoals } from '../../../../entities/goals/individual';
import { useMemo } from 'react';
import { TableCheckListProvider } from '../../../../shared/model/table/table-checklist-provider';

export const PostsIndividualPage = () => {
  const { tableFilters, tableSort } = useTableContext();
  const { data, isLoading } = useGetAllIndividualGoals(tableFilters);

  const sortedGoals = useMemo(() => {
    return sortBy<IndividualGoals>(
      data?.goals || [],
      tableSort as SortOptions<IndividualGoals>
    );
  }, [data?.goals, tableSort]);

  if (isLoading || !data) return <LoadingSpinner />;

  return (
    <div>
      <h1 className='sr-only'>
        jtodo 서비스의 그룹 도메인을 조회, 삭제할 수 있는 관리 페이지입니다.
      </h1>
      <LayoutTitle title='게시글 관리 - 개인 게시글' />

      <SearchFilter filters={GOALS_INDIVIDUAL_FIILTERS} />
      <div className='w-[930px] pb-[16px] px-5 bg-white rounded-xl mt-5 relative'>
        <TableCheckListProvider tableData={data.goals}>
          <TableToolBarWithCheck
            totalCount={data?.totalCount}
            searchedCount={data?.searchedCount}
          />
          {sortedGoals ? (
            <GoalsIndividualTable goals={sortedGoals} />
          ) : (
            <LoadingSpinner />
          )}
        </TableCheckListProvider>
        <TablePagination
          totalCount={data.searchedCount}
          currentPage={data.currentPage}
        />
      </div>
    </div>
  );
};
