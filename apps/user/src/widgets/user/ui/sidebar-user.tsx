'use client';
import { useState } from 'react';

import { Button, Sidebar } from '@jeiltodo/ui/shared';
import { Individual, Group, Plus, Search } from '@jeiltodo/icons';
import { SidebarIndividualNav } from '../../../features/user/ui/sidebar-individual-nav';
import { SidebarGroupNav } from '../../../features/group/ui/sidebar-group-nav';
import { GoalModal } from '../../../features/goal/ui/goal-modal';
import { GroupCreateModal } from '../../../features/group/ui/group-create-modal';
import { GroupAttendModal } from '../../../features/group/ui/group-attend-modal';
import { SidebarUserInfo } from '@jeiltodo/ui/features';
import {
  groupOptions,
  useGroupMutation,
  useGroupAttendMutation,
} from '../../../entities/group';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  individualGoalsOptions,
  useIndividualGoalMutation,
} from '../../../entities/user/hooks/individualGoalOptions';
import { userOptions } from '../../../entities/user';

export const SidebarUser = () => {
  const [goalToggle, setGoalToggle] = useState<boolean>(false);
  const [groupCreateToggle, setGroupCreateToggle] = useState<boolean>(false);
  const [groupAttendToggle, setGroupAttendToggle] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data: individualGoals } = useQuery(individualGoalsOptions());
  const { mutate: createGoal } = useIndividualGoalMutation();

  const { data: group } = useQuery(groupOptions());
  const createGroupMutation = useGroupMutation();
  const { mutate: attendGroup } = useGroupAttendMutation();

  const { data: userInfo } = useQuery(userOptions());

  const handleCreateIndividualGoal = (title: { title: string }) => {
    createGoal(title, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey.includes('individual'),
        });
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey.includes('todos'),
        });
      },
    });
  };

  const handleCreateGroup = (title: string) => {
    createGroupMutation.mutate(title, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: individualGoalsOptions().queryKey,
        });
      },
    });
  };

  const handleAttendGroup = (secretCode: string) => {
    attendGroup(secretCode, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: individualGoalsOptions().queryKey,
        });
      },
    });
  };

  return (
    <>
      {goalToggle && (
        <GoalModal
          goalCreator={userInfo?.nickname ?? ''}
          setGoalModalToggle={setGoalToggle}
          onMutateGoal={handleCreateIndividualGoal}
        />
      )}
      {groupCreateToggle && (
        <GroupCreateModal
          setGroupCreateToggle={setGroupCreateToggle}
          handleCreateGroup={handleCreateGroup}
        />
      )}
      {groupAttendToggle && (
        <GroupAttendModal
          setGroupAttendToggle={setGroupAttendToggle}
          handleAttendGroup={handleAttendGroup}
        />
      )}
      <Sidebar>
        <SidebarUserInfo userInfo={userInfo} />
        <SidebarIndividualNav
          icon={Individual}
          title='개인'
          individualGoals={individualGoals}
        />
        <div className='px-5 mb-[18px]'>
          <Button
            variant='outline-dark'
            className='flex items-center justify-center gap-1 w-full h-12'
            onClick={() => setGoalToggle(true)}
          >
            <Plus className='w-6 h-6' />
            <div className='text-base font-pretendard-semibold'>새 목표</div>
          </Button>
        </div>
        <SidebarGroupNav icon={Group} group={group?.data} />
        <div className='px-5 mb-3'>
          <Button
            variant='outline-dark'
            className='flex items-center justify-center gap-1 w-full h-12'
            onClick={() => setGroupCreateToggle(true)}
          >
            <Plus className='w-6 h-6' />
            <div className='text-base font-pretendard-semibold'>
              그룹 생성하기
            </div>
          </Button>
        </div>
        <div className='px-5'>
          <Button
            variant='outline-dark'
            className='flex items-center justify-center gap-1 w-full h-12'
            onClick={() => setGroupAttendToggle(true)}
          >
            <Search className='w-6 h-6' />
            <div className='text-base font-pretendard-semibold'>
              그룹 찾아보기
            </div>
          </Button>
        </div>
      </Sidebar>
    </>
  );
};
