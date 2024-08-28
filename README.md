<br /><br/><br /><br/>
<img src="https://github.com/user-attachments/assets/821b19d0-b161-453b-867e-e3dc5275f958" width="auto" height="60" />
<br /><br/><br />

> 이 프로젝트는 **개인과 그룹이 할 일을 효율적으로 관리할 수 있도록 돕는 웹 애플리케이션**입니다. <br/>
> 사용자들은 할 일을 쉽게 추가하고 관리하며 완료할 수 있습니다.
>
> 특히 협업이 필요한 그룹 작업의 경우, 팀원 간 **원활한 커뮤니케이션**을 위해 아래 기능을 추가 지원합니다. <br/>
> 🔹 실시간 업데이트 <br/>
> 🔹  담당자 라벨링 <br/>
> 🔹  할 일 달성률에 따른 이미지 제공 <br/>
>
> <br/>
>
> 또한, **관리자 센터**를 제공하여 전체 회원과 그룹을 효과적으로 관리할 수 있습니다. <br/> 개별 회원의 목표와 할 일을 포함해 그룹의 목표 및 게시글까지 종합적으로 관리할 수 있어, 서비스 운영과 사용자 경험 개선에 큰 도움을 제공합니다.
>

<br/><br/><br/>

## 🔹 프로젝트 미리보기
<br/>
<details>
<summary>유저 서비스 스크린샷 보기<img src="https://github.com/user-attachments/assets/a4f51226-a6c0-49e5-b3e3-1ccb9d150a16" alt="s-logo" width="3%">
</summary>
  <div align="center">
    <br/>
    <img src="https://github.com/user-attachments/assets/eb89bb52-3fb4-4579-bf35-e4228a9d7fbe" alt="Jtodo Preview" width="60%">
    <br/><br/>
  </div> 
</details>
<details>
<summary> 관리자 서비스 스크린샷 보기<img src="https://github.com/user-attachments/assets/12efbc64-bc50-4d1e-b844-ea71e9ff8d3b" alt="s-logo" width="3%"></summary>
  <div align="center">
    <br/>
    <img src="https://github.com/user-attachments/assets/c46be127-0210-4827-9128-69a59079b185" width="60%">
    <br/><br/>
  </div> 
</details>
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
<table>
  <tr>
    <th>기능</th>
    <th>설명</th>
    <th>비고</th>
  </tr>
  <tr>
    <td>자체 회원가입 & 로그인</td>
    <td>자체 서비스 회원 가입 및 로그인</td>
    <td>이메일, 닉네임 중복 검사.</td>
  </tr>
  <tr>
    <td>서비스 회원 가입 및 로그인</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td> 회원가입 & 로그인</td>
    <td>할 일 처리 및 할일 수정, 삭제 <br/> 노트 수정, 작성, 임시저장</td>
    <td></td>
  </tr>
  <!-- 추가 행들 ... -->
</table>

| 기능 | 설명 | 비고 |
|------|------|------|
| 회원가입 & 로그인 | 서비스 회원 가입 및 로그인 | 이메일, 닉네임 중복 검사, 유효성 검사 |
|||
| 개인 대시 보드 | 할 일 처리 및 할일 수정, 삭제 <br/> 노트 수정, 작성, 임시저장  | - |

| 최근 등록한 할 일 | - | - |

| 진행 상황 그래프 | - | - |

| 그룹 대시보드 | -| -|

| 목표 | - | - |

| 할 일 | - | - |

| 노트 | - | - |

| 그룹 정보 | - | - |

| 그룹 구성원 | - | - |

| 그룹의 할 일 | - | - |

### 유저 서비스
<br/><br/>

- 개인 대시보드
- 그룹 대시보드
- 목표의 할일 추가 및 관리
- 직관적인 인터페이스
- 달성률에 따른 프로필 이미지 제공
<br/><br/><br/><br/>
### 어드민 서비스
- 회원 관리, 그룹 관리, 개인 게시글 관리, 그룹 게시글 관리 기능
<br/><br/>

<br/><br/><br/>

## 기능별 화면 소개

## 프로젝트 수행절차 및 구조
<br/><br/>
- ## ✅ `기술 스택` 선택

- 최신 기술을 사용한 프로젝트를 하고 싶은 마음
- 주은 강사님과 멘토쌤의 피드백 기반

<aside>
<img src="/icons/verified_blue.svg" alt="/icons/verified_blue.svg" width="40px" /> 기술 스택

- next.js 14 App Router
- tanstack query v5
- typeScript
- tailwind css
- FSD 아키텍처 사용
- 모노레포 도입을 위한 터보레포
    - ⇒ 어드민 서비스와 우저 서비스를 하나의 레포로 관리해보자.
- 도커를 이용한 EC2 인스턴스 배포
</aside>

## ✅ `피그마`로 확장하고 싶은 아이디어 정리

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/bcfb5800-8640-4d98-93f2-9f3ce999b1ec/10e86d6c-30ed-4fcc-987b-77585a4b6bde/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/bcfb5800-8640-4d98-93f2-9f3ce999b1ec/c1b13051-dd57-4cad-9362-9ab7f5aeb907/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/bcfb5800-8640-4d98-93f2-9f3ce999b1ec/9f444719-4c88-4f58-80e3-38396882bc27/image.png)

## ✅슬리드 투두 기획안 기반의 `기획문서 노션` 작성

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/bcfb5800-8640-4d98-93f2-9f3ce999b1ec/ca03ec40-68a2-4ddd-8a25-b69f0e471ee5/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/bcfb5800-8640-4d98-93f2-9f3ce999b1ec/607988e1-2553-4b28-82ae-078ebeda6df4/image.png)

## ✅ 디자이너님과 백엔드 두 분과의 활발한 `디스코드 회의와 코멘트`

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/bcfb5800-8640-4d98-93f2-9f3ce999b1ec/97286409-e264-43b6-b99b-aac1e8890226/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/bcfb5800-8640-4d98-93f2-9f3ce999b1ec/b60564f1-c971-45eb-9464-a4d6726f6c3b/image.png)

## ✅ 그 외

### prettierrc 공유

```jsx
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 120,
  "parser": "babel",
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

- Git Wiki에 컨벤션 정리
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/bcfb5800-8640-4d98-93f2-9f3ce999b1ec/d6063130-786f-4138-a07a-17a7fd9ef907/image.png)
    

## 작업을 시작며

### PR과 ISSUE 활발한 사용

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/bcfb5800-8640-4d98-93f2-9f3ce999b1ec/d51ceec8-f743-4c7e-aff0-5d5884d50a1a/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/bcfb5800-8640-4d98-93f2-9f3ce999b1ec/175a7c55-911d-4162-b85b-f934fc1a5c42/image.png)

### wiki에 컨벤션 정리

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/bcfb5800-8640-4d98-93f2-9f3ce999b1ec/9cdcfd2f-934a-4424-90f0-540df3efb98e/image.png)
<br/><br/><br/>

## 🚀 기술 스택
<br/><br/>
- **프론트엔드**: Next.js 14 (App Router), TailwindCSS
- **백엔드**: Node.js, Express, MongoDB
- **백엔드 통신**: Axios
- **상태 관리**: TanStack Query v5
- **CI/CD**: GitHub Actions, Docker
 **모노레포 관리**: Yarn Workspaces, Turborepo
  

<br/><br/><br/>

## 업데이트 예정(v.2.0)
<br/><br/>

- [ ] 현재는 개발 효율성을 위해 클라이언트 측 쿠키로 토큰을 관리하고 있습니다. <br/>
    향후 서비스 규모 확장과 보안 요구사항 증가에 따라 토큰 관리를 서버 측으로 전환할 계획입니다. <br/>
- [ ] 실시간 알림/채팅 서비스를 추가 할 계획입니다.
- [ ] 주요 기능에 대한 기능 업데이트 시 테스트 코드를 추가하려고 합니다.

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

- [ ] middleware를 사용하면서
- [ ] axios를 사용하면서
- [ ] tanstack query를 사용하면서 

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
  <img src="https://github.com/user-attachments/assets/821b19d0-b161-453b-867e-e3dc5275f958" width="auto" height="20" /> - 당신의 생산성을 편리하게 높이는 방법 ⚡
</div>
