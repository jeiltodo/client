'use client';

import { LayoutTitle, LoadingSpinner, useToast } from '@jeiltodo/ui/shared';
import { useMemo } from 'react';
import { GOALS_INDIVIDUAL_FILTERS } from '../../../../entities/goals/individual/constants';
import {
  useDeleteIndividualGoal,
  useGetAllIndividualGoals,
} from '../../../../entities/goals/individual/hooks/useIndividualGoals';
import { TablePagination } from '../../../../features/goals/individual';
import {
  SearchFilter,
  TableToolBarWithCheck,
  useTableContext,
} from '../../../../shared';
import { GoalsIndividualTable } from '../../../../widgets/goals/individual';
import type { SortOptions } from '../../../../shared/lib/sortBy';
import { sortBy } from '../../../../shared/lib/sortBy';
import type { IndividualGoal } from '../../../../entities/goals/individual/model';
import { TableCheckListProvider } from '../../../../shared/model/table/table-checklist-provider';

export function PostsIndividualPage() {
  const { tableFilters, tableSort } = useTableContext();
  const { data, isLoading } = useGetAllIndividualGoals(tableFilters);
  const showToast = useToast();
  const sortedGoals = useMemo(() => {
    return sortBy<IndividualGoal>(
      data?.goals || [],
      tableSort as SortOptions<IndividualGoal>
    );
  }, [data?.goals, tableSort]);

  const deleteIndividualGoalMutation = useDeleteIndividualGoal();

  const handleDelete = (ids: number[]) => {
    if (ids.length === 0) {
      showToast({
        message: '체크된 항목이 없습니다.',
        type: 'confirm',
      });
    } else {
      deleteIndividualGoalMutation.mutate(ids);
    }
  };
  if (isLoading || !data) return <LoadingSpinner />;

  return (
    <div>
      <h1 className='sr-only'>
        jtodo 서비스의 그룹 도메인을 조회, 삭제할 수 있는 관리 페이지입니다.
      </h1>
      <LayoutTitle isFirstPage title='게시글 관리 - 개인 게시글' />

      <SearchFilter filters={GOALS_INDIVIDUAL_FILTERS} />
      <div className='w-[930px] pb-[16px] px-5 bg-white rounded-xl mt-5 relative'>
        <TableCheckListProvider tableData={data.goals}>
          <TableToolBarWithCheck
            onDelete={handleDelete}
            searchedCount={data.searchedCount}
            totalCount={data.totalCount}
          />
          {sortedGoals.length > 0 ? (
            <GoalsIndividualTable goals={sortedGoals} />
          ) : (
            <LoadingSpinner />
          )}
        </TableCheckListProvider>
        <TablePagination
          currentPage={data.currentPage}
          totalCount={data.searchedCount}
        />
      </div>
    </div>
  );
}
