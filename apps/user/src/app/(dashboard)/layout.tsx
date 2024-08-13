import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { individualGoalsOptions } from '../../entities/goal/hooks/individualOptions';
import { getQueryClient } from '../../entities/goal/get-query-client';
import { SidebarUser } from '../../widgets/user';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(individualGoalsOptions());

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SidebarUser />
      </HydrationBoundary>

      <main className='desktop:pl-[280px] tablet:pl-[60px] tablet:pt-0 mobile:pl-0 mobile:pt-[48px] bg-gray-100 min-h-screen'>
        {children}
      </main>
    </>
  );
}
