import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { SidebarAdmin } from '../../widgets/sidebar/ui/sidebar-admin';
import { userOptions } from '../../entities/user';
import { getQueryClient } from '@jeiltodo/ui/entities';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(userOptions());
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SidebarAdmin />
        <main className='common-layout font-pretendard-regular'>
          {children}
        </main>
      </HydrationBoundary>
    </>
  );
}
