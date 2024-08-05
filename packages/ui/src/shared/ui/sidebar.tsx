'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import {
  DeleteMenu,
  Expand,
  Fold,
  HamburgerMenu,
  ImgLogo,
  LogoCheck,
} from '@jeiltodo/icons';
import { useResponsive } from './../hooks/useResponsive';
import { SidebarUserInfo } from './sidebar-user-info';

interface SidebarProps {
  type?: string;
  children?: ReactNode;
}

const userData = {
  id: 6,
  email: 'ross1222@naver.com',
  name: '닉네임1',
  createdAt: '2024-08-01T00:32:06.587081',
  updatedAt: '2024-08-01T00:32:06.587097',
};

export const Sidebar = ({ type, children }: SidebarProps) => {
  const isTablet = useResponsive();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(!isTablet);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const toggleMobileSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsSidebarExpanded(!isTablet);
  }, [isTablet]);

  return (
    <div className='min-w-[280px]'>
      <div
        className={`tablet:flex mobile:hidden h-full fixed top-0 left-0
           transition-all duration-300 ease-in-out ${
             isSidebarExpanded ? 'w-[280px]' : 'w-[60px]'
           } bg-white flex-col overflow-hidden`}
      >
        <div
          className={`sidebar-header flex ${isSidebarExpanded ? 'items-center justify-between pt-3 px-5' : 'flex-col justify-center gap-3 pt-4 px-4'}`}
        >
          <div
            className={`flex items-center gap-2 ${isSidebarExpanded ? 'block' : 'hidden'} transition-none`}
          >
            <ImgLogo className='w-[106px] h-[35px]' />
            {type && (
              <p
                className={`font-pretendard-semibold text-sm text-[#3182F6] transition-all duration-300 whitespace-nowrap overflow-hidden ${
                  isSidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
              >
                {type}
              </p>
            )}
          </div>
          <LogoCheck
            className={`w-[32px] h-[32px] ${isSidebarExpanded ? 'hidden' : 'block'} `}
          />
          <div
            onClick={toggleSidebar}
            className='cursor-pointer flex items-center justify-center w-[32px] h-[32px]'
          >
            {isSidebarExpanded ? (
              <Fold className='w-6 h-6' />
            ) : (
              <Expand className='w-6 h-6' />
            )}
          </div>
        </div>

        {isSidebarExpanded && (
          // 엔티티에 get으로 프로필 및 유저 정보
          <>
            <div className='mt-3 mb-[18px] py-3'>
              <SidebarUserInfo userData={userData} />
            </div>
            {children}
          </>
        )}
      </div>

      {isSidebarExpanded && (
        <div
          onClick={toggleSidebar}
          className={`desktop:hidden tablet:block mobile:hidden fixed top-0 right-0 opacity-50 bg-black z-30 transition-opacity transition-width duration-300 ease-in-out`}
          style={{
            width: `calc(100% - ${isSidebarExpanded ? '280px' : '60px'})`,
            height: '100%',
          }}
        ></div>
      )}

      {/* mobile version */}
      <div
        className={`tablet:hidden top-0 left-0 w-full transition-all duration-300 ease-in-out ${
          isOpen ? 'h-full' : 'h-[48px]'
        } bg-white flex flex-col fixed overflow-hidden`}
      >
        {/* onClose */}
        {!isOpen && (
          <div className='flex items-center justify-start gap-4 py-3 px-4'>
            <button onClick={toggleMobileSidebar} className='cursor-pointer'>
              <HamburgerMenu className='w-6 h-6' />
            </button>
            {pathname === '/' && (
              <div className='text-base font-pretendard-semibold'>대시보드</div>
            )}
          </div>
        )}
        {/* onOpen */}
        {isOpen && (
          <div className='flex items-center justify-between py-3 px-4'>
            <ImgLogo className='w-[106px] h-[35px]' />
            <button onClick={toggleMobileSidebar} className='cursor-pointer'>
              <DeleteMenu className='w-6 h-6' />
            </button>
          </div>
        )}

        {isOpen && (
          // 엔티티에 get으로 프로필 및 유저 정보
          <>
            <div className='mt-3 mb-[18px] py-3 '>
              <SidebarUserInfo userData={userData} />
            </div>
            {children}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
