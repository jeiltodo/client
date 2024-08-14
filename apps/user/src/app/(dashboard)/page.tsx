import { UserDashboardPage } from '../../page/user';

export default async function Page() {
  return (
    <main className='pt-4'>
      <UserDashboardPage />
      {/* </HydrationBoundary> */}
    </main>
  );
}
