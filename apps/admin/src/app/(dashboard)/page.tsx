import { MemberManagementPage } from '../../page/members';
import { TableProvider } from '../../shared';

const Page = () => {
  return (
    <TableProvider>
      <MemberManagementPage />
    </TableProvider>
  );
};

export default Page;
