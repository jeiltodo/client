'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { Button, Checkbox, formatDateString } from '@jeiltodo/ui/shared';

import { Table } from '../../../../shared';
import { useTableCheck } from '../../../../shared';

import { TableHeadList } from '../../../../features/members';
import { GroupGoals } from '../../../../entities/goals/group';
import { GOAL_GROUP_TABLE_HEAD_MAP } from '../../../../features/goals/group';

interface Props {
  goals: GroupGoals[];
}

export function GoalsGroupTable({ goals: goalGroupRows }: Props) {
  const router = useRouter();
  const handleClick = (id: number, title: string) => {
    const queryString = new URLSearchParams({ title }).toString();
    router.push(`/goals/group/${id}?${queryString}`);
  };

  const { isAllChecked, getIsChecked, handleAllCheck, handleCheck } =
    useTableCheck(goalGroupRows);

  return (
    <Table>
      <Table.Header>
        <Table.Row className='border-slate-400'>
          <Table.HeadWithCheck
            isChecked={isAllChecked}
            onChange={handleAllCheck}
          />
          <TableHeadList headMap={GOAL_GROUP_TABLE_HEAD_MAP} />
          <Table.Head>관리 설정</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {goalGroupRows.map((goal) => (
          <Table.Row key={goal.id}>
            <Table.Cell>
              <Checkbox
                isChecked={getIsChecked(goal.id)}
                onChange={() => {
                  handleCheck(goal.id);
                }}
              />
            </Table.Cell>
            <Table.Cell>{goal.id}</Table.Cell>
            <Table.Cell>{goal.title}</Table.Cell>
            <Table.Cell>{goal.group.title}</Table.Cell>
            <Table.Cell>{goal.member.nickname}</Table.Cell>
            <Table.Cell>{formatDateString(goal.updatedAt)}</Table.Cell>
            <Table.Cell>
              <Button
                className='text-sm px-7 py-2'
                onClick={() => {
                  handleClick(goal.id, goal.title);
                }}
                variant='outline'
              >
                관리
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
