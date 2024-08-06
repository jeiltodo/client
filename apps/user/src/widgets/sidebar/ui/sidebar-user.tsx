'use client';
import { useState } from 'react';

import { Button, Sidebar } from '@jeiltodo/ui';
import { SidebarNav } from '../../../shared/ui/sidebar/sidebar-nav';
import { Home, Individual, Group, Plus, Search } from '@jeiltodo/icons';
import { SidebarIndividualNav } from '../../../features/sidebar/ui/sidebar-individual-nav';
import { SidebarGroupNav } from '../../../features/sidebar/ui/sidebar-group-nav';
import { GoalModal } from '../../../features/modal/ui/goal-modal';
import { GroupCreateModal } from '../../../features/modal/ui/group-create-modal';
import { GroupAttendModal } from '../../../features/modal/ui/group-attend-modal';
import { LoadDraftModal } from '../../../features/modal/ui/load-draft-modal';

// entities에서 데이터 individual/goals로 불러올 예정
const data = [
  {
    title: 'Personal Goal 1',
    id: 1,
    userId: 1,
    updatedAt: '2024-07-23T01:42:42.767Z',
    createdAt: '2024-07-23T01:42:42.767Z',
  },
  {
    title: 'Personal Goal 2',
    id: 2,
    userId: 1,
    updatedAt: '2024-07-23T01:42:42.767Z',
    createdAt: '2024-07-23T01:42:42.767Z',
  },
];

const group = [
  {
    title: 'A그룹',
    id: 1,
  },
  {
    title: 'B그룹',
    id: 2,
  },
];

export const SidebarUser = () => {
  const [goalToggle, setGoalToggle] = useState<boolean>(false);
  const [groupCreateToggle, setGroupCreateToggle] = useState<boolean>(false);
  const [groupAttendToggle, setGroupAttendToggle] = useState<boolean>(false);
  return (
    <>
      {goalToggle && <GoalModal setGoalToggle={setGoalToggle} />}
      {groupCreateToggle && <GroupCreateModal setGroupCreateToggle={setGroupCreateToggle} />}
      {groupAttendToggle && <GroupAttendModal setGroupAttendToggle={setGroupAttendToggle} />}
      <Sidebar>
        <SidebarNav icon={Home} title='대시보드' href='/' />
        <SidebarIndividualNav
          icon={Individual}
          title='개인'
          individualGoals={data}
        />
        <div className='px-6 mt-6 mb-[18px]'>
          <Button
            variant='outline'
            className='flex items-center justify-center gap-1 w-full'
            onClick={() => setGoalToggle(true)}
          >
            <Plus className='w-6 h-6' />
            <div className='text-blue-500 text-base font-pretendard-semibold'>
              새 목표
            </div>
          </Button>
        </div>
        <SidebarGroupNav icon={Group} title='그룹' group={group} />
        <div className='px-6 mt-6 mb-3'>
          <Button
            variant='outline'
            className='flex items-center justify-center gap-1 w-full'
            onClick={() => setGroupCreateToggle(true)}
          >
            <Plus className='w-6 h-6' />
            <div className='text-blue-500 text-base font-pretendard-semibold'>
              그룹 생성하기
            </div>
          </Button>
        </div>
        <div className='px-6'>
          <Button
            variant='outline'
            className='flex items-center justify-center gap-1 w-full'
            onClick={() => setGroupAttendToggle(true)}
          >
            <Search className='w-6 h-6' />
            <div className='text-blue-500 text-base font-pretendard-semibold'>
              그룹 찾아보기
            </div>
          </Button>
        </div>
      </Sidebar>
    </>
  );
};