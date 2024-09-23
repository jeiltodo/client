'use client';
import { Sidebar } from '@jeiltodo/ui/shared';
import { Home, Group, Post } from '@jeiltodo/icons';
import { SidebarUserInfo } from '@jeiltodo/ui/features/user/ui';
import { useQuery } from '@tanstack/react-query';
import { SidebarNav } from '../../../shared';
import { userOptions } from '../../../entities/user';

export function SidebarAdmin() {
  const { data: userInfo } = useQuery(userOptions());

  return (
    <Sidebar type='관리자 센터'>
      <SidebarUserInfo isAdmin userInfo={userInfo} />
      <SidebarNav href='/' icon={Home} title='회원관리' />
      <SidebarNav href='/group' icon={Group} title='그룹관리' />
      <SidebarNav
        icon={Post}
        subItems={[
          { title: '개인 게시물 관리', href: '/goals/individual' },
          { title: '그룹 게시물 관리', href: '/goals/group' },
        ]}
        title='게시글 관리'
      />
    </Sidebar>
  );
}
