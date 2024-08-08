import '../../globals.css';
import '@jeiltodo/ui/styles.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USER NOTE | jeiltodo',
  description: 'jeiltodo 서비스의 유저의 노트 페이지입니다',
};

export default function NoteLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <>{children}</>;
}
