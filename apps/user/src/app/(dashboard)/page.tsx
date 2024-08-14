import { UserDashboardPage } from "../../page/user";

export default function Page() {
  return (
    <main className='pt-4'>
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      <UserDashboardPage />
    </main>
  );
}
