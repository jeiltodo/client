import React from 'react';

import { useRouter } from 'next/navigation';

import { Button, Checkbox } from '@jeiltodo/ui/shared';
import { formatDateString } from '@jeiltodo/lib';

import { Table } from '../../../shared/ui/table';
import { useTableContext, useTableCheck } from '../../../shared';

import type { User } from '../../../entities/user/model/type';
import { TableHeadList } from '../../../features/user/ui/table-head-list';
import { USER_TABLE_HEAD_MAP } from '../../../features/user';

export function UsersTable() {
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };

  const { tableRows: userRows } = useTableContext<User>();

  const { isAllChecked, getIsChecked, handleAllCheck, handleCheck } =
    useTableCheck(userRows);

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
        {userRows.map((user) => (
          <Table.Row>
            <Table.Cell>
              <Checkbox
                isChecked={getIsChecked(user.id)}
                onChange={() => {
                  handleCheck(user.id);
                }}
              />
            </Table.Cell>
            <Table.Cell>{user.id}</Table.Cell>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{formatDateString(user.createdAt)}</Table.Cell>
            <Table.Cell>{formatDateString(user.updatedAt)}</Table.Cell>
            <Table.Cell>{user.groupCount}개</Table.Cell>
            <Table.Cell>
              <Button
                className='text-sm px-7 py-2'
                onClick={() => {
                  handleClick(`path/${user.id}`);
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
