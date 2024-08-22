'use client';

import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Button, Input, useDebounce } from '@jeiltodo/ui/shared';
import { BaseModal, getCookie } from '../../../../../../apps/user/src/shared';
import { UserDataprops } from '../../../features';
import {
  useUpdateUserInfoMutation,
  useNicknameDuplicateQuery,
  useEmailDuplicateQuery,
  useLogoutMutation,
  useWithdrawMutation,
} from '../../../entities/user/hooks/useUser';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../../../shared/config/token';

interface Props {
  userInfo: UserDataprops | undefined;
  setInfoToggle: Dispatch<SetStateAction<boolean>>;
}

export const UserInfoModal = ({ userInfo, setInfoToggle }: Props) => {
  const [nickname, setNickname] = useState(userInfo?.nickname || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const debouncedNickname = useDebounce(nickname, 1000);
  const debouncedEmail = useDebounce(email, 1000);

  const tokenData = {
    accessToken: getCookie(ACCESS_TOKEN_COOKIE_NAME),
    refreshToken: getCookie(REFRESH_TOKEN_COOKIE_NAME),
  };

  const updateUserMutation = useUpdateUserInfoMutation();
  const logoutMutation = useLogoutMutation();
  const withdrawMutation = useWithdrawMutation();

  const { data: nicknameData } = useNicknameDuplicateQuery(debouncedNickname);
  const { data: emailData } = useEmailDuplicateQuery(debouncedEmail);

  useEffect(() => {
    if (
      nickname !== userInfo?.nickname &&
      nicknameData?.data.duplicated === true
    ) {
      setNicknameMessage('존재하는 이름입니다');
    } else if (
      nickname !== userInfo?.nickname &&
      nicknameData?.data.duplicated === false
    ) {
      setNicknameMessage('저장 버튼을 눌러야 변경사항이 저장됩니다');
    } else {
      setNicknameMessage('');
    }
  }, [nicknameData, debouncedNickname]);

  useEffect(() => {
    if (email !== userInfo?.email && emailData?.data.duplicated === true) {
      setEmailMessage('존재하는 이메일입니다');
    } else if (
      email !== userInfo?.email &&
      emailData?.data.duplicated === false
    ) {
      setEmailMessage('저장 버튼을 눌러야 변경사항이 저장됩니다');
    } else {
      setEmailMessage('');
    }
  }, [emailData, debouncedEmail]);

  const handleSave = () => {
    if (!nicknameData && !emailData) {
      updateUserMutation.mutate({ nickname, email });
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate(tokenData);
  };

  const handleWithdraw = () => {
    withdrawMutation.mutate();
  };

  return (
    <BaseModal
      title='사용자 설정'
      setToggle={setInfoToggle}
      width='modal_sm:w-[390px]'
    >
      <div className='flex tablet:flex-row mobile:flex-col tablet:items-end mobile:justify-start mobile:items-end tablet:gap-[38px] mobile:gap-[12px]'>
        <div className='flex flex-col gap-3'>
          <p className='text-sm font-pretendard-semibold text-slate-500'>
            이름
          </p>
          <Input
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            value={nickname}
            type='text'
            placeholder='이름을 적어주세요.'
            className='tablet:w-[220px] mobile:w-full h-[28px] text-base font-medium text-slate-700 placeholder:text-slate-300'
          />
        </div>
        <Button
          variant='primary'
          className='w-[84px] h-[36px]'
          onClick={handleSave}
          disabled={!!nicknameData || nickname === userInfo?.nickname}
        >
          저장
        </Button>
      </div>
      <p className='text-sm font-normal text-error mt-3'>{nicknameMessage}</p>
      <div className='flex tablet:flex-row mobile:flex-col tablet:items-end mobile:justify-start mobile:items-end tablet:gap-[38px] mobile:gap-[12px] mt-3'>
        <div className='flex flex-col gap-3'>
          <p className='text-sm font-pretendard-semibold text-slate-500'>
            이메일
          </p>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type='email'
            placeholder='이메일을 적어주세요.'
            className='tablet:w-[220px] mobile:w-full h-[28px] text-base font-medium text-slate-700 placeholder:text-slate-300'
          />
        </div>
        <Button
          variant='primary'
          className='w-[84px] h-[36px]'
          onClick={handleSave}
          disabled={!!emailData || email === userInfo?.email}
        >
          저장
        </Button>
      </div>
      <p className='text-sm font-normal text-error mt-3'>{emailMessage}</p>

      <div className='flex items-center justify-between gap-1 pt-4 mt-4 border-t-[1px] border-slate-200'>
        <Button
          className='w-[150px] h-[44px]'
          variant='outline'
          onClick={handleWithdraw}
        >
          회원탈퇴
        </Button>
        <Button
          className='w-[150px] h-[44px]'
          variant='outline'
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </div>
    </BaseModal>
  );
};
