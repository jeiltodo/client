'use client';
import { useEffect, useState } from 'react';
import { Button, Sidebar, useToast } from '@jeiltodo/ui/shared';
import { Search, PlusBlack } from '@jeiltodo/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { SidebarUserInfo } from '@jeiltodo/ui/features/user/ui';
import { SidebarIndividualNav } from '../../../features/user/ui/sidebar-individual-nav';
import { SidebarGroupNav } from '../../../features/group/ui/sidebar-group-nav';
import { GoalModal } from '../../../features/goal/ui/goal-modal';
import { GroupCreateModal } from '../../../features/group/ui/group-create-modal';
import { GroupAttendModal } from '../../../features/group/ui/group-attend-modal';
import {
  groupOptions,
  useGroupMutation,
  useGroupAttendMutation,
} from '../../../entities/group/hooks';
import {
  individualGoalsOptions,
  useIndividualGoalMutation,
} from '../../../entities/user/hooks/individualGoalOptions';
import { userOptions } from '../../../entities/user';

export const SidebarUser = () => {
  const [goalToggle, setGoalToggle] = useState<boolean>(false);
  const [groupCreateToggle, setGroupCreateToggle] = useState<boolean>(false);
  const [groupAttendToggle, setGroupAttendToggle] = useState<boolean>(false);
  const [isOnErrorAttendGroup, setIsOnErrorAttendGroup] =
    useState<boolean>(true);
  const [isOnErrorCreateGroup, setIsOnErrorCreateGroup] =
    useState<boolean>(true);

  const queryClient = useQueryClient();
  const showToast = useToast();

  const { data: individualGoals } = useQuery(individualGoalsOptions());
  const { mutate: createGoal } = useIndividualGoalMutation();

  const { data: group } = useQuery(groupOptions());
  const createGroupMutation = useGroupMutation((error: AxiosError) => {
    if (error.response?.status === 409) {
      showToast({ message: '이미 사용 중인 이름입니다.', type: 'confirm' });
      setIsOnErrorCreateGroup(true);
    }
  });
  const { mutate: attendGroup } = useGroupAttendMutation(
    (error: AxiosError) => {
      if (error.response?.status === 404) {
        showToast({ message: '존재하지 않는 그룹입니다.', type: 'confirm' });
        setIsOnErrorAttendGroup(true);
      }
      if (error.response?.status === 409) {
        showToast({ message: '이미 참여한 그룹입니다.', type: 'confirm' });
        setIsOnErrorAttendGroup(true);
      }
    }
  );

  const { data: userInfo } = useQuery(userOptions());

  const handleCreateIndividualGoal = (title: { title: string }) => {
    createGoal(title, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes('individual'),
        });
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes('todos'),
        });
      },
    });
  };

  const handleCreateGroup = (title: string) => {
    setIsOnErrorCreateGroup(true);
    createGroupMutation.mutate(title, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: individualGoalsOptions().queryKey,
        });
        setIsOnErrorCreateGroup(false);
      },
    });
  };

  const handleAttendGroup = (secretCode: string) => {
    setIsOnErrorAttendGroup(true);
    attendGroup(secretCode, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: individualGoalsOptions().queryKey,
        });
        setIsOnErrorAttendGroup(false);
      },
    });
  };
  useEffect(() => {
    if (!isOnErrorAttendGroup) {
      setGroupAttendToggle(false);
    }
  }, [isOnErrorAttendGroup]);
  useEffect(() => {
    if (!isOnErrorCreateGroup) {
      setGroupCreateToggle(false);
    }
  }, [isOnErrorCreateGroup]);

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
          isOnError={isOnErrorCreateGroup}
        />
      )}
      {groupAttendToggle && (
        <GroupAttendModal
          setGroupAttendToggle={setGroupAttendToggle}
          handleAttendGroup={handleAttendGroup}
          isOnError={isOnErrorAttendGroup}
        />
      )}
      <Sidebar>
        <SidebarUserInfo userInfo={userInfo} />
        <SidebarIndividualNav title='개인' individualGoals={individualGoals} />
        <div className='px-5 mb-[18px]'>
          <Button
            variant='outline-dark'
            className='flex items-center justify-center gap-1 w-full h-12'
            onClick={() => setGoalToggle(true)}
          >
            <PlusBlack className='w-6 h-6' />
            <div className='text-base font-pretendard-semibold'>새 목표</div>
          </Button>
        </div>
        <SidebarGroupNav group={group?.data} />
        <div className='px-5 mb-3'>
          <Button
            variant='outline-dark'
            className='flex items-center justify-center gap-1 w-full h-12'
            onClick={() => setGroupCreateToggle(true)}
          >
            <PlusBlack className='w-6 h-6' />
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
