// import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
// import { progressOptions } from '../../features/goal/api/progressOptions';
import { UserDashboardPage } from '../../pages/user/ui/user-dashboard-page';
import { getQueryClient } from '../../shared';

export const logger = {
  log: (message: string) => {
    if (typeof window === 'undefined') {
      console.log(`[Server] ${message}`);
    } else {
      console.log(`[Client] ${message}`);
    }
  },
};

export default function Page() {
  // logger.log('Rendering Page component');
  // const queryClient = getQueryClient();
  // void queryClient.prefetchQuery(progressOptions);
  // logger.log('Data prefetched');

  return (
    <main className='p-4 '>
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      <UserDashboardPage />
      {/* </HydrationBoundary> */}
    </main>
  );
}
