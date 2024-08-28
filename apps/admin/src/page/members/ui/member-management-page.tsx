'use client';

import { LayoutTitle, LoadingSpinner, useToast } from '@jeiltodo/ui/shared';
import { MembersTable } from '../../../widgets/members/ui/members-table';
import {
  SearchFilter,
  TableToolBarWithCheck,
  useTableContext,
} from '../../../shared';
import { MEMBERS_FIILTERS } from '../../../entities/member/constants/members-filters';
import { TablePagination } from '../../../features/goals/individual';
import { useGetMembers } from '../../../entities/member/hooks/useGetMembers';
import { useMemo } from 'react';
import { Member } from '../../../entities/member';
import { sortBy, SortOptions } from '../../../shared/lib/sortBy';
import { TableCheckListProvider } from '../../../shared/model/table/table-checklist-provider';
import { useDeleteMembers } from '../../../entities/member/hooks/useDeleteMembers';

export const MemberManagementPage = () => {
  const showToast = useToast();
  const { tableFilters, tableSort } = useTableContext();
  const { data, isLoading } = useGetMembers(tableFilters);
  const { mutate: deleteMembers } = useDeleteMembers();

  const sortedMembers = useMemo(() => {
    return sortBy<Member>(
      data?.members || [],
      tableSort as SortOptions<Member>
    );
  }, [data?.members, tableSort]);

  const handleDelete = (ids: number[]) => {
    if (ids.length === 0) {
      showToast({
        message: '체크된 항목이 없습니다.',
        type: 'confirm',
      });
    } else {
      deleteMembers(ids);
    }
  };

  if (isLoading || !data || !data.members) return <LoadingSpinner />;

  return (
    <div>
      <h1 className='sr-only'>
        jtodo 서비스의 회원을 조회, 삭제할 수 있는 관리 페이지입니다.
      </h1>
      <LayoutTitle title='회원 관리' isFirstPage />

      <SearchFilter filters={MEMBERS_FIILTERS} />

      <div className='w-[930px] pb-[16px] px-5 bg-white rounded-xl mt-5 relative'>
        <TableCheckListProvider tableData={data.members}>
          <TableToolBarWithCheck
            onDelete={handleDelete}
            totalCount={data?.totalCount}
            searchedCount={data?.searchedCount}
          />
          {sortedMembers || data.members.length !== 0 ? (
            <MembersTable members={sortedMembers} />
          ) : (
            <div className='min-h-[120px] flex justify-center items-center text-lg text-slate-500 font-semibold'>
              회원이 없습니다
            </div>
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
