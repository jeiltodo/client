import { IndivDetailPage } from '../../../../../page/goal';

export default function Page({ params }: { params: { goalid: number } }) {
  return <IndivDetailPage params={params} />;
}
