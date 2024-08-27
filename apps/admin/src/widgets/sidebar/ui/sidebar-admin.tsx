import { client, ResponseWith, Sidebar } from '@jeiltodo/ui/shared';
import { Home, Group, Post } from '@jeiltodo/icons';
import { SidebarUserInfo } from '@jeiltodo/ui/features';
import { SidebarNav } from '../../../shared';
import { useQuery } from '@tanstack/react-query';

const userData = {
  id: 0,
  email: 'admin@jtodo.site',
  nickname: '관리자',
};

export const SidebarAdmin = () => {
  // const { data: userInfo } = useQuery({
  //   queryKey: ['admin', 'info'],
  //   queryFn: () =>
  //     client.get<
  //       ResponseWith<{
  //         id: number;
  //         nickname: string;
  //         email: string;
  //       }>
  //     >(`/member/info`),
  //   select: (data) => data.data.data,
  // });

  return (
    <Sidebar type='관리자 센터'>
      <SidebarUserInfo userInfo={userData} />
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
