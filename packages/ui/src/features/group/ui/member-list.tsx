'use client';
import { Member, Profile } from '../../../entities';
import { useBoardContext } from '@jeiltodo/ui/shared';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

interface MemberListProps {
  members: Member[];
  onClientChangeLeader: (id: number) => void;
  onClientRemoveMember: (id: number) => void;
}

// eslint-disable-next-line react/function-component-definition
export const MemberList = ({
  members,
  onClientChangeLeader: onChangeLeader,
  onClientRemoveMember: onRemoveMember,
}: MemberListProps) => {
  const { mode } = useBoardContext();
  const slidesCount = members.length;

  const handleChangeLeader = (id: number) => {
    onChangeLeader(id);
  };

  const handleManageMembers = (id: number) => {
    onRemoveMember(id);
  };

  return (
    <div className='relative px-3'>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={slidesCount < 2 ? 1 : 2}
        slidesPerGroup={slidesCount < 2 ? 1 : 2}
        spaceBetween={24}
        scrollbar={{ draggable: true }}
        navigation
        pagination={{ clickable: true }}
        centeredSlides={false}
        breakpoints={{
          370: {
            slidesPerView: slidesCount < 3 ? slidesCount : 3,
            slidesPerGroup: slidesCount < 3 ? slidesCount : 3,
          },
          420: {
            slidesPerView: slidesCount < 4 ? slidesCount : 4,
            slidesPerGroup: slidesCount < 4 ? slidesCount : 4,
          },
          500: {
            slidesPerView: slidesCount < 4 ? slidesCount : 4,
            slidesPerGroup: slidesCount < 4 ? slidesCount : 4,
          },
          640: {
            slidesPerView: slidesCount < 5 ? slidesCount : 5,
            slidesPerGroup: slidesCount < 5 ? slidesCount : 5,
          },
          720: {
            slidesPerView: slidesCount < 6 ? slidesCount : 6,
            slidesPerGroup: slidesCount < 6 ? slidesCount : 6,
          },
          800: {
            slidesPerView: slidesCount < 7 ? slidesCount : 7,
            slidesPerGroup: slidesCount < 7 ? slidesCount : 7,
          },
          840: {
            slidesPerView: slidesCount < 8 ? slidesCount : 8,
            slidesPerGroup: slidesCount < 8 ? slidesCount : 8,
          },
          1010: {
            slidesPerView: slidesCount < 9 ? slidesCount : 9,
            slidesPerGroup: slidesCount < 9 ? slidesCount : 9,
          },
          1024: {
            slidesPerView: slidesCount < 2 ? slidesCount : 2,
            slidesPerGroup: slidesCount < 2 ? slidesCount : 2,
          },
          1080: {
            slidesPerView: slidesCount < 3 ? slidesCount : 3,
            slidesPerGroup: slidesCount < 3 ? slidesCount : 3,
          },
          1220: {
            slidesPerView: slidesCount < 4 ? slidesCount : 4,
            slidesPerGroup: slidesCount < 4 ? slidesCount : 4,
          },
          1320: {
            slidesPerView: slidesCount < 5 ? slidesCount : 5,
            slidesPerGroup: slidesCount < 5 ? slidesCount : 5,
          },
          1400: {
            slidesPerView: slidesCount < 6 ? slidesCount : 6,
            slidesPerGroup: slidesCount < 6 ? slidesCount : 6,
          },
          1520: {
            slidesPerView: slidesCount < 7 ? slidesCount : 7,
            slidesPerGroup: slidesCount < 7 ? slidesCount : 7,
          },
          1600: {
            slidesPerView: slidesCount < 8 ? slidesCount : 8,
            slidesPerGroup: slidesCount < 8 ? slidesCount : 8,
          },
          1800: {
            slidesPerView: slidesCount < 9 ? slidesCount : 9,
            slidesPerGroup: slidesCount < 9 ? slidesCount : 9,
          },
        }}
      >
        {members.map((member) =>
          member.isLeader ? (
            <SwiperSlide key={member.id}>
              <Profile member={member} mode={mode} />
            </SwiperSlide>
          ) : (
            <SwiperSlide key={member.id}>
              <Profile
                member={member}
                mode={mode}
                onChangeRadio={handleChangeLeader}
                onClickRemove={handleManageMembers}
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};
