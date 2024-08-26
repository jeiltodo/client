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

  const handleChangeLeader = (id: number) => {
    onChangeLeader(id);
  };

  const handleManageMembers = (id: number) => {
    onRemoveMember(id);
  };

  return (
    <div className='relative h-fit flex gap-6 items-center'>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={2}
        slidesPerGroup={2}
        spaceBetween={24}
        scrollbar={{ draggable: true }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          370: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          420: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          500: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          640: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          720: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          800: {
            slidesPerView: 7,
            slidesPerGroup: 7,
          },
          840: {
            slidesPerView: 8,
            slidesPerGroup: 8,
          },
          1010: {
            slidesPerView: 9,
            slidesPerGroup: 9,
          },
          1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1080: { slidesPerView: 3, slidesPerGroup: 3 },
          1220: { slidesPerView: 4, slidesPerGroup: 4 },
          1280: { slidesPerView: 5, slidesPerGroup: 5 },
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
