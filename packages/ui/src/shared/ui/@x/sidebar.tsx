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
    <nav className={`min-w-[60px] desktop:min-w-[280px] relative z-30 ${isMobileSidebarOpen ? ' overflow-hidden' : ' overflow-auto'}`}>
      {/* 데스크톱 버전 */}
      <section
        className={`desktop:flex hidden h-full fixed top-0 left-0 z-10 transition-all duration-200 ease-in-out  ${
          isDesktopOpen ? 'w-[280px]' : 'w-[60px]'
        } bg-white flex-col overflow-hidden`}
      >
        <header
          className={`sidebar-header flex items-center ${isDesktopOpen ? 'justify-between pt-3 px-5' : 'flex-col justify-center gap-3 pt-4 px-4'}`}
        >
          <div className={`items-center gap-2 ${isDesktopOpen ? 'flex' : 'hidden'} `}>
            <Image
              alt='Logo'
              className='cursor-pointer'
              height={30}
              onClick={() => {
                router.push('/');
              }}
              src={type ? '/admin/assets/logo.png' : '/assets/logo.png'}
              width={100}
            />
            {type ? (
              <h1
                className={`font-pretendard-semibold text-sm text-[#3182F6] transition-all duration-200 whitespace-nowrap overflow-hidden ${
                  isDesktopOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
              >
                {type}
              </h1>
            ) : null}
          </div>
          <Image
            alt='Logo'
            className={`cursor-pointer ${isDesktopOpen ? 'opacity-0' : 'opacity-100'}`}
            height={24}
            onClick={() => {
              router.push('/');
            }}
            src={type ? '/admin/assets/s-logo.png' : '/assets/s-logo.png'}
            width={24}
          />
          <button
            className='cursor-pointer flex items-center justify-center w-[32px] h-[32px]'
            onClick={toggleDesktopSidebar}
            type='button'
          >
            {isDesktopOpen ? <Fold className='w-6 h-6' /> : <Expand className='w-6 h-6' />}
          </button>
        </header>
        <div
          className={`transition-opacity duration-300 ease-out ${
            isDesktopOpen ? 'opacity-100 block' : 'opacity-0 hidden'
          }`}
        >
          {children}
        </div>
      </section>

      {/* 태블릿 버전 */}
      <section
        className={`desktop:hidden tablet:flex hidden h-full fixed top-0 left-0 z-10 transition-all duration-200 ease-in-out ${
          isTabletOpen ? 'w-[280px]' : 'w-[60px]'
        } bg-white flex-col overflow-hidden`}
      >
        <header
          className={`sidebar-header flex items-center ${isTabletOpen ? 'justify-between pt-3 px-5' : 'flex-col justify-center gap-3 pt-4 px-4'}`}
        >
          <div className={`items-center gap-2 ${isTabletOpen ? 'flex' : 'hidden'}`}>
            <Image
              alt='Logo'
              className='cursor-pointer'
              height={30}
              onClick={() => {
                router.push('/');
              }}
              src={type ? '/admin/assets/logo.png' : '/assets/logo.png'}
              width={100}
            />
            {type ? (
              <p
                className={`font-pretendard-semibold text-sm text-[#3182F6] transition-all duration-200 whitespace-nowrap overflow-hidden ${
                  isTabletOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
              >
                {type}
              </p>
            ) : null}
          </div>
          <Image
            alt='Logo'
            className={`cursor-pointer ${isDesktopOpen ? 'hidden' : 'block'}`}
            height={24}
            onClick={() => {
              router.push('/');
            }}
            src={type ? '/admin/assets/s-logo.png' : '/assets/s-logo.png'}
            width={24}
          />
          <button
            className='cursor-pointer flex items-center justify-center w-[32px] h-[32px]'
            onClick={toggleTabletSidebar}
            type='button'
          >
            {isTabletOpen ? <Fold className='w-6 h-6' /> : <Expand className='w-6 h-6' />}
          </button>
        </header>
        <div
          className={`transition-all duration-300 ease-in-out ${
            isTabletOpen ? 'opacity-100 translate-x-0 delay-50' : 'opacity-0 -translate-x-full'
          }`}
        >
          {children}
        </div>
      </section>

      {/* 모바일 버전 */}
      <section
        className={`tablet:hidden flex top-0 left-0 w-full transition-all duration-200 ease-in-out ${
          isMobileSidebarOpen ? 'h-full' : 'h-[48px]'
        } bg-white flex-col fixed overflow-hidden`}
      >
        <header className='flex items-center justify-start gap-4 py-3 px-4'>
          {!isMobileSidebarOpen && (
            <button className='cursor-pointer' onClick={toggleMobileSidebar} type='button'>
              <HamburgerMenu className='w-6 h-6' />
            </button>
          )}
          {pathname === '/' && <div className='text-base font-pretendard-semibold'>대시보드</div>}
        </header>
        {isMobileSidebarOpen ? <header className='flex items-center justify-between py-3 px-4'>
            <Image
              alt='Logo'
              className='cursor-pointer'
              height={30}
              onClick={() => {
                router.push('/');
              }}
              src={type ? '/admin/assets/logo.png' : '/assets/logo.png'}
              width={100}
            />
            <button className='cursor-pointer' onClick={toggleMobileSidebar} type='button'>
              <DeleteMenu className='w-6 h-6' />
            </button>
          </header> : null}

        {isMobileSidebarOpen ? <>{children}</> : null}
      </section>
    </nav>
  );
};

export default Sidebar;
