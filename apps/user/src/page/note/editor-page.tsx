'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Back, DeleteCircle } from '@jeiltodo/icons';
import { BaseModal, BoardTitle, TodoTitle, useToast , Button, ButtonGroup } from '@jeiltodo/ui/shared';
import { EditorForm } from '../../features/note';
import { ConfirmationModal, MINUTES_WITH_MS } from '../../shared';
import type { Note} from '../../entities/note';
import { useCreateNote, useUpdateNote } from '../../entities/note';

interface Props {
  note?: Note;
}

export const EditorPage = ({ note }: Props) => {
  const searchParams = useSearchParams();
  const goalTitle = searchParams.get('title');
  const todoTitle = searchParams.get('todo');

  const params = useParams();
  const noteId = params.noteId as string;
  const goalId = Number(params.goalId);
  const todoId = Number(params.todoId);

  const [title, setTitle] = useState<string>(note?.title ?? '');
  const [content, setContent] = useState<string>(note?.content ?? '');
  const [linkUrl, setLinkUrl] = useState<string>(note?.linkUrl ?? '');
  const [isLocalSaved, setIsLocalSaved] = useState<boolean>(false);
  const [isButtonView, setIsButtonView] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);

  const { mutate: updateNote } = useUpdateNote(Number(noteId));
  const { mutate: createNote } = useCreateNote(todoId);

  const showToast = useToast();
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

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
      className='flex flex-col max-w-[792px] min-w-[248px]'
      style={{ minHeight: 'calc(100vh - 48px)' }}
    >
      <div className="flex flex-row items-center justify-between mb-[16px]">
        <div className='flex items-center justify-start gap-2'>
          <Back
            className='w-6 h-6 cursor-pointer'
            onClick={() => setIsConfirmOpen(true)}
          />
          <h2 className='font-pretendard-semibold text-lg'>{`노트 ${noteId === 'new' ? '작성' : '수정'}`}</h2>
        </div>
        <div>
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
        </div>
      </div>
      {isLocalSaved && isButtonView && (
        <div className='flex flex-row items-center justify-between bg-[#eff6ff] text-[#3b82f6] rounded-[28px] text-[14px] font-pretendard-medium px-3 pl-6 py-0 shadow-none min-h-[56px] h-[56px] mb-6'>
          <div className='flex flex-row items-center gap-2 mb:gap-4'>
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
            className='block px-3 !text-sm !h-[36px] leading-5 min-w-[84px] ml-2'
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
        title={note?.todo.title || goalTitle || '목표'}
      />
      <TodoTitle
        className='mb-[24px]'
        title={note?.todo.title || todoTitle || '할 일'}
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
      {isConfirmOpen && (
        <ConfirmationModal
          setModalToggle={setIsConfirmOpen}
          submitButtonText="확인"
          onSubmit={handleBackClick}
        >
          정말 나가시겠어요? <br />
          작성된 내용이 모두 삭제됩니다.
        </ConfirmationModal>
      )}
    </div>
  );
};
