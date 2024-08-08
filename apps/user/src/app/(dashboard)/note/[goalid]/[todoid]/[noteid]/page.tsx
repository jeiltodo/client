import { ToastContainer } from 'react-toastify';
import { EditorPage } from '../../../../../../pages/note';

export default function NoteEditor() {
  return (
    <main>
      <ToastContainer limit={1} />
      <EditorPage />
    </main>
  );
}
