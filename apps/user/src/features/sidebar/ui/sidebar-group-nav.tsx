import { Plus, Search } from '@jeiltodo/icons';
import { Button } from '@jeiltodo/ui';
import { SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';

interface GroupProps {
  id: number;
  title: string;
}

interface SidebarGroupNavProps {
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  group: GroupProps[];
}

export const SidebarGroupNav = ({
  icon: Icon,
  title,
  group,
}: SidebarGroupNavProps) => {
  return (
    <div>
      <div className='px-6 py-[18px] flex items-center justify-start border-t-[1px] border-slate-200'>
        <Icon className='w-6 h-6' />
        <div className='block text-lg font-pretendard-medium text-slate-800'>
          {title}
        </div>
      </div>
      {group.map((item) => (
        <div
          key={item.id}
          className='block pl-8 py-2 text-sm font-pretendard-medium text-slate-700'
        >
          · {item.title}
        </div>
      ))}
    </div>
  );
};
