'use client';
import { useMemo } from 'react';
import { IndividualGoalTodos } from '../../../../entities/goals/individual';
import { useGetAllIndividualGoalTodos } from '../../../../entities/goals/individual/hooks/useIndividualGoals';
import {
  TableToolBarWithCheck,
  useTableContext,
} from '../../../../shared';
import { GoalTodosIndividualTable } from '../../../../widgets/goals/individual';
import { LayoutTitle, LoadingSpinner } from '@jeiltodo/ui/shared';
import { useParams, useSearchParams } from 'next/navigation';
import { sortBy, SortOptions } from '../../../../shared/lib/sortBy';
import { TablePagination } from '../../../../features/goals/individual';
import { TableCheckListProvider } from '../../../../shared/model/table/table-checklist-provider';

export const PostsIndividualDetailPage = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const goalId = Number(
    Array.isArray(params.goalId) ? params.goalId[0] : params.goalId
  );
  const goalTitle = searchParams.get('title') || '';

  const { tableFilters, tableSort } = useTableContext();
  const { data, isLoading } = useGetAllIndividualGoalTodos(
    tableFilters,
    goalId
  );

  const sortedTodos = useMemo(() => {
    return sortBy<IndividualGoalTodos>(
      data?.todos || [],
      tableSort as SortOptions<IndividualGoalTodos>
    );
  }, [data?.todos, tableSort]);

  const handleDelete = (ids: number[]) => {};
  if (isLoading || !data) return <LoadingSpinner />;

  return (
    <div>
      <h1 className='sr-only'>
        jtodo 서비스의 그룹 도메인을 조회, 삭제할 수 있는 관리 페이지입니다.
      </h1>
      <LayoutTitle title={`할 일 관리 (${goalTitle})`} />
      <div className='w-[930px] pb-[16px] px-5 bg-white rounded-xl mt-5 relative'>
        <TableCheckListProvider tableData={data.todos}>
          <TableToolBarWithCheck
            onDelete={handleDelete}
            totalCount={data?.totalCount}
            searchedCount={data?.totalCount}
          />
          {sortedTodos ? (
            <GoalTodosIndividualTable
              goalTitle={goalTitle}
              todos={sortedTodos}
            />
          ) : (
            <LoadingSpinner />
          )}
        </TableCheckListProvider>
        <TablePagination
          totalCount={data.totalCount}
          currentPage={data.currentPage}
        />
      </div>
    </div>
  );
};
