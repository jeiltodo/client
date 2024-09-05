import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@jeiltodo/ui/entities';
import { SidebarUser } from '../../widgets/user';
import { groupOptions } from '../../entities/group/index';
import { userOptions } from '../../entities/user';
import {
  individualGoalsOptions,
  progressAllOptions,
} from '../../entities/goal/hooks';

export const runtime = 'edge';

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarUser />
      <main>{children}</main>
    </HydrationBoundary>
  );
}
