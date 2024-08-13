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
import { useIndividualGoals } from '../../../entities/goal';
import { useGroup } from '../../../entities/group/indext';
import { useUserInfo } from '../../../entities/user';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { individualGoalsOptions } from '../../../entities/goal/api/individualOptions';

export const SidebarUser = () => {
  const [goalToggle, setGoalToggle] = useState<boolean>(false);
  const [groupCreateToggle, setGroupCreateToggle] = useState<boolean>(false);
  const [groupAttendToggle, setGroupAttendToggle] = useState<boolean>(false);

  const { individualGoalsData } = useIndividualGoals();
  const { groupData } = useGroup();
  const { userInfoData } = useUserInfo();
  const { data } = useQuery(individualGoalsOptions());
  return (
    <>
      {goalToggle && <GoalModal setGoalToggle={setGoalToggle} />}
      {groupCreateToggle && (
        <GroupCreateModal setGroupCreateToggle={setGroupCreateToggle} />
      )}
      {groupAttendToggle && (
        <GroupAttendModal setGroupAttendToggle={setGroupAttendToggle} />
      )}
      <Sidebar>
        <SidebarUserInfo userInfo={userInfoData?.data} />
        <SidebarIndividualNav
          icon={Individual}
          title='개인'
          // individualGoals={individualGoalsData?.data.individualGoals}
          individualGoals={data?.data.individualGoals}
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
        <SidebarGroupNav icon={Group} title='그룹' group={groupData?.data} />
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
