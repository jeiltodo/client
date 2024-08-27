import { PostsIndividualDetailPage } from '../../../../../page/goals/individual';
import { TableProvider } from '../../../../../shared';

export default function Page() {
  return (
    <TableProvider>
      <PostsIndividualDetailPage />
    </TableProvider>
  );
}
