'use client';

import React, { useEffect } from 'react';
import { progressAllOptions, useGoalsWithTodos } from '../../../entities/goal';
import { ProgressBoard, UserGoalCard } from '../../../widgets/user';
import { useInView } from 'react-intersection-observer';
import { BoardTitle } from '@jeiltodo/ui/shared';
import { useQuery } from '@tanstack/react-query';
import { GroupOverviewBoard, GroupTitleOrCode } from '@jeiltodo/ui/entities';
//TODO: membersboard
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
  const params: { id: string } = useParams();
  const groupId = Number(params.id);
  const { data: group } = useGroupDetail(groupId);
  // POST가 아니라 GET으로 구현되어 개선 필요
  const { data: newCode } = useGroupCode(groupId);
  const { mutate: updateCode } = useGroupCodeUpdate(groupId);
  const { data: user } = useQuery(userOptions());

  if (!group) {
    return <div>group loading</div>;
  }

  const handleSave = (groupBody: GroupTitleOrCode) => {
    if ('secretCode' in groupBody) {
      updateCode(groupBody.secretCode);
    }
  };

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
        <MembersBorad onChangeLeader={() => {}} onRemoveMember={() => {}} />
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
