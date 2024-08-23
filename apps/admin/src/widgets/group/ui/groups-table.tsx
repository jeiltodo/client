'use client';

import { Table, useTableCheck, useTableContext } from '../../../shared';
import { TableHeadList } from '../../../features/user/ui/table-head-list';
import { Button, Checkbox, formatDateString } from '@jeiltodo/ui/shared';
import { useRouter } from 'next/navigation';
import { GROUP_TABLE_HEAD_MAP } from '../../../features/group/model/group-table-head-map';
import { Groups } from '../../../entities/group/model/type';

export const GroupsTable = () => {
  const { tableRows: groupRows } = useTableContext<Groups>();
  const router = useRouter();

  const { isAllChecked, getIsChecked, handleAllCheck, handleCheck } =
    useTableCheck(groupRows);

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
        {groupRows.map((group, id) => (
          <Table.Row key={group.id + id}>
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
            {/* 리더 찾는 로직 생성 <Table.Cell>{leader}</Table.Cell> */}
            <Table.Cell>{formatDateString(group.createdAt)}</Table.Cell>
            <Table.Cell>{formatDateString(group.updatedAt)}</Table.Cell>
            {/* 전체 그룹 수  <Table.Cell>{group.groupCount}개</Table.Cell> */}
            <Table.Cell>
              <Button
                className='text-sm px-7 py-2'
                onClick={() => {
                  handleClick(`path/${group.id}`);
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
