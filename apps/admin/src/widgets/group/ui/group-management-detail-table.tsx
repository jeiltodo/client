'use client';

import { ProgressBar } from '@jeiltodo/ui/shared';
import { useRouter } from 'next/navigation';
import { Table } from '../../../shared';
import { TableHeadList } from '../../../features/members';
import { GROUP_DETAIL_TABLE_HEAD_MAP } from '../../../entities/group/constants/group-management-filters';
import type { GroupGoals } from '../../../entities/goals/group';

interface GroupsManagementDetailTableProps {
  goals: GroupGoals[];
}

export function GroupManagementDetailTable({
  goals,
}: GroupsManagementDetailTableProps) {
  const router = useRouter();
  const handleClick = (goalId: number, goalTitle: string) => {
    const url = `/goals/group/${goalId}?title=${goalTitle}`;
    router.push(url);
  };
  return (
    <Table>
      <Table.Header>
        <Table.Row className=''>
          <TableHeadList headMap={GROUP_DETAIL_TABLE_HEAD_MAP} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {goals.map((goal, id) => (
          <Table.Row
            className='hover:bg-slate-50'
            key={goal.title + id}
            onClick={() => {
              handleClick(goal.id, goal.title);
            }}
          >
            <Table.Cell>{goal.id}</Table.Cell>
            <Table.Cell>{goal.title}</Table.Cell>
            <Table.Cell>
              <ProgressBar progress={goal.progressRate || 0} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
