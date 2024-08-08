import '../globals.css';
import { SidebarUser } from '../../widgets/user';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarUser />
      <main className='desktop:pl-[360px] tablet:pl-[84px]  tablet:pr-[24px] mobile:pl-[16px] mobile:pr-[16px] min-h-screen'>
        {children}
      </main>
    </>
  );
}
