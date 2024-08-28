'use client';

import { LayoutTitle, LoadingSpinner, useToast } from '@jeiltodo/ui/shared';
import { GroupsManagementTable } from '../../../widgets/group';
import {
  SearchFilter,
  TableToolBarWithCheck,
  useTableContext,
} from '../../../shared';
import {
  GROUP_SEARCH_FILTERS,
  Groups,
  useDeleteGroups,
  useSearchGroups,
} from '../../../entities/group';
import { GroupManagementPagination } from '../../../features/group';
import { useMemo } from 'react';
import { sortBy, SortOptions } from '../../../shared/lib/sortBy';
import { TableCheckListProvider } from '../../../shared/model/table/table-checklist-provider';

// eslint-disable-next-line react/function-component-definition
export const GroupManagementPage = () => {
  const { tableFilters, tableSort } = useTableContext();
  const { data, isLoading } = useSearchGroups(tableFilters);
  const deleteGroupMutation = useDeleteGroups();
  const showToast = useToast();
  const sortedGroups = useMemo(() => {
    return sortBy<Groups>(data?.groups || [], tableSort as SortOptions<Groups>);
  }, [data?.groups, tableSort]);

  const handleDelete = (ids: number[]) => {
    if (ids.length === 0) {
      showToast({
        message: '체크된 항목이 없습니다.',
        type: 'confirm',
      });
    } else {
      deleteGroupMutation.mutate(ids);
    }
  };
  if (isLoading || !data) return <LoadingSpinner />;
  return (
    <div className='w-[930px]'>
      <h1 className='sr-only'>
        jtodo 서비스의 그룹 도메인을 조회, 삭제할 수 있는 관리 페이지입니다.
      </h1>
      <LayoutTitle title='그룹 관리' isFirstPage={true} />
      <SearchFilter filters={GROUP_SEARCH_FILTERS} />
      <div className='w-full pb-[16px] px-5 bg-white rounded-xl mt-5'>
        <TableCheckListProvider tableData={data.groups}>
          <TableToolBarWithCheck
            onDelete={handleDelete}
            totalCount={data.totalCount}
            searchedCount={data.searchCount || 0}
          />
          {sortedGroups ? (
            <GroupsManagementTable groups={sortedGroups} />
          ) : (
            <LoadingSpinner />
          )}
        </TableCheckListProvider>
        <GroupManagementPagination
          totalCount={
            tableFilters.title || tableFilters.nickname
              ? data.searchCount
              : data.totalCount
          }
          currentPage={data.current_page}
        />
      </div>
    </div>
  );
};
