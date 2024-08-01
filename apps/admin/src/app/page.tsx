'use client';

import { GROUP_FIILTERS } from '../entities/group';
import { User } from '../entities/user';
import { TableProvider } from '../shared/model/table-provider';
import { Pagination } from '../shared/ui/pagination';
import { TableToolBar } from '../shared/ui/table-toolbar';
import { AdminFilter } from '../widgets/ui/admin-filter';
import { AdminUsersTable } from '../widgets/user';

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

export default function Page(): JSX.Element {
  return (
    <main className='max-w-[930px] '>
      <TableProvider<User> initialData={tableMock}>
        <AdminFilter filters={GROUP_FIILTERS} />
        <TableToolBar />
        <AdminUsersTable />
        <Pagination totalCount={tableMock.length} limit={4} currentPage={1} />
      </TableProvider>
    </main>
  );
}
