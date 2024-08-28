'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

import { DeleteMenu, Expand, Fold, HamburgerMenu } from '@jeiltodo/icons';

interface SidebarProps {
  type?: string;
  children?: ReactNode;
}

export const Sidebar = ({ type, children }: SidebarProps) => {
  const pathname = usePathname();
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);
  const [isTabletOpen, setIsTabletOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const router = useRouter();

  const toggleDesktopSidebar = () => {
    setIsDesktopOpen(!isDesktopOpen);
  };

  const toggleTabletSidebar = () => {
    setIsTabletOpen(!isTabletOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  return (
    <div
      className={`min-w-[60px] desktop:min-w-[280px] relative z-30 ${isMobileSidebarOpen ? ' overflow-hidden' : ' overflow-auto'}`}
    >
      {/* 데스크톱 버전 */}
      <div
        className={`desktop:flex hidden h-full fixed top-0 left-0 z-10
          transition-all duration-200 ease-in-out ${
            isDesktopOpen ? 'w-[280px]' : 'w-[60px]'
          } bg-white flex-col overflow-hidden`}
      >
        <div
          className={`sidebar-header flex items-center ${isDesktopOpen ? 'justify-between pt-3 px-5' : 'flex-col justify-center gap-3 pt-4 px-4'}`}
        >
          <div
            className={`items-center gap-2 ${isDesktopOpen ? 'flex' : 'hidden'} `}
          >
            <Image
              src={type ? '/admin/logo.png' : '/logo.png'}
              alt='Logo'
              width={100}
              height={30}
              className='cursor-pointer'
              onClick={() => {
                router.push('/');
              }}
            />
            {type && (
              <h1
                className={`font-pretendard-semibold text-sm text-[#3182F6] transition-all duration-200 whitespace-nowrap overflow-hidden ${
                  isDesktopOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
              >
                {type}
              </h1>
            )}
          </div>
          <Image
            src={type ? '/admin/s-logo.png' : '/s-logo.png'}
            alt='Logo'
            width={24}
            height={24}
            className={`cursor-pointer ${isDesktopOpen ? 'hidden' : 'block'}`}
            onClick={() => {
              router.push('/');
            }}
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
        <div
          className={`transition-all duration-300 ease-in-out ${
            isDesktopOpen
              ? 'opacity-100 translate-x-0 delay-50'
              : 'opacity-0 -translate-x-full'
          }`}
        >
          {children}
        </div>
      </div>

      {/* 태블릿 버전 */}
      <div
        className={`desktop:hidden tablet:flex hidden h-full fixed top-0 left-0 z-10
          transition-all duration-200 ease-in-out ${
            isTabletOpen ? 'w-[280px]' : 'w-[60px]'
          } bg-white flex-col overflow-hidden`}
      >
        <div
          className={`sidebar-header flex items-center ${isTabletOpen ? 'justify-between pt-3 px-5' : 'flex-col justify-center gap-3 pt-4 px-4'}`}
        >
          <div
            className={`items-center gap-2 ${isTabletOpen ? 'flex' : 'hidden'}`}
          >
            <Image
              src={type ? '/admin/logo.png' : '/logo.png'}
              alt='Logo'
              width={100}
              height={30}
              className='cursor-pointer'
              onClick={() => {
                router.push('/');
              }}
            />
            {type && (
              <p
                className={`font-pretendard-semibold text-sm text-[#3182F6] transition-all duration-200 whitespace-nowrap overflow-hidden ${
                  isTabletOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
              >
                {type}
              </p>
            )}
          </div>
          <Image
            src={type ? '/admin/s-logo.png' : '/s-logo.png'}
            alt='Logo'
            width={24}
            height={24}
            className={`cursor-pointer ${isDesktopOpen ? 'hidden' : 'block'}`}
            onClick={() => {
              router.push('/');
            }}
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
        <div
          className={`transition-all duration-300 ease-in-out ${
            isTabletOpen
              ? 'opacity-100 translate-x-0 delay-50'
              : 'opacity-0 -translate-x-full'
          }`}
        >
          {children}
        </div>
      </div>

      {isTabletOpen && (
        <div
          onClick={toggleTabletSidebar}
          className={`desktop:hidden tablet:block mobile:hidden fixed top-0 right-0 opacity-50 bg-[#000000] z-20 transition-all duration-200 ease-in-out`}
          style={{
            width: `calc(100% - ${isTabletOpen ? '280px' : '60px'})`,
            height: '100%',
          }}
        ></div>
      )}

      {/* 모바일 버전 */}
      <div
        className={`tablet:hidden flex top-0 left-0 w-full transition-all duration-200 ease-in-out ${
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
            <Image
              src={type ? '/admin/logo.png' : '/logo.png'}
              alt='Logo'
              width={100}
              height={30}
              className='cursor-pointer'
              onClick={() => {
                router.push('/');
              }}
            />
            <button onClick={toggleMobileSidebar} className='cursor-pointer'>
              <DeleteMenu className='w-6 h-6' />
            </button>
          </div>
        )}

        {isMobileSidebarOpen && <>{children}</>}
      </div>
    </div>
  );
};

export default Sidebar;
