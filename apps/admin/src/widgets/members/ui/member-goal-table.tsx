'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@jeiltodo/ui/shared';
import { Table } from '../../../shared/ui/table';
import { TableHeadList } from '../../../features/members/ui/table-head-list';
import { MEMBER_GOAL_TABLE_HEAD_MAP } from '../../../features/members/model/member-goal-table-head-map';
import type { IndividualGoal } from '../../../entities/goals/individual/model';

interface MemberGoalTableProps {
  memberGoals: IndividualGoal[];
}

export function MemberGoalTable({ memberGoals }: MemberGoalTableProps) {
  const router = useRouter();
  const handleClick = (goalId: number, goalTitle: string) => {
    const url = `/goals/individual/${goalId}?title=${goalTitle}`;
    router.push(url);
  };

  return (
    <Table>
      <Table.Header>
        <Table.Row className='border-slate-400'>
          <TableHeadList headMap={MEMBER_GOAL_TABLE_HEAD_MAP} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {memberGoals.map((goal) => (
          <Table.Row
            className='cursor-pointer hover:bg-slate-50'
            key={goal.id}
            onClick={() => {
              handleClick(goal.id, goal.title);
            }}
          >
            <Table.Cell className='text-center'>{goal.id}</Table.Cell>
            <Table.Cell className='text-left'>{goal.title}</Table.Cell>
            <Table.Cell>
              <ProgressBar progress={goal.progressRate} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
