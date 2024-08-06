'use client';

import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';

import {
  DeleteMenu,
  Expand,
  Fold,
  HamburgerMenu,
  ImgLogo,
  LogoCheck,
} from '@jeiltodo/icons';

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
  const pathname = usePathname();
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);
  const [isTabletOpen, setIsTabletOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleDesktopSidebar = () => {
    setIsDesktopOpen(!isDesktopOpen);
  };

  const toggleTabletSidebar = () => {
    setIsTabletOpen(!isTabletOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className='min-w-[60px] desktop:min-w-[280px]'>
      {/* 데스크톱 버전 */}
      <div
        className={`desktop:flex mobile:hidden h-full fixed top-0 left-0 z-10
           transition-all duration-300 ease-in-out ${
             isDesktopOpen ? 'w-[280px]' : 'w-[60px]'
           } bg-white flex-col overflow-hidden`}
      >
        <div
          className={`sidebar-header flex ${isDesktopOpen ? 'items-center justify-between pt-3 px-5' : 'flex-col justify-center gap-3 pt-4 px-4'}`}
        >
          <div
            className={`items-center gap-2 ${isDesktopOpen ? 'flex' : 'hidden'}`}
          >
            <ImgLogo className='w-[106px] h-[35px]' />
            {type && (
              <p
                className={`font-pretendard-semibold text-sm text-[#3182F6] transition-all duration-300 whitespace-nowrap overflow-hidden ${
                  isDesktopOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
              >
                {type}
              </p>
            )}
          </div>
          <LogoCheck
            className={`w-[32px] h-[32px] ${isDesktopOpen ? 'hidden' : 'block'} `}
          />
          <div
            onClick={toggleDesktopSidebar}
            className='cursor-pointer flex items-center justify-center w-[32px] h-[32px]'
          >
            {isDesktopOpen ? (
              <Fold className='w-6 h-6' />
            ) : (
              <Expand className='w-6 h-6' />
            )}
          </div>
        </div>

        {/* {isDesktopOpen && (
          <>
            <div className='mt-3 mb-[18px] py-3'>
              <SidebarUserInfo userData={userData} />
            </div>
            {children}
          </>
        )} */}
      </div>

      {/* 태블릿 버전 */}
      <div
        className={`desktop:hidden tablet:flex mobile:hidden h-full fixed top-0 left-0 z-10
           transition-all duration-300 ease-in-out ${
             isTabletOpen ? 'w-[280px]' : 'w-[60px]'
           } bg-white flex-col overflow-hidden`}
      >
        <div
          className={`sidebar-header flex ${isTabletOpen ? 'items-center justify-between pt-3 px-5' : 'flex-col justify-center gap-3 pt-4 px-4'}`}
        >
          <div
            className={`items-center gap-2 ${isTabletOpen ? 'flex' : 'hidden'}`}
          >
            <ImgLogo className='w-[106px] h-[35px]' />
            {type && (
              <p
                className={`font-pretendard-semibold text-sm text-[#3182F6] transition-all duration-300 whitespace-nowrap overflow-hidden ${
                  isTabletOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
              >
                {type}
              </p>
            )}
          </div>
          <LogoCheck
            className={`w-[32px] h-[32px] ${isTabletOpen ? 'hidden' : 'block'} `}
          />
          <div
            onClick={toggleTabletSidebar}
            className='cursor-pointer flex items-center justify-center w-[32px] h-[32px]'
          >
            {isTabletOpen ? (
              <Fold className='w-6 h-6' />
            ) : (
              <Expand className='w-6 h-6' />
            )}
          </div>
        </div>

        {/* {isTabletOpen && (
          <>
            <div className='mt-3 mb-[18px] py-3'>
              <SidebarUserInfo userData={userData} />
            </div>
            {children}
          </>
        )} */}
      </div>

      {isTabletOpen && (
        <div
          onClick={toggleTabletSidebar}
          className={`desktop:hidden tablet:block mobile:hidden fixed top-0 right-0 opacity-50 bg-black z-20 transition-opacity transition-width duration-300 ease-in-out`}
          style={{
            width: `calc(100% - ${isTabletOpen ? '280px' : '60px'})`,
            height: '100%',
          }}
        ></div>
      )}

      {/* 모바일 버전 */}
      <div
        className={`tablet:hidden mobile:flex top-0 left-0 w-full transition-all duration-300 ease-in-out ${
          isMobileSidebarOpen ? 'h-full' : 'h-[48px]'
        } bg-white flex-col fixed overflow-hidden`}
      >
        {!isMobileSidebarOpen && (
          <div className='flex items-center justify-start gap-4 py-3 px-4'>
            <button onClick={toggleMobileSidebar} className='cursor-pointer'>
              <HamburgerMenu className='w-6 h-6' />
            </button>
            {pathname === '/' && (
              <div className='text-base font-pretendard-semibold'>대시보드</div>
            )}
          </div>
        )}
        {isMobileSidebarOpen && (
          <div className='flex items-center justify-between py-3 px-4'>
            <ImgLogo className='w-[106px] h-[35px]' />
            <button onClick={toggleMobileSidebar} className='cursor-pointer'>
              <DeleteMenu className='w-6 h-6' />
            </button>
          </div>
        )}

        {/* {isMobileSidebarOpen && (
          <>
            <div className='mt-3 mb-[18px] py-3 '>
              <SidebarUserInfo userData={userData} />
            </div>
            {children}
          </>
        )} */}
      </div>
    </div>
  );
};

export default Sidebar;
