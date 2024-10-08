'use client';

import { useMemo } from 'react';
import type { GroupOverview, GroupTitleOrCode } from '@jeiltodo/ui/entities/group';
import { GroupOverviewBoard } from '@jeiltodo/ui/entities/group';
import type { Goal } from '@jeiltodo/ui/shared';
import {
  BoardTitle,
  LayoutTitle,
  LoadingSpinner,
  MembersBoardProvider,
} from '@jeiltodo/ui/shared';
import { useParams } from 'next/navigation';
import { MembersBoard } from '@jeiltodo/ui/widgets';
import { useGroupDetail, useChangeLeader } from '../../../entities/group/hooks';
import { GroupManagementDetailTable } from '../../../widgets/group';
import { useTableContext } from '../../../shared';
import type { GroupGoals } from '../../../entities/goals/group/model';
import { useGetAllGroupGoals } from '../../../entities/goals/group/hooks';
import type { SortOptions } from '../../../shared/lib/sortBy';
import { sortBy } from '../../../shared/lib/sortBy';
import { GroupManagementDetailPagination } from '../../../features/group';
import {
  useGroupCode,
  useGroupTitleAndCode,
} from '../../../entities/group/hooks/useGroupTitleAndCode';
import { useRemoveMember } from '../../../entities/group/hooks/useRemoveMember';
import { TableToolBar } from '../../../shared/ui/@x/table-toolbar/table-toobar';

export function GroupManagementDetailPage() {
  const params = useParams();
  const groupId = Number(params.id);

  const { tableFilters, tableSort } = useTableContext();
  const { data: newCode } = useGroupCode(groupId);
  const { data: group, isLoading } = useGroupDetail(groupId);
  const { data: groupGoals, isLoading: isGoalsLoading } = useGetAllGroupGoals({
    page: tableFilters.page,
    limit: tableFilters.limit as number,
    groupId,
  });
  const sortedGoals = useMemo(() => {
    return sortBy<GroupGoals>(
      groupGoals?.goals || [],
      tableSort as SortOptions<Goal>
    );
  }, [groupGoals?.goals, tableSort]);

  const { mutate: updateTitleOrCode } = useGroupTitleAndCode(groupId);
  const { mutate: changeLeader } = useChangeLeader(groupId);
  const { mutate: removeMember } = useRemoveMember(groupId);

  const handleSave = (groupBody: GroupTitleOrCode) => {
    updateTitleOrCode(groupBody);
  };

  const handleChangeLeader = (newLeaderId: number) => {
    changeLeader(newLeaderId);
  };

  const handleRemoveMember = (memberId: number) => {
    removeMember(memberId);
  };

  if (isLoading || !group) return <LoadingSpinner />;
  if (isGoalsLoading || !groupGoals) return <LoadingSpinner />;

  const groupOverview: GroupOverview = {
    title: group.title,
    secretCode: group.secretCode,
    createUser: group.createUser,
    members: group.members,
  };
  return (
    <div className='w-[930px]'>
      <h1 className='sr-only'>
        jtodo 서비스의 그룹 도메인을 수정할 수 있는 관리 페이지입니다.
      </h1>
      <LayoutTitle title='그룹 관리' />
      <div className='w-full flex flex-nowrap gap-4 '>
        <GroupOverviewBoard
          group={groupOverview}
          isAdmin
          onSave={handleSave}
          spareCode={newCode ?? ''}
        />

        <MembersBoardProvider>
          <MembersBoard
            isAdmin
            members={group.members}
            onChangeLeader={handleChangeLeader}
            onRemoveMember={handleRemoveMember}
          />
        </MembersBoardProvider>
      </div>

      <div className='w-[930px] pb-[16px] py-4 px-5 bg-white rounded-xl mt-5'>
        <BoardTitle icon='flag' title='그룹 목표' />
        <TableToolBar
          searchedCount={groupGoals.searchedCount}
          totalCount={groupGoals.searchedCount}
        />
        <GroupManagementDetailTable goals={sortedGoals} />
        <GroupManagementDetailPagination
          currentPage={groupGoals.currentPage}
          totalCount={groupGoals.searchedCount}
        />
      </div>
    </div>
  );
}
