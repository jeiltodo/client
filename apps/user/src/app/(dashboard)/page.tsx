import { UserDashboardPage } from '../../pages/user/ui/user-dashboard-page';

export default function Page() {
  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery(progressOptions());

  return (
    <main className='p-4 '>
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      <UserDashboardPage />
      {/* </HydrationBoundary> */}
    </main>
  );
}
