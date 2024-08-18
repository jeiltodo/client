import { IndividualGoalDetailPage } from '../../../../page/goal';

export default function Page({ params }: { params: { id: number } }) {
  return <IndividualGoalDetailPage params={params} />;
}
