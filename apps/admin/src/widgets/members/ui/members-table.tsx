'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { Button, Checkbox, formatDateString } from '@jeiltodo/ui/shared';

import { Table } from '../../../shared/ui/table';
import { useTableCheck } from '../../../shared';

import { Member } from '../../../entities/member';
import { TableHeadList } from '../../../features/members/ui/table-head-list';
import { MEMBER_TABLE_HEAD_MAP } from '../../../features/members/model/member-table-head-map';

interface Props {
  members: Member[];
}

export function MembersTable({ members }: Props) {
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };

  const { isAllChecked, getIsChecked, handleAllCheck, handleCheck } =
    useTableCheck(members);
  return (
    <Table>
      <Table.Header>
        <Table.Row className='border-slate-400'>
          <Table.HeadWithCheck
            isChecked={isAllChecked}
            onChange={handleAllCheck}
          />
          <TableHeadList headMap={MEMBER_TABLE_HEAD_MAP} />
          <Table.Head>관리 설정</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {members.map((member, id) => (
          <Table.Row key={id}>
            <Table.Cell>
              <Checkbox
                isChecked={getIsChecked(member.id)}
                onChange={() => {
                  handleCheck(member.id);
                }}
              />
            </Table.Cell>
            <Table.Cell>{member.id}</Table.Cell>
            <Table.Cell>{member.nickname}</Table.Cell>
            <Table.Cell>{member.email}</Table.Cell>
            <Table.Cell>{formatDateString(member.createdAt)}</Table.Cell>
            <Table.Cell>{formatDateString(member.updatedAt)}</Table.Cell>
            <Table.Cell>{member.groupCount}개</Table.Cell>
            <Table.Cell>
              <Button
                className='text-sm px-7 py-2'
                onClick={() => {
                  handleClick(`/${member.id}`);
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