import React from 'react';

export default function Page() {
  return (
    <main className='common-layout bg-slate-100'>
      <h1>대시보드 페이지입니다.</h1>
      배경이 bg-slate-100인 유저 페이지- 대시보드, 모든 할일 목록 페이지, 목표
      상세 페이지, 노트 모아보기 <br />
      <br />
      작업 시 추가로 metadata를 작성하기 위한 (router group)을 분리합니다.
    </main>
  );
}
