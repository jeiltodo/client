'use client';

import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import {
  BaseModal,
  Button,
  getCookie,
  Input,
  useDebounce,
} from '@jeiltodo/ui/shared';
import type { UserDataProps } from '../../../features/user/model';
import {
  useUpdateUserInfoMutation,
  useNicknameDuplicateQuery,
  useEmailDuplicateQuery,
  useLogoutMutation,
  useWithdrawMutation,
} from '../hooks/useUser';
import {
  ACCESS_ADMIN_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_ADMIN_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../../../shared/config/token';
import { useRouter } from 'next/navigation';
import { ConfirmationModal } from '../../../shared/ui/@x';

interface UserInfoModalProps {
  userInfo: UserDataProps | undefined;
  setInfoToggle: Dispatch<SetStateAction<boolean>>;
  isAdmin?: boolean; // 관리자 여부를 판단하는 플래그 추가
}

export const UserInfoModal = ({
  userInfo,
  setInfoToggle,
  isAdmin = false,
}: UserInfoModalProps) => {
  const [nickname, setNickname] = useState(userInfo?.nickname || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [withDrawModalOpen, setWithDrawModalOpen] = useState(false);

  const debouncedNickname = useDebounce(nickname, 1000);
  const debouncedEmail = useDebounce(email, 1000);

  const tokenData = {
    accessToken: isAdmin
      ? getCookie(ACCESS_ADMIN_TOKEN_COOKIE_NAME)
      : getCookie(ACCESS_TOKEN_COOKIE_NAME),
    refreshToken: isAdmin
      ? getCookie(REFRESH_ADMIN_TOKEN_COOKIE_NAME)
      : getCookie(REFRESH_TOKEN_COOKIE_NAME),
  };

  const router = useRouter();

  const updateUserMutation = useUpdateUserInfoMutation(isAdmin);
  const logoutMutation = useLogoutMutation(isAdmin);
  const withdrawMutation = useWithdrawMutation(isAdmin);

  const { data: nicknameData } = useNicknameDuplicateQuery(
    debouncedNickname,
    isAdmin
  );
  const { data: emailData } = useEmailDuplicateQuery(debouncedEmail, isAdmin);

  useEffect(() => {
    if (
      debouncedNickname !== userInfo?.nickname &&
      nicknameData?.data.duplicated === true
    ) {
      setNicknameMessage('존재하는 이름입니다');
    } else if (
      debouncedNickname !== userInfo?.nickname &&
      nicknameData?.data.duplicated === false &&
      debouncedNickname.length !== 0
    ) {
      setNicknameMessage('저장 버튼을 눌러야 변경사항이 저장됩니다');
    } else {
      setNicknameMessage('');
    }
  }, [nicknameData, debouncedNickname]);

  useEffect(() => {
    if (
      debouncedEmail !== userInfo?.email &&
      emailData?.data.duplicated === true
    ) {
      setEmailMessage('존재하는 이메일입니다');
    } else if (
      debouncedEmail !== userInfo?.email &&
      emailData?.data.duplicated === false &&
      debouncedEmail.length !== 0
    ) {
      setEmailMessage('저장 버튼을 눌러야 변경사항이 저장됩니다');
    } else {
      setEmailMessage('');
    }
  }, [emailData, debouncedEmail]);

  const handleSave = () => {
    updateUserMutation.mutate({ nickname, email });
    setNicknameMessage('');
    setEmailMessage('');
  };

  const handleLogout = () => {
    logoutMutation.mutate(tokenData);
    router.push('/login');
  };

  const handleWithdraw = () => {
    setWithDrawModalOpen(false);
    withdrawMutation.mutate();
    router.push('/login');
  };

  useEffect(() => {
    setNickname(userInfo?.nickname || '');
    setEmail(userInfo?.email || '');
  }, [userInfo]);

  return (
    <>
      <BaseModal
        setToggle={setInfoToggle}
        title='사용자 설정'
        width='modal_sm:w-[390px]'
      >
        <div className='flex tablet:flex-row mobile:flex-col tablet:items-end mobile:justify-start mobile:items-end tablet:gap-[38px] mobile:gap-[12px]'>
          <div className='flex flex-col gap-3 w-full'>
            <p className='text-sm font-pretendard-semibold text-slate-500'>
              이름
            </p>
            <Input
              autoFocus={true}
              className='tablet:w-[220px] mobile:w-full h-[28px] text-base font-medium text-slate-700 placeholder:text-slate-300'
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              placeholder='이름을 적어주세요.'
              type='text'
              value={nickname}
            />
          </div>
          <Button
            className='w-[84px] h-[36px]'
            isDisabled={
              nickname === userInfo?.nickname ||
              !!nicknameData?.data.duplicated ||
              nickname.length === 0
            }
            onClick={handleSave}
            variant='primary'
          >
            저장
          </Button>
        </div>
        <p className='text-sm font-normal text-error mt-3'>{nicknameMessage}</p>
        <div className='flex tablet:flex-row mobile:flex-col tablet:items-end mobile:justify-start mobile:items-end tablet:gap-[38px] mobile:gap-[12px] mt-3'>
          <div className='flex flex-col gap-3 w-full'>
            <p className='text-sm font-pretendard-semibold text-slate-500'>
              이메일
            </p>
            <Input
              className='tablet:w-[220px] mobile:w-full h-[28px] text-base font-medium text-slate-700 placeholder:text-slate-300'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder='이메일을 적어주세요.'
              type='email'
              value={email}
            />
          </div>
          <Button
            className='w-[84px] h-[36px]'
            isDisabled={
              email === userInfo?.email ||
              !!emailData?.data.duplicated ||
              email.length === 0
            }
            onClick={handleSave}
            variant='primary'
          >
            저장
          </Button>
        </div>
        <p className='text-sm font-normal text-error mt-3'>{emailMessage}</p>

        <div className='flex items-center justify-between gap-1 pt-4 mt-4 border-t-[1px] border-slate-200'>
          <Button
            className='w-[150px] h-[44px]'
            onClick={() => {
              setWithDrawModalOpen(true);
            }}
            variant='outline'
          >
            회원탈퇴
          </Button>
          <Button
            className='w-[150px] h-[44px]'
            onClick={handleLogout}
            variant='outline'
          >
            로그아웃
          </Button>
        </div>
      </BaseModal>
      {withDrawModalOpen ? (
        <ConfirmationModal
          onSubmit={() => {
            handleWithdraw();
          }}
          setModalToggle={setWithDrawModalOpen}
          submitButtonText='탈퇴'
        >
          정말 탈퇴하시겠습니까? <br /> 그룹장인 경우 그룹이 삭제됩니다.
        </ConfirmationModal>
      ) : null}
    </>
  );
};
