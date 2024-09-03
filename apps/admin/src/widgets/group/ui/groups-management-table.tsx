'use client';

import { Button, Checkbox, formatDateString } from '@jeiltodo/ui/shared';
import { useRouter } from 'next/navigation';
import { Table, useTableCheck } from '../../../shared';
import { TableHeadList } from '../../../features/members';
import { GROUP_TABLE_HEAD_MAP } from '../../../entities/group/constants/group-management-filters';
import type { Groups } from '../../../entities/group/model/type';

interface GroupsManagementTableProps {
  groups: Groups[];
}

export function GroupsManagementTable({
  groups: groupRows,
}: GroupsManagementTableProps) {
  const router = useRouter();
  const { isAllChecked, getIsChecked, handleAllCheck, handleCheck } =
    useTableCheck();

  const handleClick = (path: string) => {
    router.push(path);
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
        {groupRows.map((group) => (
          <Table.Row
            className='hover:bg-slate-50 '
            key={group.title + group.id}
          >
            <Table.Cell className='text-center'>
              <Checkbox
                isChecked={getIsChecked(group.id)}
                onChange={() => {
                  handleCheck(group.id);
                }}
              />
            </Table.Cell>
            <Table.Cell className='text-center'>{group.id}</Table.Cell>
            <Table.Cell>{group.title}</Table.Cell>
            <Table.Cell className='text-center'>{group.createUser}</Table.Cell>
            <Table.Cell className='text-center'>
              {formatDateString(group.createdAt)}
            </Table.Cell>
            <Table.Cell className='text-center'>
              {formatDateString(group.updatedAt)}
            </Table.Cell>
            <Table.Cell className='text-center'>
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
}
