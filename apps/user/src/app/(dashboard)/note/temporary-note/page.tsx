import Link from 'next/link';
import React from 'react';

export default function Page() {
  const goalid = 9;
  const todoid = 2;
  const noteid = 1;
  return (
    <main>
      배경이 bg-slate-100인 유저 페이지- 대시보드, 모든 할일 목록 페이지, 목표
      상세 페이지, 노트 모아보기 <br />
      <br />
      작업 시 추가로 metadata를 작성하기 위한 (router group)을 분리합니다.
      <div className='flex flex-row gap-5'>
        <Link
          className='border border-blue-400'
          href={`/note/${goalid}/list`}
        >{`goalid:1 의 Note 모아보기`}</Link>
        <Link
          className='border border-blue-400'
          href={`/note/${goalid}/${todoid}/new`}
        >
          {`golaid:2 & todoid:3의 Note 작성하러가기`}
        </Link>
        <Link
          className='border border-blue-400'
          href={`/note/${goalid}/${todoid}/${noteid}`}
        >
          {`golaid:2 & todoid:3의 Note 수정 하러가기`}
        </Link>
      </div>
    </main>
  );
}
