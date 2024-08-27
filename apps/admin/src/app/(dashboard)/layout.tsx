import { SidebarAdmin } from '../../widgets/sidebar/ui/sidebar-admin';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarAdmin />
      <main className='common-layout bg-slate-100'>{children}</main>
    </>
  );
}
