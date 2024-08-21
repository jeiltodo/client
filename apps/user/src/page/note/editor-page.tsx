'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { DeleteCircle } from '@jeiltodo/icons';
import { BoardTitle, TodoTitle, useToast } from '@jeiltodo/ui/shared';
import { EditorForm } from '../../features/note';
import { BaseModal, MINUTES_WITH_MS } from '../../shared';
import { useCreateNote, useUpdateNote } from '../../entities/note';
import { useNoteDetail } from '../../entities/note/hooks/useNoteDetail';
import { Button, ButtonGroup, LayoutTitle } from '@jeiltodo/ui/shared';

export const EditorPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const goalTitle = searchParams!.get('title');
  const todoTitle = searchParams!.get('todo');

  const goalId = Number(params!.goalId);
  const todoId = Number(params!.todoId);
  const noteId = params!.noteId as string;

  const { noteDetail } = useNoteDetail(noteId);

  const [title, setTitle] = useState<string>(noteDetail?.title ?? '');
  const [content, setContent] = useState<string>(noteDetail?.content ?? '');
  const [linkUrl, setLinkUrl] = useState<string>(noteDetail?.linkUrl ?? '');
  const [isLocalSaved, setIsLocalSaved] = useState<boolean>(false);
  const [isButtonView, setIsButtonView] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);

  const { mutate: updateNote } = useUpdateNote(Number(noteId));
  const { mutate: createNote } = useCreateNote(todoId);

  const showToast = useToast();
  const router = useRouter();

  const handleLocalSave = () => {
    const localData = {
      noteid: Number(noteId),
      title: title.trim(),
      content: content.trim(),
    };
    if (noteId && title && content) {
      try {
        window.localStorage.setItem(`todo${todoId}`, JSON.stringify(localData));
        showToast({
          message: '임시 저장이 완료되었습니다.',
          type: 'alert',
          autoClose: 2000,
        });
        setIsLocalSaved(true);
        setIsButtonView(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getLocalSave = () => {
    const savedData = localStorage.getItem(`todo${todoId}`);
    const parsedData = savedData
      ? JSON.parse(savedData)
      : { title: '', content: '' };
    setTitle(parsedData.title);
    setContent(parsedData.content);
  };

  const handleSave = () => {
    if (noteId === 'new') {
      createNote(
        { title, content, linkUrl },
        {
          onSuccess: () => {
            router.replace(`/note/list/${goalId}?title=${goalTitle}`);
          },
        }
      );
    } else {
      updateNote(
        { title, content, linkUrl },
        {
          onSuccess: () => {
            router.replace(`/note/list/${goalId}?title=${goalTitle}`);
          },
        }
      );
    }
  };

  useEffect(() => {
    const showSaveToast = setInterval(() => {
      handleLocalSave();
    }, MINUTES_WITH_MS * 5);

    return () => clearInterval(showSaveToast);
  }, []);

  useEffect(() => {
    if (localStorage.getItem(`todo${todoId}`)) {
      setIsLocalSaved(true);
      setIsButtonView(true);
    } else {
      setIsLocalSaved(false);
      setIsButtonView(true);
    }
  }, [noteId]);

  return (
    <div
      className='flex flex-col max-w-[792px]'
      style={{ minHeight: 'calc(100vh - 48px)' }}
    >
      <LayoutTitle title={`노트 ${noteId === 'new' ? '작성' : '수정'}`}>
        <ButtonGroup>
          <Button
            className='w-[96px] h-[44px]'
            onClick={handleLocalSave}
            variant='text-blue'
            isDisabled={
              title.trim().length === 0 || content.trim().length === 0
            }
          >
            임시저장
          </Button>
          <Button
            className='w-[96px] h-[44px]'
            isDisabled={
              title.trim().length === 0 || content.trim().length === 0
            }
            onClick={handleSave}
          >
            저장 완료
          </Button>
        </ButtonGroup>
      </LayoutTitle>
      {isLocalSaved && isButtonView && (
        <div className='flex flex-row items-center justify-between bg-[#eff6ff] text-[#3b82f6] rounded-[28px] text-[14px] font-pretendard-medium px-3 pl-6 py-0 shadow-none min-h-[56px] h-[56px] mb-6'>
          <div className='flex flex-row items-center gap-4'>
            <button
              type='button'
              onClick={() => setIsButtonView(false)}
              className='cursor-pointer'
            >
              <DeleteCircle width={24} height={24} />
            </button>
            <p>임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?</p>
          </div>
          <Button
            variant='rounded-outline-blue'
            className='block px-3 !text-sm !h-[36px] leading-5'
            onClick={getLocalSave}
          >
            불러오기
          </Button>
        </div>
      )}

      <BoardTitle
        className='mb-[12px]'
        icon='flag'
        iconSize={24}
        title={noteDetail?.todo.title || goalTitle || '목표'}
      />
      <TodoTitle
        className='mb-[24px]'
        title={noteDetail?.todo.title || todoTitle || '할 일'}
      />

      <EditorForm
        link={linkUrl}
        setLink={setLinkUrl}
        content={content}
        setContent={setContent}
        setTitle={setTitle}
        title={title}
      />
      {isAlert && (
        <div className='w-[300px]'>
          <BaseModal setToggle={setIsAlert}>
            <div className='flex flex-col gap-3 items-center'>
              <p>저장 되었습니다!</p>
              <Button
                isDisabled={!title}
                className='w-[120px] mt-10 h-12'
                onClick={() => router.back()}
              >
                확인
              </Button>
            </div>
          </BaseModal>
        </div>
      )}
    </div>
  );
};
