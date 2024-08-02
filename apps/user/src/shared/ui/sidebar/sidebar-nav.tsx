import Link from 'next/link';
import { SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';

interface SidebarNavProps {
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  href: string;
}

export const SidebarNav = ({ icon: Icon, title, href }: SidebarNavProps) => {
  return (
    <div>
      <div className='px-6 py-[18px] flex items-center justify-start gap-2 border-t-[1px] border-slate-200'>
        <Icon className='w-6 h-6' />

        <Link
          href={href}
          className='block text-lg font-pretendard-medium text-slate-800'
        >
          {title}
        </Link>
      </div>
    </div>
  );
};
