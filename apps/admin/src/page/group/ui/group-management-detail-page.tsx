'use client';

import { MembersBoard } from '../../../../../../packages/ui/src/widgets/group/ui/members-board';
import type { GroupTitleOrCode } from '@jeiltodo/ui/entities';
import {
  GroupOverviewBoard,
  useChangeLeader,
  useGroupTitleAndCode,
  useRemoveMember,
} from '@jeiltodo/ui/entities';
import {
  LayoutTitle,
  LoadingSpinner,
  MembersBoardProvider,
} from '@jeiltodo/ui/shared';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useGroupDetail } from '../../../entities/group';
import { userOptions } from '../../../entities/member/hooks/userOptions';
import { GroupManagemantDetailTable } from '../../../widgets/group';
import { TableToolBar, useTableContext } from '../../../shared';
import { useGetAllGroupGoals } from '../../../entities/goals/group';

// eslint-disable-next-line react/function-component-definition
export const GroupManagementDetailPage = () => {
  const params = useParams();
  const groupId = Number(params?.id);

  const { tableFilters } = useTableContext();
  const { data: user } = useQuery(userOptions());
  const { data: group, isLoading } = useGroupDetail(groupId);
  const { data: groupGoals, isLoading: isGoalsLoading } = useGetAllGroupGoals({
    page: tableFilters.page,
    limit: tableFilters.limit as number,
  });

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
          spareCode={group.data.secretCode}
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

      <div className='w-[920px] pb-[16px] px-5 bg-white rounded-xl mt-5'>
        <TableToolBar
          onClickDelete={onHandleDelete}
          totalCount={groupGoals.data.totalCount}
          searchedCount={groupGoals.data.searchedCount}
        />
        <GroupManagemantDetailTable goals={groupGoals.data.goals} />
      </div>
    </div>
  );
};
