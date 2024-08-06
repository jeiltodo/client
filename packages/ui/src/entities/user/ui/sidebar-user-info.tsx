import { ImgProfile } from '@jeiltodo/icons';
import { User } from '../model/type';

interface Props {
  user: User;
}

export const SidebarUserInfo = ({ user }: Props) => {
  const { id, email, name } = user;

  return (
    <>
      <div className='tablet:flex mobile:hidden tablet:px-5 mobile:px-4 items-start gap-3'>
        <ImgProfile className='w-16 h-16' />
        <div>
          <div>
            <h2 className='text-sm font-pretendard-semibold text-slate-800'>
              {name}
            </h2>
            <h2 className='text-sm font-pretendard-semibold text-slate-600'>
              {email}
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
                {name}
              </h2>
              <h2 className='text-xs font-pretendard-semibold text-slate-600'>
                {email}
              </h2>
            </div>
          </div>
        </div>
        <span className='inline-block mt-2 text-xs font-normal text-slate-400 cursor-pointer'>
          사용자 설정
        </span>
      </div>
    </>
  );
};
