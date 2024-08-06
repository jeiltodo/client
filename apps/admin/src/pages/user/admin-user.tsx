// 'use client';
// import React, { Dispatch, SetStateAction, useState } from 'react';
// import { SearchFilter } from '../../shared/ui/@x/search-filter';

// interface FormType {
//   label: string;
//   name: string;
//   type?: 'email' | 'date'; // 선택
//   placeholder?: string;
//   value: string;
//   setValue: Dispatch<SetStateAction<string>>;
// }

// const AdminUser = () => {
//   const [name, setName] = useState<string>('');
//   const [keyword, setKeyword] = useState<string>('');
//   const [period, setPeriod] = useState<string>('');
//   const goalGroupForm: FormType[] = [
//     {
//       label: '이름',
//       name: 'name',
//       placeholder: '이름을 입력해주세요',
//       value: name,
//       setValue: setName,
//     },
//     {
//       label: '키워드',
//       name: 'keyword',
//       placeholder: '이메일을 입력해주세요',
//       value: keyword,
//       setValue: setKeyword,
//     },
//     {
//       label: '기간',
//       name: 'period',
//       type: 'date',
//       value: period,
//       setValue: setPeriod,
//     },
//   ];

//   const queryData = {
//     name: name,
//     keyword: keyword,
//     period: period,
//   };
//   return (
//     <div>
//       <SearchFilter
//         setState={[setName, setKeyword, setPeriod]}
//         formType={goalGroupForm}
//         queryData={queryData}
//       />
//     </div>
//   );
// };

// export default AdminUser;
