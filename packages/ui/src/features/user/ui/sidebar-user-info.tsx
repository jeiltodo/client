'use client';
import { ImgProfile } from '@jeiltodo/icons';
import { UserDataProps } from '../model';
import { useState } from 'react';
import { UserInfoModal } from '../../../entities/user';

interface SidebarUserInfoProps {
  userInfo: UserDataProps | undefined;
  isAdmin?: boolean;
}

export const SidebarUserInfo = ({
  userInfo,
  isAdmin = false,
}: SidebarUserInfoProps) => {
  const [infoToggle, setInfoToggle] = useState<boolean>(false);

  return (
    <>
      {infoToggle ? <UserInfoModal
          isAdmin={isAdmin}
          setInfoToggle={setInfoToggle}
          userInfo={userInfo}
        /> : null}
      <section className='mt-3 mb-[18px] py-3'>
        <article className='tablet:flex mobile:hidden tablet:px-5 mobile:px-4 items-start gap-3'>
          <ImgProfile className='w-16 h-16' />
          <div>
            <header>
              <h2 className='text-sm font-pretendard-semibold text-slate-800'>
                {userInfo?.nickname}
              </h2>
              <p className='text-sm font-pretendard-semibold text-slate-600'>
                {userInfo?.email}
              </p>
            </header>
            <footer>
              <button
                className='inline-block mt-2 text-xs font-normal text-slate-400 cursor-pointer'
                onClick={() => { setInfoToggle(true); }}
                type='button'
              >
                사용자 설정
              </button>
            </footer>
          </div>
        </article>
        <article className='tablet:hidden mobile:flex tablet:px-5 mobile:px-4 items-end justify-between'>
          <div className='flex items-center justify-start gap-2'>
            <ImgProfile className='w-8 h-8' height={32} width={32} />
            <div>
              <header>
                <h2 className='text-xs font-pretendard-semibold text-slate-800'>
                  {userInfo?.nickname}
                </h2>
                <p className='text-xs font-pretendard-semibold text-slate-600'>
                  {userInfo?.email}
                </p>
              </header>
            </div>
          </div>
          <footer>
            <button
              className='inline-block mt-2 text-xs font-normal text-slate-400 cursor-pointer'
              onClick={() => { setInfoToggle(true); }}
              type='button'
            >
              사용자 설정
            </button>
          </footer>
        </article>
      </section>
    </>
  );
};
