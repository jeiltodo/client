'use client';
import { ImgProfile } from '@jeiltodo/icons';
import { UserDataProps } from '../model';
import { useState } from 'react';
import { UserInfoModal } from '../../../entities/user';

interface SidebarUserInfoProps {
  userInfo: UserDataProps | undefined; // userInfo를 직접 받는 형태로 수정
  isAdmin?: boolean;
}

// UserDataProps를 사용하는 컴포넌트
export const SidebarUserInfo = ({
  userInfo,
  isAdmin = false,
}: SidebarUserInfoProps) => {
  const [infoToggle, setInfoToggle] = useState<boolean>(false);

  return (
    <>
      {infoToggle ? (
        <UserInfoModal
          isAdmin={isAdmin}
          setInfoToggle={setInfoToggle}
          userInfo={userInfo}
        />
      ) : null}
      <div className='mt-3 mb-[18px] py-3'>
        <div className='tablet:flex mobile:hidden tablet:px-5 mobile:px-4 items-start gap-3'>
          <ImgProfile className='w-16 h-16' />
          <div>
            <div>
              <h2 className='text-sm font-pretendard-semibold text-slate-800'>
                {userInfo?.nickname}
              </h2>
              <h2 className='text-sm font-pretendard-semibold text-slate-600'>
                {userInfo?.email}
              </h2>
            </div>
            <button
              className='inline-block mt-2 text-xs font-normal text-slate-400 cursor-pointer'
              onClick={() => {
                setInfoToggle(true);
              }}
              type='button'
            >
              사용자 설정
            </button>
          </div>
        </div>
        <div className='tablet:hidden mobile:flex tablet:px-5 mobile:px-4 items-end justify-between'>
          <div className='flex items-center justify-start gap-2'>
            <ImgProfile className='w-8 h-8' height={32} width={32} />
            <div>
              <div>
                <h2 className='text-xs font-pretendard-semibold text-slate-800'>
                  {userInfo?.nickname}
                </h2>
                <h2 className='text-xs font-pretendard-semibold text-slate-600'>
                  {userInfo?.email}
                </h2>
              </div>
            </div>
          </div>
          <button
            className='inline-block mt-2 text-xs font-normal text-slate-400 cursor-pointer'
            onClick={() => {
              setInfoToggle(true);
            }}
            type='button'
          >
            사용자 설정
          </button>
        </div>
      </div>
    </>
  );
};
