import { SidebarUser } from '../../widgets/user';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarUser />
      <main className='desktop:pl-[280px] tablet:pl-[60px] tablet:pt-0 mobile:pl-0 mobile:pt-[48px] bg-gray-100 min-h-screen'>
        {children}
      </main>
    </>
  );
}
