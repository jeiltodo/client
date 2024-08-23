'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { Button, Checkbox, formatDateString } from '@jeiltodo/ui/shared';

import { Table } from '../../../../shared';
import { useTableContext, useTableCheck } from '../../../../shared';

import { TableHeadList } from '../../../../features/user/ui/table-head-list';
import { IndividualGoals } from '../../../../entities/goals/individual';
import { GOAL_INDIVIDUAL_TABLE_HEAD_MAP } from '../../../../features/goals/individual';

export function GoalsIndividualTable() {
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };

  const { tableRows: goalIndividualRows } = useTableContext<IndividualGoals>();

  const { isAllChecked, getIsChecked, handleAllCheck, handleCheck } =
    useTableCheck(goalIndividualRows);

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
            <Table.Cell>{goal.member.nickname}</Table.Cell>
            <Table.Cell>{formatDateString(goal.createdAt)}</Table.Cell>
            <Table.Cell>{formatDateString(goal.updatedAt)}</Table.Cell>
            <Table.Cell>
              <Button
                className='text-sm px-7 py-2'
                onClick={() => {
                  handleClick(`path/${goal.id}`);
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
