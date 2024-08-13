import { DetailPage } from '../../../../../page/goal';

export default function Page({ params }: { params: { goalid: string } }) {
  return <DetailPage params={params} />;
}
