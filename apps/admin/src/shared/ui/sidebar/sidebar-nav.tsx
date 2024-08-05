import Link from 'next/link';
import { SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';

interface SidebarNavProps {
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  href?: string;
  subItems?: { title: string; href: string }[];
}

export const SidebarNav = ({
  icon: Icon,
  title,
  href,
  subItems,
}: SidebarNavProps) => {
  return (
    <div>
      <div className='px-5 py-[18px] flex items-center justify-start gap-2 border-t-[1px] border-slate-200'>
        <Icon className='w-6 h-6' />
        {subItems ? (
          <div className='text-lg font-pretendard-medium text-slate-800'>
            {title}
          </div>
        ) : (
          <Link href={href || ''} className='block text-lg font-pretendard-medium text-slate-800'>
            {title}
          </Link>
        )}
      </div>
      {subItems && (
        <div className='flex flex-col items-start pl-5'>
          {subItems.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className='block py-2 text-sm font-pretendard-medium text-slate-700'
            >
              · {subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
