'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { Table } from '../../../shared/ui/table';

import { MemberGoal } from '../../../entities/member';
import { TableHeadList } from '../../../features/members/ui/table-head-list';
import { MEMBER_GOAL_TABLE_HEAD_MAP } from '../../../features/members/model/member-goal-table-head-map';
import { ProgressBar } from '@jeiltodo/ui/shared';

interface Props {
  memberGoals: MemberGoal[];
}

export function MemberGoalTable({ memberGoals }: Props) {
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <Table>
      <Table.Header>
        <Table.Row className='border-slate-400'>
          <TableHeadList headMap={MEMBER_GOAL_TABLE_HEAD_MAP} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {memberGoals.map((member, id) => (
          <Table.Row key={id}>
            <Table.Cell className='text-center'>{member.id}</Table.Cell>
            <Table.Cell className='text-left py-5'>{member.title}</Table.Cell>
            <Table.Cell>
              <ProgressBar progress={member.progressRate} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
