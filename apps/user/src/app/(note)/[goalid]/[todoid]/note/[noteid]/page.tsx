import { ToastContainer } from 'react-toastify';
import { EditorPage } from '../../../../../../pages/note';

export default function NoteEditor() {
  return (
    <main className='desktop:pl-[360px] tablet:pl-[84px]  tablet:pr-[24px] mobile:pl-[16px] mobile:pr-[16px] bg-white min-h-screen'>
      <ToastContainer limit={1} />
      <EditorPage />
    </main>
  );
}
