import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { individualGoalsOptions } from '../../entities/goal';
import { getQueryClient } from '../../entities/goal/get-query-client';
import { SidebarUser } from '../../widgets/user';
import { groupOptions } from '../../entities/group/index';
import { userOptions } from '../../entities/user';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(individualGoalsOptions());
  await queryClient.prefetchQuery(groupOptions());
  await queryClient.prefetchQuery(userOptions());

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SidebarUser />
      </HydrationBoundary>

      <main className='common-layout bg-gray-100'>{children}</main>
    </>
  );
}
