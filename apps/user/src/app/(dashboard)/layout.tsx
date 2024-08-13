import { SidebarUser } from '../../widgets/user';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarUser />
      <main className='common-layout bg-gray-100'> {children}</main>
    </>
  );
}
