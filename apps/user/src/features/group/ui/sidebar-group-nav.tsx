import { SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';
import { GroupProps } from '../model/type';
import Link from 'next/link';
import { Group } from '@jeiltodo/icons';

interface SidebarGroupNavProps {
  group: GroupProps[] | undefined;
}

export const SidebarGroupNav = ({ group }: SidebarGroupNavProps) => {
  return (
    <div className=' flex flex-col gap-4 my-4 max-h-[176px] overflow-y-scroll scrollbar-hide'>
      {group?.length !== 0 ? (
        <>
          {group?.map((item) => (
            <div
              key={item.id}
              className='px-5 flex items-center justify-start gap-2 relative w-full h-9'
            >
              <Link href={`/group/${item.id}`} className='w-full'>
                <div className='flex items-center justify-start gap-2 tablet:w-[240px] w-full h-9 hover:bg-slate-50 active:bg-slate-100 rounded-lg'>
                  <Group className='w-6 h-6' />
                  <div className='block text-lg font-pretendard-medium text-slate-800'>
                    {item.title}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </>
      ) : (
        <div className='px-5 flex items-center text-sm font-pretendard-medium text-gray-500 tablet:w-[240px] w-full h-9'>
          Tip. 다른 사람들과 함께 목표를 달성해 보세요
        </div>
      )}
    </div>
  );
};
