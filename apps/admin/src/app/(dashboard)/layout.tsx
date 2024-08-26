import { SidebarAdmin } from '../../widgets/sidebar/ui/sidebar-admin';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarAdmin />
      <main className='common-layout font-pretendard-regular'>{children}</main>
    </>
  );
}
