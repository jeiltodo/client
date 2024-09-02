import Link from 'next/link';
import type { SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';

interface SidebarNavProps {
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  href?: string;
  subItems?: { title: string; href: string }[];
}

export function SidebarNav({
  icon: Icon,
  title,
  href,
  subItems,
}: SidebarNavProps) {
  return (
    <div className='px-5 py-4 border-t-[1px] border-slate-200'>
      {subItems ? (
        <div className='w-full h-9 flex items-center justify-start gap-2'>
          <Icon className='w-6 h-6' />
          <div className='text-lg font-pretendard-medium text-slate-800'>
            {title}
          </div>
        </div>
      ) : (
        <Link
          className='hover:bg-slate-50 active:bg-slate-100 w-full h-9 rounded-lg  flex items-center justify-start gap-2'
          href={href || ''} 
        >
          <Icon className='w-6 h-6' />
          <div className='block text-lg font-pretendard-medium text-slate-800'>
            {title}
          </div>
        </Link>
      )}

      {subItems ? <div className='flex flex-col items-start pl-5 mt-2'>
          {subItems.map((subItem, index) => (
            <Link
              className='block py-2 text-sm hover:bg-slate-50 active:bg-slate-100 w-full h-9 rounded-lg font-pretendard-medium text-slate-700'
              href={subItem.href}
              key={index}
            >
              · {subItem.title}
            </Link>
          ))}
        </div> : null}
    </div>
  );
}
