'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { Button, Checkbox, formatDateString } from '@jeiltodo/ui/shared';

import { Table } from '../../../../shared';
import { useTableCheck } from '../../../../shared';

import { IndividualGoal } from '../../../../entities/goals/individual';
import { GOAL_INDIVIDUAL_TABLE_HEAD_MAP } from '../../../../features/goals/individual';
import { TableHeadList } from '../../../../features/members';

interface Props {
  goals: IndividualGoal[];
}

export function GoalsIndividualTable({ goals: goalIndividualRows }: Props) {
  const router = useRouter();
  const handleClick = (id: number, title: string) => {
    const queryString = new URLSearchParams({ title }).toString();
    router.push(`/goals/individual/${id}?${queryString}`);
  };

  const { isAllChecked, getIsChecked, handleAllCheck, handleCheck } =
    useTableCheck();

  return (
    <Table>
      <Table.Header>
        <Table.Row className='border-slate-400'>
          <Table.HeadWithCheck
            isChecked={isAllChecked}
            onChange={handleAllCheck}
          />
          <TableHeadList headMap={GOAL_INDIVIDUAL_TABLE_HEAD_MAP} />
          <Table.Head>관리 설정</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {goalIndividualRows.map((goal) => (
          <Table.Row key={goal.id} className='hover:bg-slate-50 '>
            <Table.Cell>
              <Checkbox
              className='text-center'
                isChecked={getIsChecked(goal.id)}
                onChange={() => {
                  handleCheck(goal.id);
                }}
              />
            </Table.Cell>
            <Table.Cell className='text-center'>{goal.id}</Table.Cell>
            <Table.Cell className='text-left'>{goal.title} </Table.Cell>
            <Table.Cell className='text-center'>
              {goal.member.nickname}
            </Table.Cell>
            <Table.Cell className='text-center'>
              {formatDateString(goal.createdAt)}
            </Table.Cell>
            <Table.Cell className='text-center'>
              {formatDateString(goal.updatedAt)}
            </Table.Cell>
            <Table.Cell>
              <Button
                className='text-sm px-7 py-2 h-9'
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
