import { MemberDetailPage } from '../../../../page/members/ui/member-detail-page';
import { TableProvider } from '../../../../shared';

const Page = () => {
  return (
    <TableProvider>
      <MemberDetailPage />
    </TableProvider>
  );
};

export default Page;
