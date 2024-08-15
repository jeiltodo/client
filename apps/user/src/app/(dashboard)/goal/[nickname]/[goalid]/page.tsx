import { IndivDetailPage } from '../../../../../page/goal';

export default function Page({
  params,
}: {
  params: { goalid: number; nickname: string };
}) {
  return <IndivDetailPage params={params} />;
}
