import { ImgProfile } from '@jeiltodo/icons';
import { UserDataprops } from '../model/type';

// User 인터페이스를 직접 사용하는 컴포넌트
export const SidebarUserInfo = ({ userData }: { userData: UserDataprops }) => {
  // 객체 구조 분해 할당을 사용하여 user 속성을 추출
  const { id, email, name, createdAt, updatedAt } = userData;

  return (
    <div className='mt-3 mb-[18px] py-3'>
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
    </div>
  );
};
