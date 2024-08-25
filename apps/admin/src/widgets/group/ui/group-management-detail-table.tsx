'use client';

import { Table, useTableContext } from '../../../shared';
import { TableHeadList } from '../../../features/user/ui/table-head-list';
import { GROUP_DETAIL_TABLE_HEAD_MAP } from '../../../features/group';
import type { Goal } from '@jeiltodo/ui/shared';

export const GroupManagemantDetailTable = () => {
	const { tableRows: groupRows } = useTableContext<Goal>();
	console.log('groupRows: ', groupRows);

	return (
		<Table>
			<Table.Header>
				<Table.Row className=''>
					<TableHeadList headMap={GROUP_DETAIL_TABLE_HEAD_MAP} />
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{groupRows.map((group, id) => (
					<Table.Row key={group.id + id} className='hover:bg-slate-50'>
						<Table.Cell>{group.id}</Table.Cell>
						<Table.Cell>{group.title}</Table.Cell>
						<Table.Cell>{group.progressRate}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
};
