'use client';

import { Table, useTableContext } from '../../../shared';
import { TableHeadList } from '../../../features/user/ui/table-head-list';
import { GROUP_DETAIL_TABLE_HEAD_MAP } from '../../../features/group';
import { ProgressBar } from '@jeiltodo/ui/shared';
import { GroupGoalsList } from '../../../entities/group';

export const GroupManagemantDetailTable = () => {
  const { tableRows: groupGoalsRow } = useTableContext<GroupGoalsList>();

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
