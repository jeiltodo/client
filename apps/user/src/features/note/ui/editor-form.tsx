'use client';

import { Counter, Input, LoadingSpinner } from '@jeiltodo/ui/shared';
import { useEffect, useState } from 'react';
import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { LinkDelete, LinkEmbed } from '@jeiltodo/icons';
import { LinkModal } from './link-modal';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
const Link = dynamic(() => import('@jeiltodo/icons').then((mod) => mod.Link), {
  ssr: false,
  loading: () => null,
});

const formats = [
  'bold',
  'italic',
  'underline',
  'align',
  'list',
  'bullet',
  'color',
];

interface EditorFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}

export const EditorForm = ({
  title,
  setTitle,
  content,
  setContent,
  link,
  setLink,
}: EditorFormProps) => {
  const [lengthWithoutSpaces, setLengthWithoutSpaces] = useState<number>(0);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [linkModal, setLinkModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setTitle(value);
    }
  };

  useEffect(() => {
    Promise.all([
      import('react-quill'),
      import('@jeiltodo/icons').then((mod) => mod.Link),
    ])
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading components:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const plainText = doc.body.textContent || '';

    // 전체 글자 수 (공백 포함)
    const totalLength = plainText.length;

    // 공백을 제거하고 글자 수 계산
    const contentWithoutSpaces = plainText.replace(/\s+/g, '');
    setLengthWithoutSpaces(contentWithoutSpaces.length);

    // 여기에 전체 글자 수를 저장하는 상태 변수를 추가하세요
    setTotalLength(totalLength);
  }, [content]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }],
        ],
      },
    }),
    []
  );

  const positionClassName = link
    ? 'top-[179px] tablet:top-[159px]'
    : 'top-[137px] tablet:top-[117px]';

  return (
    <>
      {linkModal && (
        <LinkModal
          link={link}
          setLink={setLink}
          setLinkModalToggle={setLinkModal}
        />
      )}

      <div className='flex flex-col flex-grow w-full h-full relative'>
        {/* 제목 입력란 및 제목 글자 수 */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className='flex flex-row gap-2 items-center justify-between border-y-[1px] border-slate-200 min-w-[248px]'>
              <Input
                type='text'
                name='title'
                value={title}
                autoFocus={true}
                placeholder='노트의 제목을 입력해주세요'
                onChange={handleTitleChange}
                className='!px-0 w-full h-[46px] my-1 indent-2 placeholder:text-base placeholder:font-pretendard-medium bg-white'
              />
              <Counter data={title.length} limitNumber={30} />
            </div>
            {/* 글자 수  */}
            <div className='flex tablet:flex-row flex-col tablet:items-center items-end justify-between min-w-[248px]'>
              <div className='flex flex-row text-right text-xs font-pretendard-medium text-slate-800 py-[12px]'>
                <span>{`공백포함 : 총 `}</span>
                <span className='inline-block min-w-[20px]'>{totalLength}</span>
                <span className='pr-[2px]'>{`자 |`}</span>
                <span>{`공백제외 : 총 `}</span>
                <span className='inline-block min-w-[20px]'>
                  {lengthWithoutSpaces}
                </span>
                <span>{'자'}</span>
              </div>
              <Counter data={totalLength} limitNumber={10000} />
            </div>
            {/* 파일url이 있으면 여기에 올라감 */}
            {link && (
              <div className='flex items-center justify-between bg-slate-200 h-[38px] py-[7px] px-[6px] rounded-[20px] w-full mt-1'>
                <div className='flex items-center justify-start gap-2 flex-grow min-w-0'>
                  <LinkEmbed className='h-[18px] w-[18px] flex-shrink-0' />
                  <div className='text-base font-normal text-slate-800 truncate pt-[2px] flex-grow min-w-0'>
                    {link}
                  </div>
                </div>
                <LinkDelete
                  className='h-[20px] w-[20px] cursor-pointer flex-shrink-0 ml-2'
                  onClick={() => setLink('')}
                />
              </div>
            )}

            {/* 에디터 */}
            <ReactQuill
              theme='snow'
              modules={modules}
              formats={formats}
              value={content}
              onChange={setContent}
              placeholder='이 곳을 클릭해 노트 작성을 시작해주세요'
              className=' max-h-[768px] bg-white'
            />
            <style jsx global>{`
              .ql-toolbar {
                display: block;
                margin: 12px 0px;
                width: 100%;
                z-index: 10;
                border: 1px solid #e2e8f0;
                border-radius: 21.5px;
              }
              .ql-container {
                min-height: 55vh;
                width: 100%;
                border: 1px solid #e2e8f0 !important;
                border-radius: 21.5px;
                z-index: 5;
              }
              .ql-editor {
                min-height: 55vh;
                width: 100%;
                font-size: 16px;
                line-height: 1.5;
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .ql-editor::-webkit-scrollbar {
                display: none;
              }
              .ql-toolbar.ql-snow .ql-formats {
                margin-right: 3px;
              }
            `}</style>
            <div
              className={`py-[1px] px-[3px] absolute ${positionClassName} tablet:right-4 right-[6px]`}
              onClick={() => setLinkModal(true)}
            >
              <Link className='w-[22px] h-[22px] cursor-pointer ' />
            </div>
          </>
        )}
      </div>
    </>
  );
};
