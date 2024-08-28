<img src="https://github.com/user-attachments/assets/821b19d0-b161-453b-867e-e3dc5275f958" width="auto" height="60" />
<br /><br/>

> 이 프로젝트는 개인과 그룹이 할 일을 효율적으로 관리할 수 있도록 돕는 웹 애플리케이션입니다. 사용자들은 할 일을 쉽게 추가하고 관리하며 완료할 수 있습니다.
>
> 특히 협업이 필요한 그룹 작업의 경우, 실시간 업데이트와 담당자 라벨링, 달성률에 따른 이미지 제공 등을 통해 팀원 간 원활한 커뮤니케이션을 지원합니다.
> 
> 또한, 강력한 관리자 센터를 제공하여 전체 회원과 그룹을 효과적으로 관리할 수 있습니다. 개별 회원의 목표와 할 일을 포함해 그룹의 목표 및 게시글까지 종합적으로 관리할 수 있어, 서비스 운영과 사용자 경험 개선에 큰 도움을 줍니다.
>

<br/><br/><br/>

## 🔹 프로젝트 미리보기
<br/><br/>
<div align="center">
  <img src="https://github.com/user-attachments/assets/09fa9df8-43cc-44c3-aa9c-de7e71fb8ce3" alt="Jtodo Preview" width="80%">
</div> 
<br/><br/><br/>

## Table of Contents
<br/><br/>

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [사용 기술 스택](#사용-기술-스택)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 사용조건_Prerequisites
<br/><br/>
Before you begin, ensure you have met the following requirements:

* You have installed Node.js version 18
  * You can check your Node.js version by running `node --version`
  * If you need to update or install Node.js, visit [the official Node.js website](https://nodejs.org/)

<br/><br/><br/>

## 사용방법_Usage
<br/><br/>
Explain how to use your project. For example:

```
npm run dev
```
<br/><br/><br/>

## 🔍 주요 기능 살펴보기
<br/><br/>
- 개인 대시보드
- 그룹 대시보드
- 목표의 할일 추가 및 관리
- 직관적인 인터페이스
- 달성률에 따른 프로필 이미지 제공

<br/><br/><br/>
##프로젝트 수행절차 및 구조
<br/><br/>
- 
<br/><br/><br/>

## 🚀 기술 스택
<br/><br/>
- **프론트엔드**: React, Next.js, TailwindCSS
- **백엔드**: Node.js, Express, MongoDB
- **상태관리**: Redux Toolkit, React Query
- **테스팅**: Jest, React Testing Library
- **CI/CD**: GitHub Actions, Docker
- **모노레포 관리**: N
- 
### **프론트엔드**
- **[Next.js 14](https://nextjs.org/)**: 서버 사이드 렌더링과 정적 사이트 생성을 지원하는 React 프레임워크로, App Router를 사용하여 페이지와 라우팅을 효율적으로 관리.
- **[@tanstack/react-query](https://tanstack.com/query/latest)**: 데이터 페칭, 캐싱, 동기화 및 서버 상태 관리를 위한 솔루션.
- **[React Quill](https://github.com/zenoamaro/react-quill)**: WYSIWYG 에디터를 제공하여 텍스트 편집 기능을 구현.
- **[React Toastify](https://fkhadra.github.io/react-toastify/introduction)**: 사용자가 인터페이스에서 피드백을 쉽게 확인할 수 있도록 알림을 추가.
- **[Swiper](https://swiperjs.com/)**: 슬라이더 및 캐러셀 컴포넌트 제작을 위한 라이브러리.
- **[React Copy to Clipboard](https://github.com/nkbt/react-copy-to-clipboard)**: 간편하게 복사 기능을 구현하기 위한 유틸리티.

### **백엔드 통신**
- **[Axios](https://axios-http.com/)**: 비동기 HTTP 요청을 위한 클라이언트로, API와의 통신을 간편하게 처리.

### **모노레포 관리**
- **[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)**: 모노레포 구조에서 여러 패키지의 종속성을 효율적으로 관리하고, 중복 설치를 방지.
- **[Turborepo](https://turbo.build/repo)**: 모노레포 환경에서 빠르고 효율적인 빌드 시스템을 제공하여, 프로젝트의 빌드 및 개발 워크플로우를 최적화.

### **코드 품질 및 유지보수**
- **[Prettier](https://prettier.io/)**: 코드 포맷터로, 일관된 코드 스타일을 유지.
- **[Prettier Plugin TailwindCSS](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)**: Tailwind CSS 클래스의 자동 정렬을 통해 스타일 관리 효율성 향상.
- **Lint**: 코드 품질 관리를 위한 린팅 도구 (명시적으로 ESLint 등의 사용은 없지만, 일반적으로 포함될 수 있음).

### **개발 환경**
- **[Node.js](https://nodejs.org/)**: 런타임 환경으로 Node.js 18 이상을 요구하며, 서버 측 코드와 도구 실행을 지원.

### **기타**
- **TypeScript**: 정적 타입 검사 도구 (Type-check 스크립트가 있으므로 TypeScript 사용 가능성 존재).

<br/><br/><br/>

## 업데이트 예정(v.2.0)
<br/><br/>

- [ ] 현재는 개발 효율성을 위해 클라이언트 측 쿠키로 토큰을 관리하고 있습니다. <br/>
    향후 서비스 규모 확장과 보안 요구사항 증가에 따라 토큰 관리를 서버 측으로 전환할 계획입니다. <br/>
- [ ] 실시간 알림/채팅 서비스를 추가 할 계획입니다.
- [ ] 등등

<br/><br/><br/>

## 👥 팀 소개
<br/><br/>

우리 jeil(제일) 팀 구성원의 프로젝트의 역할을 소개합니다.



| [<img src="https://via.placeholder.com/100" width="100px;"/><br /><sub><b>이준영</b></sub>](https://github.com/Dragonite-Lee) | [<img src="https://via.placeholder.com/100" width="100px;"/><br /><sub><b>최지영</b></sub>](https://github.com/ohtmm) | [<img src="https://via.placeholder.com/100" width="100px;"/><br /><sub><b>안주연</b></sub>](https://github.com/aajy) |[<img src="https://via.placeholder.com/100" width="100px;"/><br /><sub><b>유재영</b></sub>](https://github.com/Dragonite-Lee) |[<img src="https://via.placeholder.com/100" width="100px;"/><br /><sub><b>신정섭</b></sub>](https://github.com/Dragonite-Lee) |[<img src="https://via.placeholder.com/100" width="100px;"/><br /><sub><b>김은지</b></sub>](https://github.com/Dragonite-Lee) |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 팀 리더 / 프론트엔드 개발자 | 프론트엔드 개발자 | 프론트엔드 개발자 | 백엔드 개발자 | 백엔드 개발자 | 디자이너 |
| [GitHub](https://github.com/username) · [LinkedIn](https://linkedin.com/in/username) | [GitHub](https://github.com/username) · [LinkedIn](https://linkedin.com/in/username) | [GitHub](https://github.com/username) · [LinkedIn](https://linkedin.com/in/username) | [GitHub](https://github.com/username) · [LinkedIn](https://linkedin.com/in/username) | [GitHub](https://github.com/username) · [LinkedIn](https://linkedin.com/in/username) | [GitHub](https://github.com/username) · [LinkedIn](https://linkedin.com/in/username) |


-- or 아래 간단 ver ---

🧑‍💻안주연 - [@aajy](https://github.com/aajy) 📧 aajy.000@gmail.com <br />
🧑‍💻이준영 - [@Dragonite-Lee](https://github.com/Dragonite-Lee) 📧 email@example.com <br />
🧑‍💻최지영 - [@Dragonite-Lee](https://github.com/ohtmm) 📧 email@example.com <br />
<br/><br/><br/>

## 🎯 트러블 슈팅 기록
<br/><br/>

- [ ] middleware
- [ ] 어쩌구
- [ ] 저쩌구

<br/><br/><br/>
## 🎥 시연 영상
<br/><br/>

[![TaskMaster Pro Demo](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)
<br/><br/><br/>

## 🔗 링크
<br/><br/>

- [라이브 데모](https://taskmasterpro.example.com)
- [기술 문서](https://docs.taskmasterpro.example.com)
- [API 명세](https://api.taskmasterpro.example.com)

<br/><br/><br/>

<div align="center">
  <strong>TaskMaster Pro</strong> - 당신의 생산성을 혁신적으로 높이는 방법 🚀
</div>
