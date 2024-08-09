import { SidebarUser } from '../../widgets/user';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarUser />
      {children}
    </>
  );
}
