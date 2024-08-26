import { PostsIndividualPage } from '../../../../page/goals/individual/ui/goals-individual-page';
import { TableQueriesProvider } from '../../../../shared';

export default function Page() {
  return (
    <TableQueriesProvider>
      <PostsIndividualPage />
    </TableQueriesProvider>
  );
}
