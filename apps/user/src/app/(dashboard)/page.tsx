import Link from 'next/link';
import { UserDashboardPage } from '../../pages/user/ui/user-dashboard-page';

export default function Page() {
  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery(progressOptions());

  return (
    <main className='p-4 '>
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      <UserDashboardPage />
      <Link
        className='border border-blue-400'
        href={`/goal/aaa/9`}
      >{`[ aaa@gmail.com / a123456! ] aaa 회원의 goalid:9 의 상세 페이지로 이동`}</Link>
      {/* </HydrationBoundary> */}
    </main>
  );
}
