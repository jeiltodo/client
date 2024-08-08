import { ToastContainer } from 'react-toastify';
import { ListPage } from '../../../../../pages/note';

export default function NoteList() {
  return (
    <main className='desktop:pl-[360px] tablet:pl-[84px]  tablet:pr-[24px] mobile:pl-[16px] mobile:pr-[16px] bg-slate-100 min-h-screen'>
      <ToastContainer limit={1} />
      <ListPage />;
    </main>
  );
}
