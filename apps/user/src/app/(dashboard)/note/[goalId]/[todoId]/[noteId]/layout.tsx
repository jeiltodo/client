import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USER NOTE | jeiltodo',
  description: 'jeiltodo 서비스의 유저의 노트 에디터 페이지입니다',
};

export default function NoteEditorLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <main className='common-layout bg-white'>{children}</main>;
}
