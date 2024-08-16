import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '../../entities/goal/get-query-client';
import { SidebarUser } from '../../widgets/user';
import { groupOptions } from '../../entities/group/index';
import { userOptions } from '../../entities/user';
import { individualGoalsOptions } from '../../entities/goal/hooks/individualOptions';
import { progressAllOptions } from '../../entities/goal/hooks/progressAllOptions';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(userOptions());
  await queryClient.prefetchQuery(individualGoalsOptions());
  await queryClient.prefetchQuery(groupOptions());
  await queryClient.prefetchQuery(progressAllOptions());

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SidebarUser />
        <main className='common-layout bg-slate-100'>{children}</main>
      </HydrationBoundary>
    </>
  );
}
