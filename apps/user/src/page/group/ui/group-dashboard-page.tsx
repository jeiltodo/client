'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  BoardTitle,
  Button,
  LoadingSpinner,
  MembersBoardProvider,
} from '@jeiltodo/ui/shared';
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
import { useCreateGroupGoal } from '../../../entities/group/hooks/useCreateGroupGoal';

export const GroupDashboardPage = () => {
  const params = useParams();
  const groupId = Number(params?.id);
  const [openModal, setOpenModal] = useState(false);

  const {
    data: goalWithTodos,
    hasNextPage,
    fetchNextPage,
  } = useGroupGoalsWithTodos({
    groupId,
    limit: 3,
  });
  const { ref, inView } = useInView();

  const { data: user } = useQuery(userOptions());
  const { data: group, isLoading } = useGroupDetail(groupId);
  const { data: newCode } = useGroupCode(groupId);
  const { mutate: updateTitleOrCode } = useGroupTitleAndCode(groupId);
  const { mutate: changeLeader } = useChangeLeader(groupId);
  const { mutate: removeMember } = useRemoveMember(groupId);
  const { mutate: createGroupGoal } = useCreateGroupGoal(groupId);

  const handleSave = (groupBody: GroupTitleOrCode) => {
    updateTitleOrCode(groupBody);
  };

  const handleChangeLeader = (newLeaderId: number) => {
    changeLeader(newLeaderId);
  };
  const handleRemoveMember = (memberId: number) => {
    removeMember(memberId);
  };

  const handleCreateGoal = ({ title }: { title: string }) => {
    createGroupGoal(title);
  };

  useEffect(() => {
    if (inView) {
      hasNextPage && fetchNextPage();
    }
  }, [inView]);

  return (
    <div className='max-w-[1200px] min-h-[70vh] relative mobile:pt-4 tablet:pt-0'>
      {!isLoading && group ? (
        <>
          <p className='mb-4 text-slate-900 font-semibold text-lg'>
            {group.title}
          </p>
          <div className='w-full flex flex-nowrap  gap-4'>
            <GroupOverviewBoard
              group={group}
              userId={user?.id}
              spareCode={newCode ?? ''}
              onSave={handleSave}
            />

            <MembersBoardProvider>
              <MembersBorad
                group={group}
                userId={user?.id}
                onChangeLeader={handleChangeLeader}
                onRemoveMember={handleRemoveMember}
              />
            </MembersBoardProvider>
          </div>
          <div className='flex flex-wrap gap-4 px-5 rounded-xl py-5 mt-5 bg-groupColor-50'>
            <div className='w-full flex justify-between'>
              <BoardTitle title='우리의 목표' icon='OrangeMarker' />
              <Button
                variant='group-outline'
                className='flex items-center justify-center gap-1 w-[150px] h-12 border-groupColor-500'
                onClick={() => setOpenModal(true)}
              >
                <div className='text-base font-pretendard-semibold text-groupColor-500'>
                  새 목표
                </div>
              </Button>
            </div>
            {goalWithTodos?.pages.map((item, i) => (
              <React.Fragment key={i}>
                {item.data.goals.map((goal) => (
                  <GroupGoalCard key={goal.id} {...goal} />
                ))}
              </React.Fragment>
            ))}
          </div>
          <div ref={ref} className='h-4'></div>
          {openModal && (
            <GoalModal
              setGoalModalToggle={setOpenModal}
              goalCreator={group.title}
              onMutateGoal={handleCreateGoal}
            />
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
