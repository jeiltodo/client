import { GroupDetailPage } from '../../../../../../page/goal';

export default function Page({ params }: { params: { goalid: number } }) {
  return <GroupDetailPage params={params} />;
}
