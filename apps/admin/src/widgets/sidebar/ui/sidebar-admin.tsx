import { Sidebar } from '@jeiltodo/ui';
import { SidebarNav } from '../../../shared/ui/sidebar/sidebar-nav';
import { Home, Group, Post } from '@jeiltodo/icons';

export const SidebarAdmin = () => {
  return (
    <Sidebar type="관리자 센터">
      <SidebarNav icon={Home} title='회원관리' href='/' />
      <SidebarNav icon={Group} title='그룹관리' href='/group' />
      <SidebarNav
        icon={Post}
        title='게시글 관리'
        subItems={[
          { title: '개인 게시물 관리', href: '/posts/personal' },
          { title: '그룹 게시물 관리', href: '/posts/group' },
        ]}
      />
    </Sidebar>
  );
};
