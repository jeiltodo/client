'use client';

import { LayoutTitle, LoadingSpinner } from '@jeiltodo/ui/shared';
import { GroupsManagementTable } from '../../../widgets/group';
import { SearchFilter, TableToolBar, useTableContext } from '../../../shared';
import { GROUP_SEARCH_FILTERS, useSearchGroups } from '../../../entities/group';
import { GroupManagementPagination } from '../../../features/group';

export const GroupManagementPage = () => {
  const { tableFilters } = useTableContext();
  const { data, isLoading } = useSearchGroups(tableFilters);

  if (isLoading || !data) return <LoadingSpinner />;

  const onHandleDelete = () => {};

  return (
    <div className='w-[920px]'>
      <h1 className='sr-only'>
        jtodo 서비스의 그룹 도메인을 조회, 삭제할 수 있는 관리 페이지입니다.
      </h1>
      <LayoutTitle title='그룹 관리' />
      <SearchFilter filters={GROUP_SEARCH_FILTERS} />
      <div className='w-full pb-[16px] px-5 bg-white rounded-xl mt-5'>
        <TableToolBar
          onClickDelete={onHandleDelete}
          totalCount={data.totalCount}
          searchedCount={data.searchedCount}
        />
        <GroupsManagementTable groups={data.groups} />

        <GroupManagementPagination
          totalCount={data.totalCount}
          currentPage={data.currentPage}
        />
      </div>
    </div>
  );
};
