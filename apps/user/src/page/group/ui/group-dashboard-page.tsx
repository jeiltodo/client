'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { BoardTitle, Button, MembersBoardProvider } from '@jeiltodo/ui/shared';
import { useQuery } from '@tanstack/react-query';
import { GroupOverviewBoard, GroupTitleOrCode } from '@jeiltodo/ui/entities';
import { MembersBorad } from '../../../../../../packages/ui/src/widgets/group/ui/members-board';
import {
  useGroupDetail,
  useGroupGoalsWithTodos,
} from '../../../entities/group';
import { useParams } from 'next/navigation';
import { userOptions } from '../../../entities/user';
import {
  useGroupCode,
  useGroupTitleAndCode,
} from '../../../entities/group/hooks/useGroupTitleAndCode';
import { GroupGoalCard } from '../../../widgets/group/ui/grouop-goal-card';
import { GoalModal } from '../../../features/goal';
import { useChangeLeader } from '../../../entities/group/hooks/useChangeLeader';
import { useRemoveMember } from '../../../entities/group/hooks/useRemoveMember';

export const GroupDashboardPage = () => {
  const params: { id: string } = useParams();
  const groupId = Number(params.id);
  const [openModal, setOpenModal] = useState(false);

  const { data, hasNextPage, fetchNextPage } = useGroupGoalsWithTodos({
    groupId,
    limit: 3,
  });
  const { ref, inView } = useInView();

  const { data: user } = useQuery(userOptions());
  const { data: group } = useGroupDetail(groupId);
  const { data: newCode } = useGroupCode(groupId);
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

  useEffect(() => {
    if (inView) {
      hasNextPage && fetchNextPage();
    }
  }, [inView]);

  if (!group) {
    return <div>group loading</div>;
  }

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

        <MembersBoardProvider>
          <MembersBorad
            group={group}
            userId={user?.data.id!}
            onChangeLeader={handleChangeLeader}
            onRemoveMember={handleRemoveMember}
          />
        </MembersBoardProvider>
      </div>
      <div className='flex flex-wrap gap-4 bg-white px-5 rounded-xl py-5 mt-5'>
        <div className='w-full flex justify-between'>
          <BoardTitle title='우리의 목표' />
          <Button
            variant='outline'
            className='flex items-center justify-center gap-1 w-[150px] h-12'
            onClick={() => setOpenModal(true)}
          >
            <div className='text-base font-pretendard-semibold'>새 목표</div>
          </Button>
        </div>
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.goals.map((goal) => (
              <GroupGoalCard key={goal.id} {...goal} />
            ))}
          </React.Fragment>
        ))}
      </div>
      {/* <div ref={ref} className='h-4'></div> */}
      {openModal && <GoalModal setGoalToggle={setOpenModal} />}
    </div>
  );
};
