'use client';

import { Button, Checkbox, formatDateString } from '@jeiltodo/ui/shared';
import { useRouter } from 'next/navigation';
import { Table, useTableCheck, useTableContext } from '../../../shared';
import { TableHeadList } from '../../../features/user/ui/table-head-list';
import { GROUP_TABLE_HEAD_MAP } from '../../../features/group';
import type { Groups, GroupMembers } from '../../../entities/group/model/type';

export const GroupsManagementTable = () => {
	const { tableRows: groupRows } = useTableContext<Groups>();
	const router = useRouter();

	const { isAllChecked, getIsChecked, handleAllCheck, handleCheck } =
		useTableCheck(groupRows);

	const handleClick = (path: string) => {
		router.push(path);
	};

	const findLeader = (members: GroupMembers[]) => {
		const leader = members.find((member) => member.isLeader === true);
		return leader?.nickname;
	};
	return (
		<Table>
			<Table.Header>
				<Table.Row className='border-slate-400'>
					<Table.HeadWithCheck
						isChecked={isAllChecked}
						onChange={handleAllCheck}
					/>
					<TableHeadList headMap={GROUP_TABLE_HEAD_MAP} />
					<Table.Head>관리 설정</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{groupRows.map((group, id) => (
					<Table.Row key={group.id + id} className='hover:bg-slate-50'>
						<Table.Cell>
							<Checkbox
								isChecked={getIsChecked(group.id)}
								onChange={() => {
									handleCheck(group.id);
								}}
							/>
						</Table.Cell>
						<Table.Cell>{group.id}</Table.Cell>
						<Table.Cell>{group.title}</Table.Cell>
						<Table.Cell>{findLeader(group.members)}</Table.Cell>
						<Table.Cell>{formatDateString(group.createdAt)}</Table.Cell>
						<Table.Cell>{formatDateString(group.updatedAt)}</Table.Cell>
						<Table.Cell>
							<Button
								className='text-sm w-[84px] h-9'
								onClick={() => {
									handleClick(`/group/${group.id}`);
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
};
