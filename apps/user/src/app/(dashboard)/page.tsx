import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { UserDashboardPage } from '../../page/user';
import { getQueryClient } from '../../shared';
import { progressAllOptions } from '../../entities/goal';

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(progressAllOptions());
  return (
    <main className='pt-4'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserDashboardPage />
      </HydrationBoundary>
    </main>
  );
}
