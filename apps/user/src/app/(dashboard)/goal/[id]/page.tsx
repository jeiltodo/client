import { IndivDetailPage } from '../../../../page/goal';

export default function Page({ params }: { params: { id: number } }) {
  return <IndivDetailPage params={params} />;
}
