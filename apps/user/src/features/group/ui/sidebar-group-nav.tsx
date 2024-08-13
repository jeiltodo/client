import { SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';
import { GroupProps } from '../model/type';
import Link from 'next/link';

interface SidebarGroupNavProps {
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  group: GroupProps[] | undefined;
}

export const SidebarGroupNav = ({
  icon: Icon,
  group,
}: SidebarGroupNavProps) => {
  return (
    <div className='border-t-[1px] border-slate-200 flex flex-col gap-4 py-4 max-h-[178px] overflow-y-scroll scrollbar-hide'>
      {group?.map((item) => (
        <div
          key={item.id}
          className='px-5 flex items-center justify-start gap-2 relative w-full h-9'
        >
          <Link href={`/groups/${item.id}`} className='w-full'>
            <div className='flex items-center justify-start gap-2 tablet:w-[240px] w-full h-9 hover:bg-slate-50 active:bg-slate-100 rounded-lg'>
              <Icon className='w-6 h-6' />
              <div className='block text-lg font-pretendard-medium text-slate-800'>
                {item.title}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
