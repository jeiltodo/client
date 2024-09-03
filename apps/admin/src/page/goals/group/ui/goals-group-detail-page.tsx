'use client';
import { useMemo } from 'react';
import { LayoutTitle, LoadingSpinner, useToast } from '@jeiltodo/ui/shared';
import { useParams, useSearchParams } from 'next/navigation';
import { TableToolBarWithCheck, useTableContext } from '../../../../shared';
import type { SortOptions } from '../../../../shared/lib/sortBy';
import { sortBy } from '../../../../shared/lib/sortBy';
import { TablePagination } from '../../../../features/goals/individual';
import type { GroupGoalTodos } from '../../../../entities/goals/group';
import {
  useDeleteGroupGoalTodos,
  useGetAllGroupGoalTodos,
} from '../../../../entities/goals/group';
import { GoalTodosGroupTable } from '../../../../widgets/goals/group';
import { TableCheckListProvider } from '../../../../shared/model/table/table-checklist-provider';

export function PostsGroupDetailPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const goalId = Number(
    Array.isArray(params.goalId) ? params.goalId[0] : params.goalId
  );
  const goalTitle = searchParams.get('title') || '';
  const showToast = useToast();
  const { tableFilters, tableSort } = useTableContext();
  const { data, isLoading } = useGetAllGroupGoalTodos(tableFilters, goalId);

  const sortedTodos = useMemo(() => {
    return sortBy<GroupGoalTodos>(
      data?.todos || [],
      tableSort as SortOptions<GroupGoalTodos>
    );
  }, [data?.todos, tableSort]);

  const deleteGroupGoalTodosMutation = useDeleteGroupGoalTodos();

  const handleDelete = (ids: number[]) => {
    if (ids.length === 0) {
      showToast({
        message: '체크된 항목이 없습니다.',
        type: 'confirm',
      });
    } else {
      deleteGroupGoalTodosMutation.mutate(ids);
    }
  };

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
            searchedCount={data.totalCount}
            totalCount={data.totalCount}
          />
          {sortedTodos.length > 0 ? (
            <GoalTodosGroupTable goalTitle={goalTitle} todos={sortedTodos} />
          ) : (
            <LoadingSpinner />
          )}
        </TableCheckListProvider>
        <TablePagination
          currentPage={data.currentPage}
          totalCount={data.totalCount}
        />
      </div>
    </div>
  );
}
