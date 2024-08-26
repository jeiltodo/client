import { GroupManagementPage } from '../../../page/group';
import { TableProvider } from '../../../shared';

export default function Page() {
  return (
    <TableProvider>
      <GroupManagementPage />;
    </TableProvider>
  );
}
