'use client';

import { useParams } from 'next/navigation';
import { LoadingSpinner } from '@jeiltodo/ui/shared';
import { useNoteDetail } from '../../../../../../entities/note';
import { EditorPage } from '../../../../../../page/note';

export default function NoteEditor() {
  const params = useParams();
  const noteId = params.noteId as string;

  const { noteDetail } = useNoteDetail(noteId);
  if (noteId !== 'new' && !noteDetail) return <LoadingSpinner />;
  return <EditorPage note={noteDetail} />;
}
