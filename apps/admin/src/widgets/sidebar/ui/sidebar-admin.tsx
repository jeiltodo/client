'use client';
import { Sidebar } from '@jeiltodo/ui/shared';
import { Home, Group, Post } from '@jeiltodo/icons';
import { SidebarUserInfo } from '@jeiltodo/ui/features';
import { SidebarNav } from '../../../shared';
import { useQuery } from '@tanstack/react-query';
import { userOptions } from '../../../entities/user';

export const SidebarAdmin = () => {

  const { data: userInfo } = useQuery(userOptions());

  return (
    <Sidebar type='관리자 센터'>
      <SidebarUserInfo userInfo={userInfo} isAdmin={true} />
      <SidebarNav icon={Home} title='회원관리' href='/' />
      <SidebarNav icon={Group} title='그룹관리' href='/group' />
      <SidebarNav
        icon={Post}
        title='게시글 관리'
        subItems={[
          { title: '개인 게시물 관리', href: '/goals/individual' },
          { title: '그룹 게시물 관리', href: '/goals/group' },
        ]}
      />
    </Sidebar>
  );
};
