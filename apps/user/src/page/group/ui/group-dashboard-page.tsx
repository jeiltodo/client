'use client';

import React, { useEffect } from 'react';
import { ProgressBoard, UserGoalCard } from '../../../widgets/user';
import { useInView } from 'react-intersection-observer';
import { BoardTitle } from '@jeiltodo/ui/shared';
import { useQuery } from '@tanstack/react-query';
import { GroupOverviewBoard, GroupTitleOrCode } from '@jeiltodo/ui/entities';
import { MembersBorad } from '../../../../../../packages/ui/src/widgets/group/ui/members-board';
import { useGroupDetail } from '../../../entities/group';
import { useParams, usePathname } from 'next/navigation';
import { userOptions } from '../../../entities/user';
import {
  useGroupCode,
  useGroupCodeUpdate,
} from '../../../entities/group/hooks/useGroupCode';

export const GroupDashboardPage = () => {
  // const { data, hasNextPage, fetchNextPage } = useGoalsWithTodos({
  //   limit: 3,
  // });
  // const { ref, inView } = useInView();

  // useEffect(() => {
  //   if (inView) {
  //     hasNextPage && fetchNextPage();
  //   }
  // }, [inView]);

  const { data: user } = useQuery(userOptions());
  const params: { id: string } = useParams();
  const groupId = Number(params.id);

  // 그룹 정보
  const { data: group } = useGroupDetail(groupId);
  const { data: newCode } = useGroupCode(groupId); // POST가 아니라 GET으로 구현되어 개선 필요
  const { mutate: updateCode } = useGroupCodeUpdate(groupId);

  if (!group) {
    return <div>group loading</div>;
  }

  const handleSave = (groupBody: GroupTitleOrCode) => {
    if ('secretCode' in groupBody) {
      updateCode(groupBody.secretCode);
    }
  };

  //멤버 정보
  const handleChangeLeader = (newLeaderId: number) => {};
  const handleRemoveMember = (memberId: number) => {};

  return (
    <div className='pt-6 max-w-[1180px] mx-auto'>
      <p className='mb-4 text-slate-900 font-semibold text-lg'>{group.title}</p>
      <div className='w-full flex gap-4'>
        <GroupOverviewBoard
          group={group}
          userId={user?.data.id!}
          spareCode={newCode ?? ''}
          onSave={handleSave}
        />
        <MembersBorad
          group={group}
          onChangeLeader={handleChangeLeader}
          onRemoveMember={handleRemoveMember}
        />
      </div>
      <div className='flex flex-wrap gap-4 bg-white px-5 rounded-xl py-5 mt-5'>
        <BoardTitle title='우리의 목표' />
        {/* {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.goals.map((goal) => (
              <UserGoalCard key={goal.id} {...goal} />
            ))}
          </React.Fragment>
        ))} */}
      </div>
      {/* <div ref={ref} className='h-4'></div> */}
    </div>
  );
};
