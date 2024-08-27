'use client';

import { LayoutTitle, LoadingSpinner } from '@jeiltodo/ui/shared';
import { MembersTable } from '../../../widgets/members/ui/members-table';
import { SearchFilter, TableToolBar, useTableContext } from '../../../shared';
import { MEMBERS_FIILTERS } from '../../../entities/member/constants/members-filters';
import { TablePagination } from '../../../features/goals/individual';
import { useGetMembers } from '../../../entities/member/hooks/useGetMembers';
import { useMemo } from 'react';
import { Member } from '../../../entities/member';
import { sortBy, SortOptions } from '../../../shared/lib/sortBy';

export const MemberManagementPage = () => {
  const { tableFilters, tableSort } = useTableContext();
  const { data, isLoading } = useGetMembers(tableFilters);
  const sortedMembers = useMemo(() => {
    return sortBy<Member>(
      data?.members || [],
      tableSort as SortOptions<Member>
    );
  }, [data?.members, tableSort]);

  if (isLoading || !data) return <LoadingSpinner />;

  const onHandleDelete = () => {};
  return (
    <div>
      <h1 className='sr-only'>
        jtodo 서비스의 회원을 조회, 삭제할 수 있는 관리 페이지입니다.
      </h1>
      <LayoutTitle title='회원 관리' />

      <SearchFilter filters={MEMBERS_FIILTERS} />

      <div className='w-[930px] pb-[16px] px-5 bg-white rounded-xl mt-5 relative'>
        <TableToolBar
          onClickDelete={onHandleDelete}
          totalCount={data?.totalCount}
          searchedCount={data?.searchedCount}
        />
        {sortedMembers || data.members ? (
          <MembersTable members={sortedMembers} />
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
