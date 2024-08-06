
'use client';

import { GROUP_FIILTERS } from '../entities/group';
import { User } from '../entities/user';
import { TableProvider } from '../shared/model/table-provider';
import { Pagination } from '../shared/ui/pagination';
import { TableToolBar } from '../shared/ui/table-toolbar';
import { AdminFilter } from '../widgets/ui/admin-filter';
import { AdminUsersTable } from '../widgets/user';

import { GroupBoard } from '../widgets/user';
import { GroupBoardProps } from '../widgets/user/model/type';

const tableMock: User[] = [
  {
    id: 1,
    name: '가길동',
    email: 'aohn@example.com',
    createdAt: new Date(2024, 0, 1, 0, 0, 0, 0).toISOString(),
    updatedAt: new Date(2024, 0, 1, 0, 0, 0, 0).toISOString(),
    groupCount: 2,
  },
  {
    id: 2,
    name: '나길동',
    email: 'bohn@example.com',
    createdAt: new Date(2024, 0, 2, 0, 0, 0, 0).toISOString(),
    updatedAt: new Date(2024, 0, 2, 0, 0, 0, 0).toISOString(),
    groupCount: 1,
  },
  {
    id: 3,
    name: '다길동',
    email: 'cohn@example.com',
    createdAt: new Date(2024, 0, 3, 0, 0, 0, 0).toISOString(),
    updatedAt: new Date(2024, 0, 3, 0, 0, 0, 0).toISOString(),
    groupCount: 1,
  },
];


const GroupBoardMock: GroupBoardProps = {
  user: {
    id: 1,
    email: 'johndoe@example.com',
    name: 'John Doe',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-07-10T15:00:00Z',
  },
  groups: [
    {
      id: 101,
      name: 'Development Team',
      registerAt: '2024-01-20T12:00:00Z',
    },
    {
      id: 102,
      name: 'Design Team',
      registerAt: '2024-02-05T14:30:00Z',
    },
    {
      id: 103,
      name: 'A Team',
      registerAt: '2024-02-05T14:30:00Z',
    },
    {
      id: 104,
      name: 'B Team',
      registerAt: '2024-02-05T14:30:00Z',
    },
  ],
  goals: [
    {
      id: 201,
      name: 'Improve code quality',
      registerAt: '2024-03-01T09:00:00Z',
    },
    {
      id: 202,
      name: 'Increase team collaboration',
      registerAt: '2024-04-15T11:00:00Z',
    },
  ],
};


export default function Page(): JSX.Element {
  return (
    <main className='max-w-[930px] '>
      <TableProvider<User> initialData={tableMock}>
        <AdminFilter filters={GROUP_FIILTERS} />
        <TableToolBar />
        <AdminUsersTable />
        <Pagination totalCount={tableMock.length} limit={4} currentPage={1} />
      </TableProvider>
        
      <GroupBoard groups={GroupBoardMock.groups} />
        </main>
)}
