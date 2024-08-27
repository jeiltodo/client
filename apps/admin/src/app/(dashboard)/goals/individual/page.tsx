import { PostsIndividualPage } from '../../../../page/goals/individual/ui/goals-individual-page';
import { TableProvider } from '../../../../shared';

export default function Page() {
  return (
    <TableProvider>
      <PostsIndividualPage />
    </TableProvider>
  );
}
