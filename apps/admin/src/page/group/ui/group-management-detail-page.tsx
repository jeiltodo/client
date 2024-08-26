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
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGroupDetail } from '../../../entities/group';
import { userOptions } from '../../../entities/member/hooks/userOptions';
import { GroupManagemantDetailTable } from '../../../widgets/group';
import { TableProvider, TableToolBar } from '../../../shared';
import { useGroupGoals } from '../../../entities/group/hooks/useGroupGoals';

// eslint-disable-next-line react/function-component-definition
export const GroupManagementDetailPage = () => {
  const [limit, setLimit] = useState<string | number | undefined>(10);
  const params = useParams();
  const groupId = Number(params?.id);
  const { data: user } = useQuery(userOptions());
  const { data: group, isLoading } = useGroupDetail(groupId);
  const { data: groupGoalsData } = useGroupGoals({
    page: 1,
    limit: limit as number,
    groupId: groupId,
  });

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

  if (!group) {
    return <LoadingSpinner />;
  }

  return (
    <div className='max-w-[930px]'>
      <h1 className='sr-only'>
        jtodo 서비스의 그룹 도메인을 수정할 수 있는 관리 페이지입니다.
      </h1>
      <LayoutTitle title='그룹 관리' />
      <div className='w-full grid grid-rows-auto desktop:flex desktop:flex-nowrap  gap-4 '>
        <GroupOverviewBoard
          group={group?.data}
          userId={user?.id}
          spareCode={group?.data?.secretCode}
          onSave={handleSave}
          isAdmin={true}
        />

        <MembersBoardProvider>
          <MembersBoard
            isAdmin={true}
            group={{
              id: 1,
              title: '그룹 구성원',
              createdAt: '2024-08-24T15:53:23.283+00:00',
              updatedAT: '2024-08-24T15:53:23.283+00:00',
              secretCode: '12345',
              createUser: '춘식이',
              members: [
                {
                  id: 1,
                  isLeader: true,
                  nickname: '1.담곰이',
                  color: '#FF0000',
                },
                {
                  id: 2,
                  isLeader: false,
                  nickname: '2.곰돌이',
                  color: '#00FF00',
                },
                {
                  id: 3,
                  isLeader: false,
                  nickname: '3.토끼',
                  color: '#0000FF',
                },
                {
                  id: 4,
                  isLeader: false,
                  nickname: '4.호랑이',
                  color: '#FFFF00',
                },
                {
                  id: 5,
                  isLeader: false,
                  nickname: '5.사자',
                  color: '#FF00FF',
                },
                {
                  id: 6,
                  isLeader: false,
                  nickname: '6.여우',
                  color: '#00FFFF',
                },
                {
                  id: 7,
                  isLeader: false,
                  nickname: '7.늑대',
                  color: '#FFA500',
                },
                {
                  id: 8,
                  isLeader: false,
                  nickname: '8.고양이',
                  color: '#800080',
                },
                {
                  id: 9,
                  isLeader: false,
                  nickname: '9.강아지',
                  color: '#008000',
                },
                {
                  id: 10,
                  isLeader: false,
                  nickname: '10.코끼리',
                  color: '#000080',
                },
              ],
            }}
            userId={user?.id}
            onChangeLeader={handleChangeLeader}
            onRemoveMember={handleRemoveMember}
          />
        </MembersBoardProvider>
      </div>

      <TableProvider initialData={groupGoalsData.data.goals}>
        <div className='w-[920px] pb-[16px] px-5 bg-white rounded-xl mt-5'>
          <TableToolBar
            onSelectDropdown={setLimit}
            onClickDelete={() => {}}
            isDelete={false}
            isSearch={false}
            totalCount={10}
            searchedCount={4}
          />
          <GroupManagemantDetailTable />
        </div>
      </TableProvider>
    </div>
  );
};
