import { GroupDetailPage } from '../../../../../../page/goal';

export default function Page({
  params,
}: {
  params: { id: string; goalid: string };
}) {
  return <GroupDetailPage params={params} />;
}
