import { PostsGroupPage } from '../../../../page/goals/group';
import { TableProvider } from '../../../../shared';

export default function Page() {
  return (
    <TableProvider>
      <PostsGroupPage />
    </TableProvider>
  );
}
