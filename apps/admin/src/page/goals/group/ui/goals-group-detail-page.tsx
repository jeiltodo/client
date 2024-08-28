'use client';
import { useMemo } from 'react';

import { useTableContext } from '../../../../shared';
import { GoalTodosIndividualTable } from '../../../../widgets/goals/individual';
import { LayoutTitle, LoadingSpinner } from '@jeiltodo/ui/shared';
import { useParams, useSearchParams } from 'next/navigation';
import { sortBy, SortOptions } from '../../../../shared/lib/sortBy';
import { TablePagination } from '../../../../features/goals/individual';
import {
  GroupGoalTodos,
  useGetAllGroupGoalTodos,
} from '../../../../entities/goals/group';
import { GoalTodosGroupTable } from '../../../../widgets/goals/group';
import { TableToolBar } from '../../../../shared/ui/@x/table-toolbar/table-toobar';

export const PostsGroupDetailPage = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const goalId = Array.isArray(params.goalId)
    ? params.goalId[0]
    : params.goalId;
  const goalTitle = searchParams.get('title') || '';

  const { tableFilters, tableSort } = useTableContext();
  const { data, isLoading } = useGetAllGroupGoalTodos(tableFilters, goalId);

  const sortedTodos = useMemo(() => {
    return sortBy<GroupGoalTodos>(
      data?.todos || [],
      tableSort as SortOptions<GroupGoalTodos>
    );
  }, [data?.todos, tableSort]);

  if (isLoading || !data) return <LoadingSpinner />;

  return (
    <div>
      <h1 className='sr-only'>
        jtodo 서비스의 그룹 도메인을 조회, 삭제할 수 있는 관리 페이지입니다.
      </h1>
      <LayoutTitle title={`할 일 관리 (${goalTitle})`} />
      <div className='w-[930px] pb-[16px] px-5 bg-white rounded-xl mt-5 relative'>
        <TableToolBar
          totalCount={data?.totalCount}
          searchedCount={data?.totalCount}
        />
        {sortedTodos ? (
          <GoalTodosGroupTable goalTitle={goalTitle} todos={sortedTodos} />
        ) : (
          <LoadingSpinner />
        )}
        <TablePagination
          totalCount={data.totalCount}
          currentPage={data.currentPage}
        />
      </div>
    </div>
  );
};
