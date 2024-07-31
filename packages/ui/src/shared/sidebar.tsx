import React, { ReactNode } from 'react';

interface SidebarProps {
  children?: ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className='sidebar-container bg-gray-800 text-white h-full w-[240px] flex flex-col'>
      {/* 로고 또는 헤더 */}
      <div className='sidebar-header flex items-center justify-center p-4'>
        <h1 className='text-2xl font-bold'>Logo</h1>
      </div>

      {/* 탐색 링크 */}
      <nav className='sidebar-nav flex-grow'>
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

      {/* 사용자 정보 */}
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

      {/* 자식 요소 (추가 콘텐츠) */}
      <div className='additional-content p-4'>{children}</div>
    </div>
  );
};
