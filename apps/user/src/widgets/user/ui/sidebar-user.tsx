'use client';
import { useState } from 'react';

import { Button, Sidebar } from '@jeiltodo/ui/shared';
import { SidebarNav } from '../../../shared/ui/sidebar/sidebar-nav';
import { Home, Individual, Group, Plus, Search } from '@jeiltodo/icons';
import { SidebarIndividualNav } from '../../../features/user/ui/sidebar-individual-nav';
import { SidebarGroupNav } from '../../../features/group/ui/sidebar-group-nav';
import { GoalModal } from '../../../features/goal/ui/goal-modal';
import { GroupCreateModal } from '../../../features/group/ui/group-create-modal';
import { GroupAttendModal } from '../../../features/group/ui/group-attend-modal';
import { SidebarUserInfo } from '@jeiltodo/ui/entities';
import {
  groupOptions,
  useGroupMutation,
  useGroupAttendMutation,
} from '../../../entities/group';
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import {
  individualGoalsOptions,
  useIndividualGoalMutation,
} from '../../../entities/goal/hooks/individualOptions';
import { AxiosError } from 'axios';
import { userOptions } from '../../../entities/user';

export const SidebarUser = () => {
  const [goalToggle, setGoalToggle] = useState<boolean>(false);
  const [groupCreateToggle, setGroupCreateToggle] = useState<boolean>(false);
  const [groupAttendToggle, setGroupAttendToggle] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data: individualGoalsData } = useQuery(individualGoalsOptions());
  const createIndividualGoalMutation = useIndividualGoalMutation();

  const { data: groupData } = useQuery(groupOptions());
  const createGroupMutation = useGroupMutation();
  const AttendGroupMutation = useGroupAttendMutation();

  const { data: userInfoData } = useQuery(userOptions());

  const handleCreateIndividualGoal = (title: string) => {
    createIndividualGoalMutation.mutate(title, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: individualGoalsOptions().queryKey,
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
    AttendGroupMutation.mutate(secretCode, {
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
          setGoalToggle={setGoalToggle}
          handleCreateIndividualGoal={handleCreateIndividualGoal}
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
        <SidebarUserInfo userInfo={userInfoData?.data} />
        <SidebarIndividualNav
          icon={Individual}
          title='개인'
          individualGoals={individualGoalsData?.data.individualGoals}
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
        <SidebarGroupNav icon={Group} group={groupData?.data} />
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
