import { MemberManagementPage } from '../../page/members';
import { TableProvider } from '../../shared';

function Page() {
  return (
    <TableProvider>
      <MemberManagementPage />
    </TableProvider>
  );
}

export default Page;
