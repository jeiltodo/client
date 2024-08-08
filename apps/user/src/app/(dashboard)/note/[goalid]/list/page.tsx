import { ToastContainer } from 'react-toastify';
import { ListPage } from '../../../../../pages/note';

export default function NoteList() {
  return (
    <main>
      <ToastContainer limit={1} />
      <ListPage />;
    </main>
  );
}
