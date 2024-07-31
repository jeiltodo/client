import React from 'react';

import { useRouter } from 'next/navigation';

import { Button, Checkbox } from '@jeiltodo/ui';
import { formatDateString } from '@jeiltodo/lib';

import { Table } from '../../../shared/ui/table';
import { useTableContext, useTableCheck } from '../../../shared/hooks';

import type { User } from '../../../entities/user/model/type';

import { TableHeadList } from '../../../feature/user/ui/table-head-list';
import { USER_TABLE_HEAD_MAP } from '../../../feature/user/model';

export function AdminUsersTable() {
  // TODO: 이런건 빼내야 할까?
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };

  const { tableData: userTableData } = useTableContext<User>();

  const { isAllChecked, getIsChecked, handleAllCheck, handleCheck } =
    useTableCheck(userTableData);

  return (
    <Table>
      <Table.Header>
        <Table.Row className='border-slate-400'>
          <Table.HeadWithCheck
            isChecked={isAllChecked}
            onChange={handleAllCheck}
          />
          <TableHeadList headMap={USER_TABLE_HEAD_MAP} />
          <Table.Head>관리 설정</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {userTableData.map((table) => (
          <Table.Row>
            <Table.Cell>
              <Checkbox
                isChecked={getIsChecked(table.id)}
                onChange={() => {
                  handleCheck(table.id);
                }}
              />
            </Table.Cell>
            <Table.Cell>{table.id}</Table.Cell>
            <Table.Cell>{table.name}</Table.Cell>
            <Table.Cell>{table.email}</Table.Cell>
            <Table.Cell>{formatDateString(table.createdAt)}</Table.Cell>
            <Table.Cell>{formatDateString(table.updatedAt)}</Table.Cell>
            <Table.Cell>{table.groupCount}개</Table.Cell>
            <Table.Cell>
              <Button
                className='text-sm px-7 py-2'
                onClick={() => {
                  handleClick(`path/${table.id}`);
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
