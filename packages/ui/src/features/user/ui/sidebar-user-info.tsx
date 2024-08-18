'use client';
import { ImgProfile } from '@jeiltodo/icons';
import { UserDataprops } from '../model/type';
import { useState } from 'react';
import { UserInfoModal } from '../../../entities';

interface SidebarUserInfoProps {
  userInfo: UserDataprops | undefined; // userInfo를 직접 받는 형태로 수정
}

// UserDataprops를 사용하는 컴포넌트
export const SidebarUserInfo = ({ userInfo }: SidebarUserInfoProps) => {
  const [infoToggle, setInfoToggle] = useState<boolean>(false);
  return (
    <>
      {!infoToggle && (
        <UserInfoModal userInfo={userInfo} setInfoToggle={setInfoToggle} />
      )}
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
            <span className='inline-block mt-2 text-xs font-normal text-slate-400 cursor-pointer'>
              사용자 설정
            </span>
          </div>
        </div>
        <div className='tablet:hidden mobile:flex tablet:px-5 mobile:px-4 items-end justify-between'>
          <div className='flex items-center justify-start gap-2'>
            <ImgProfile className='w-8 h-8' />
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
          <span className='inline-block mt-2 text-xs font-normal text-slate-400 cursor-pointer'>
            사용자 설정
          </span>
        </div>
      </div>
    </>
  );
};
{/* <BaseModal
title='사용자 설정'
setToggle={setInfoToggle}
width='modal_sm:w-[390px]'
> <div className='flex items-end gap-[38px]'>
          <div className='flex flex-col gap-3'>
            <p className='text-sm font-pretendard-semibold text-slate-500'>
              이름
            </p>
            <Input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              type='text'
              placeholder='이름을 적어주세요.'
              className='w-[220px] h-[28px] text-base font-medium text-slate-700 placeholder:text-slate-300'
            />
          </div>
          <Button variant='primary' className='w-[84px] h-[36px]'>
            저장
          </Button> */}