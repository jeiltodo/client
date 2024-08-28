'use client';

import { TablePagination } from '../../../../features/goals/individual';
import {
  SearchFilter,
  TableToolBarWithCheck,
  useTableContext,
} from '../../../../shared';
import { LayoutTitle, LoadingSpinner } from '@jeiltodo/ui/shared';
import { sortBy, SortOptions } from '../../../../shared/lib/sortBy';
import { useMemo } from 'react';
import {
  GroupGoals,
  useGetAllGroupGoals,
} from '../../../../entities/goals/group';
import { GOALS_GROUP_FIILTERS } from '../../../../entities/goals/group/constants/goals-group-filters';
import { GoalsGroupTable } from '../../../../widgets/goals/group/ui/goal-group-table';
import { TableToolBar } from '../../../../shared/ui/@x/table-toolbar/table-toobar';

export const PostsGroupPage = () => {
  const { tableFilters, tableSort } = useTableContext();

  const { data, isLoading } = useGetAllGroupGoals(tableFilters);

  const sortedGoals = useMemo(() => {
    return sortBy<GroupGoals>(
      data?.goals || [],
      tableSort as SortOptions<GroupGoals>
    );
  }, [data?.goals, tableSort]);

  if (isLoading || !data) return <LoadingSpinner />;

  return (
    <div>
      <h1 className='sr-only'>
        jtodo 서비스의 그룹 도메인을 조회, 삭제할 수 있는 관리 페이지입니다.
      </h1>
      <LayoutTitle title='게시글 관리 - 그룹 게시글' />

      <SearchFilter filters={GOALS_GROUP_FIILTERS} />
      <div className='w-[930px] pb-[16px] px-5 bg-white rounded-xl mt-5 relative'>
        <TableToolBarWithCheck
          totalCount={data?.totalCount}
          searchedCount={data?.searchedCount}
        />
        {sortedGoals ? (
          <GoalsGroupTable goals={sortedGoals} />
        ) : (
          <LoadingSpinner />
        )}
        <TablePagination
          totalCount={data.searchedCount}
          currentPage={data.currentPage}
        />
      </div>
    </div>
  );
};
