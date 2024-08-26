import { GroupManagementDetailPage } from '../../../../page/group';
import { TableProvider } from '../../../../shared';

export default function Page() {
  return (
    <TableProvider>
      <GroupManagementDetailPage />;
    </TableProvider>
  );
}
