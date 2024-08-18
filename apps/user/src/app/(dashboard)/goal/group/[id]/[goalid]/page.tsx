import { GroupGoalDetailPage } from '../../../../../../page/goal';

export default function Page({
  params,
}: {
  params: { id: string; goalid: string };
}) {
  return <GroupGoalDetailPage params={params} />;
}
