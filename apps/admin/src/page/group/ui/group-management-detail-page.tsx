'use client';

import { MembersBoard } from '../../../../../../packages/ui/src/widgets/group/ui/members-board';
import type { GroupTitleOrCode } from '@jeiltodo/ui/entities';
import { GroupOverviewBoard } from '@jeiltodo/ui/entities';
import {
  BoardTitle,
  Goal,
  LayoutTitle,
  LoadingSpinner,
  MembersBoardProvider,
} from '@jeiltodo/ui/shared';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useGroupDetail } from '../../../entities/group';
import { userOptions } from '../../../entities/member/hooks/userOptions';
import { GroupManagementDetailTable } from '../../../widgets/group';
import { TableToolBar, useTableContext } from '../../../shared';
import { GroupGoals, useGetAllGroupGoals } from '../../../entities/goals/group';
import { useMemo } from 'react';
import { sortBy, SortOptions } from '../../../shared/lib/sortBy';
import { GroupManagementDetailPagination } from '../../../features/group';
import { useChangeLeader } from '../../../entities/group';
import {
  useGroupCode,
  useGroupTitleAndCode,
} from '../../../entities/group/hooks/useGroupTitleAndCode';
import { useRemoveMember } from '../../../entities/group/hooks/useRemoveMember';

// eslint-disable-next-line react/function-component-definition
export const GroupManagementDetailPage = () => {
  const params = useParams();
  const groupId = Number(params?.id);

  const { tableFilters, tableSort } = useTableContext();
  const { data: user } = useQuery(userOptions());
  const { data: newCode } = useGroupCode(groupId);
  const { data: group, isLoading } = useGroupDetail(groupId);
  const { data: groupGoals, isLoading: isGoalsLoading } = useGetAllGroupGoals({
    page: tableFilters.page,
    limit: tableFilters.limit as number,
    groupId: groupId,
  });
  const sortedGoals = useMemo(() => {
    return sortBy<GroupGoals>(
      groupGoals?.data.goals || [],
      tableSort as SortOptions<Goal>
    );
  }, [groupGoals?.data.goals, tableSort]);

  const { mutate: updateTitleOrCode } = useGroupTitleAndCode(groupId);
  const { mutate: changeLeader } = useChangeLeader(groupId);
  const { mutate: removeMember } = useRemoveMember(groupId);

  const onHandleDelete = () => {};

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

  return (
    <div className='w-[920px]'>
      <h1 className='sr-only'>
        jtodo 서비스의 그룹 도메인을 수정할 수 있는 관리 페이지입니다.
      </h1>
      <LayoutTitle title='그룹 관리' />
      <div className='w-full flex flex-nowrap gap-4 '>
        <GroupOverviewBoard
          group={group.data}
          userId={user?.id}
          spareCode={newCode ?? ''}
          onSave={handleSave}
          isAdmin={true}
        />

        <MembersBoardProvider>
          <MembersBoard
            isAdmin={true}
            group={group.data}
            userId={user?.id}
            onChangeLeader={handleChangeLeader}
            onRemoveMember={handleRemoveMember}
          />
        </MembersBoardProvider>
      </div>

      <div className='w-[920px] pb-[16px] py-4 px-5 bg-white rounded-xl mt-5'>
        <BoardTitle title='그룹 목표' icon='flag' />
        <TableToolBar
          onClickDelete={onHandleDelete}
          totalCount={groupGoals.data.searchedCount}
          searchedCount={groupGoals.data.searchedCount}
        />
        <GroupManagementDetailTable goals={sortedGoals} />
        <GroupManagementDetailPagination
          totalCount={groupGoals.data.searchedCount}
          currentPage={groupGoals.data.currentPage}
        />
      </div>
    </div>
  );
};
