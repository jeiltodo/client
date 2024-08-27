import { PostsGroupDetailPage } from '../../../../../page/goals/group';
import { TableProvider } from '../../../../../shared';

export default function Page() {
  return (
    <TableProvider>
      <PostsGroupDetailPage />
    </TableProvider>
  );
}
