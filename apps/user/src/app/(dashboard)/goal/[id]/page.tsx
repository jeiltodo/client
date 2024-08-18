import { IndivDetailPage } from '../../../../page/goal/individual/individual-detail-page';

export default function Page({ params }: { params: { id: number } }) {
  return <IndivDetailPage params={params} />;
}
