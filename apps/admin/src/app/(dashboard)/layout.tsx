import { SidebarAdmin } from '../../widgets/sidebar/ui/sidebar-admin';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarAdmin />
      <main>{children}</main>
    </>
  );
}