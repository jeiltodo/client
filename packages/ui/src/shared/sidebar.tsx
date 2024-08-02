'use client';
import { Expand, Fold, ImgLogo, LogoCheck } from '@jeiltodo/icons';
import React, { ReactNode, useState } from 'react';

// interface SidebarProps {
//   children: ReactNode;
// }

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div
        className={`tablet:flex mobile:hidden h-full fixed top-0 left-0
           transition-all duration-300 ease-in-out ${
             isSidebarExpanded ? 'w-[280px]' : 'w-[60px]'
           } bg-white flex-col overflow-hidden px-4`}
      >
        <div
          className={`sidebar-header flex ${isSidebarExpanded ? 'items-center justify-between pt-3' : 'flex-col justify-center gap-3 pt-4'}`}
        >
          <div
            className={`flex items-center gap-2 ${isSidebarExpanded ? 'block' : 'hidden'} transition-none`}
          >
            <ImgLogo className='w-[106px] h-[35px]' />
            <p
              className={`font-pretendard-semibold text-sm text-[#3182F6] transition-all duration-300 whitespace-nowrap overflow-hidden ${
                isSidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
              }`}
            >
              관리자 센터
            </p>
          </div>
          <LogoCheck className={`w-[32px] h-[32px] ${isSidebarExpanded ? 'hidden' : 'block'} `} />
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
          <div className='pt-3 pb-[18px]'>
            
          </div>
        )}

  
      </div>

      {/* Sidebar Overlay for Tablet */}
      {!isSidebarExpanded && isOpen && (
        <div
          onClick={closeSidebar}
          className='fixed top-0 left-0 w-full h-full bg-black opacity-50'
        ></div>
      )}

      {/* Sidebar for Mobile */}
      <div
        className={`tablet:hidden top-0 left-0 w-full transition-all duration-300 ease-in-out ${
          isOpen ? 'h-full' : 'h-[48px]'
        } bg-gray-800 text-white flex flex-col fixed overflow-hidden`}
      >
        {/* Mobile Toggle Button */}
        {!isOpen && (
          <button
            onClick={openSidebar}
            className='absolute top-0 left-0 p-2 text-white'
          >
            열기
          </button>
        )}

        {/* Mobile Close Button */}
        {isOpen && (
          <button
            onClick={closeSidebar}
            className='absolute top-4 right-4 p-2 text-white'
          >
            닫기
          </button>
        )}

        {/* Mobile Header */}
        <div className='sidebar-header flex items-center justify-center p-4'>
          <h1 className='text-2xl font-bold'>Logo</h1>
        </div>

        {/* Mobile Navigation Links */}
        {isOpen && (
          <nav className='flex-grow'>
            <ul className='flex flex-col p-4 space-y-4'>
              <li>
                <a
                  href='/home'
                  className='flex items-center px-4 py-2 text-lg rounded-md hover:bg-gray-700'
                >
                  <span className='icon mr-2'>🏠</span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href='/about'
                  className='flex items-center px-4 py-2 text-lg rounded-md hover:bg-gray-700'
                >
                  <span className='icon mr-2'>ℹ️</span>
                  About
                </a>
              </li>
              <li>
                <a
                  href='/contact'
                  className='flex items-center px-4 py-2 text-lg rounded-md hover:bg-gray-700'
                >
                  <span className='icon mr-2'>📞</span>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        )}

        {/* Mobile User Info */}
        {isOpen && (
          <div className='sidebar-footer p-4'>
            <div className='flex items-center'>
              <div className='avatar w-10 h-10 bg-gray-600 rounded-full'></div>
              <div className='ml-3'>
                <p className='text-sm'>John Doe</p>
                <a href='/profile' className='text-xs text-gray-400'>
                  View Profile
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
