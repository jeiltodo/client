'use client';
import {
  Avatar,
  AvatarDefault,
  AvatarRags,
  AvatarSunglasses,
  MemberHat,
  XWhiteCircle,
} from '@jeiltodo/icons';
import { Radio } from '../../../shared';
import { BoardMode } from '../../../shared/model/type';
import { Member } from '../model/type';
import { RANK_HIGHST, RANK_LOWEST } from '../constants/contributionRank';

interface Props {
  member: Member;
  mode: BoardMode;
  onChangeRadio?: (id: number) => void;
  onClickRemove?: (id: number) => void;
}

export const Profile = ({
  member: { id, color, nickname, contributionRank, isLeader = false },
  mode,
  onChangeRadio,
  onClickRemove,
}: Props) => {
  return (
    <div className={`relative w-fit pt-6`}>
      {isLeader === true && mode !== 'change-leader' && (
        <span className='absolute top-[-4px] inline-block w-full  text-center font-semibold text-sm text-white'>
          그룹장
        </span>
      )}
      <div className='relative'>
        {isLeader === false && mode === 'change-leader' && (
          <Radio
            id={id}
            onChange={() => {
              onChangeRadio && onChangeRadio(id);
            }}
            className='absolute right-[-16px] top-[-8px] z-10'
          />
        )}
        {isLeader === false && mode === 'manage-members' && (
          <XWhiteCircle
            width={20}
            height={20}
            className='absolute right-[-8px] top-[-8px] z-10 cursor-pointer'
            onClick={() => {
              onClickRemove && onClickRemove(id);
            }}
          />
        )}
        <div style={{ color }} className='relative'>
          <AvatarDefault width={64} height={64} />
          <MemberHat width={38} className='absolute top-[12px] left-[14px]' />
        </div>
        {contributionRank === RANK_LOWEST && (
          <AvatarRags width={64} height={64} className='absolute inset-0' />
        )}
        {contributionRank === RANK_HIGHST && (
          <AvatarSunglasses
            width={64}
            height={64}
            className='absolute inset-0'
          />
        )}
      </div>
      <span className='inline-block w-full  text-center font-semibold text-sm text-white mt-2'>
        {nickname}
      </span>
    </div>
  );
};
