'use client';

import { useParams } from 'next/navigation';
import { useNoteDetail } from '../../../../../../entities/note';
import { EditorPage } from '../../../../../../page/note';
import { LoadingSpinner } from '@jeiltodo/ui/shared';

export default function NoteEditor() {
  const params = useParams();
  const noteId = params.noteId as string;

  const { noteDetail } = useNoteDetail(noteId);
  if (noteId !== 'new' && !noteDetail) return <LoadingSpinner />;
  return <EditorPage note={noteDetail} />;
}
