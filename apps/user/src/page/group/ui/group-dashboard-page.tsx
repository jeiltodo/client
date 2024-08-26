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
import { MembersBoard } from '../../../../../../packages/ui/src/widgets/group/ui/members-board';
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
import { useDisbandGroup } from '../../../entities/group/hooks/useDisbandGroup';
import { useLeaveGroup } from '../../../entities/group/hooks/useLeaveGroup';
import { ConfirmationModal } from '../../../shared';
import { BackButton } from '@jeiltodo/ui/shared';

export const GroupDashboardPage = () => {
  const params = useParams();
  const groupId = Number(params?.id);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
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
  const { mutate: disbandGroup } = useDisbandGroup(groupId);
  const { mutate: leaveGroup } = useLeaveGroup(groupId);
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
  const handleConfirmSubmit = () => {
    isUserALeader ? disbandGroup() : leaveGroup();
  };
  const handleModalOpen = () => {
    setConfirmModalOpen(true);
  };

  useEffect(() => {
    if (inView) {
      hasNextPage && fetchNextPage();
    }
  }, [inView]);

  if (!group) {
    return <LoadingSpinner />;
  }

  const isUserALeader =
    group.members.find((member) => member.isLeader)?.id === user?.id;
  return (
    <div className='max-w-[1200px]'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center justify-start gap-2'>
          <BackButton />
          <p className=' text-slate-900 font-semibold text-lg'>{group.title}</p>
        </div>
        {isUserALeader ? (
          <button
            onClick={handleModalOpen}
            className='rounded-xl bg-orange-950 py-2 px-4 text-white font-semibold'
          >
            해체하기
          </button>
        ) : (
          <button
            onClick={handleModalOpen}
            className='rounded-xl bg-orange-950 py-2 px-4 text-white font-semibold'
          >
            탈퇴하기
          </button>
        )}
      </div>
      <div className='w-full grid grid-rows-[auto_280px] desktop:flex desktop:flex-nowrap  gap-4 '>
        <GroupOverviewBoard
          group={group}
          userId={user?.id}
          spareCode={newCode ?? ''}
          onSave={handleSave}
        />

        <MembersBoardProvider>
          <MembersBoard
            group={group}
            userId={user?.id}
            onChangeLeader={handleChangeLeader}
            onRemoveMember={handleRemoveMember}
          />
        </MembersBoardProvider>
      </div>
      <div className='flex flex-wrap gap-4 px-5 rounded-xl py-5 mt-5 bg-white'>
        <div className='w-full flex justify-between'>
          <BoardTitle title='우리의 목표' icon='OrangeMarker' />
          <Button
            variant='group-outline'
            className='flex items-center justify-center gap-1 w-[150px] h-12 border-groupColor-500'
            onClick={() => setGoalModalOpen(true)}
          >
            <div className='text-base font-pretendard-semibold text-groupColor-500'>
              새 목표
            </div>
          </Button>
        </div>

        {goalWithTodos?.pages.map((item, i) => (
          <React.Fragment key={i}>
            {item.data.goals.length !== 0 ? (
              item.data.goals.map((goal) => (
                <GroupGoalCard key={goal.id} {...goal} />
              ))
            ) : (
              <div className='flex items-center justify-center w-full min-h-[176px]'>
                <p className='text-sm font-normal text-slate-400'>
                  등록한 목표가 없어요
                </p>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div ref={ref} className='h-4'></div>
      {goalModalOpen && (
        <GoalModal
          setGoalModalToggle={setGoalModalOpen}
          goalCreator={group.title}
          onMutateGoal={handleCreateGoal}
        />
      )}
      {confirmModalOpen && (
        <ConfirmationModal
          setModalToggle={setConfirmModalOpen}
          submitButtonText='삭제'
          onSubmit={handleConfirmSubmit}
        >
          {isUserALeader ? '그룹을 해체하겠습니까?' : '그룹을 나가겠습니까?'}
        </ConfirmationModal>
      )}
    </div>
  );
};
