'use client';

import {
  GroupOverviewBoard,
  GroupTitleOrCode,
  useGroupTitleAndCode,
} from '@jeiltodo/ui/entities';
import {
  LayoutTitle,
  MembersBoardProvider,
  MembersBorad,
} from '@jeiltodo/ui/shared';

import { useParams } from 'next/navigation';
import { useGroupDetail } from '../../../entities/group';
import { useQuery } from '@tanstack/react-query';
import { userOptions } from '../../../entities/member/hooks/userOptions';

export const GroupManagementDetailPage = () => {
  const { data: user } = useQuery(userOptions());
  const { id } = useParams<{ id: string }>();
  const { data: groupDetail } = useGroupDetail(Number(id));
  const { mutate: updateTitleOrCode } = useGroupTitleAndCode(Number(id));

  const handleSave = (groupBody: GroupTitleOrCode) => {
    updateTitleOrCode(groupBody);
  };

  return (
    <div>
      <h1>jtodo 서비스의 그룹 도메인을 수정할 수 있는 관리 페이지입니다.</h1>
      <LayoutTitle title='그룹 관리' />
      <div className='w-full grid grid-rows-[auto_280px] desktop:flex desktop:flex-nowrap  gap-4 '>
        {/* <GroupOverviewBoard
          group={groupDetail}
          userId={user?.id}
          spareCode={groupDetail?.secretCode}
          onSave={handleSave}
        />

        <MembersBoardProvider>
          <MembersBorad
            group={}
            userId={user?.id}
            onChangeLeader={handleChangeLeader}
            onRemoveMember={handleRemoveMember}
          />
        </MembersBoardProvider> */}
      </div>
    </div>
  );
};
