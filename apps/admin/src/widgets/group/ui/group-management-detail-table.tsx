'use client';

import { ProgressBar } from '@jeiltodo/ui/shared';
import { Table } from '../../../shared';
import { TableHeadList } from '../../../features/members';
import { GROUP_DETAIL_TABLE_HEAD_MAP } from '../../../entities/group/constants/group-management-filters';
import type { GroupGoals } from '../../../entities/goals/group';

interface GroupsManagementDetailTableProps {
  goals: GroupGoals[];
}

export const GroupManagementDetailTable = ({
  goals: groupGoalsRow,
}: GroupsManagementDetailTableProps) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row className=''>
          <TableHeadList headMap={GROUP_DETAIL_TABLE_HEAD_MAP} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {groupGoalsRow.map((group, id) => (
          <Table.Row key={group.title + id} className='hover:bg-slate-50'>
            <Table.Cell>{group.id}</Table.Cell>
            <Table.Cell>{group.title}</Table.Cell>
            <Table.Cell>
              <ProgressBar progress={group.progressRate || 0} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
