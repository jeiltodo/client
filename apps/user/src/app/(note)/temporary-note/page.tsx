import Link from 'next/link';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function Page() {
  const goalid = 1;
  const todoid = 2;
  const noteid = 3;
  return (
    <main className='desktop:pl-[360px] tablet:pl-[84px]  tablet:pr-[24px] mobile:pl-[16px] mobile:pr-[16px] bg-slate-100 min-h-screen'>
      <ToastContainer limit={1} />
      배경이 bg-slate-100인 유저 페이지- 대시보드, 모든 할일 목록 페이지, 목표
      상세 페이지, 노트 모아보기 <br />
      <br />
      작업 시 추가로 metadata를 작성하기 위한 (router group)을 분리합니다.
      <div className='flex flex-row gap-5'>
        <Link
          className='border border-blue-400'
          href={`/${goalid}/note/list`}
        >{`goalid:1 의 Note 모아보기`}</Link>
        <Link
          className='border border-blue-400'
          href={`/${goalid}/${todoid}/note/new`}
        >
          {`golaid:2 & todoid:3의 Note 작성하러가기`}
        </Link>
        <Link
          className='border border-blue-400'
          href={`/${goalid}/${todoid}/note/${noteid}`}
        >
          {`golaid:2 & todoid:3의 Note 수정 하러가기`}
        </Link>
      </div>
    </main>
  );
}
