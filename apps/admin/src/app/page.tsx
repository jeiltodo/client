'use client';

import AdminUsersTable from '../widget/ui/admin-users-table';
import TableProvider from '../widget/ui/table-provider';

export default function Page(): JSX.Element {
  return (
    <main>
      <TableProvider>
        <AdminUsersTable />
      </TableProvider>
    </main>
  );
}
