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

interface ProfileProps {
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
}: ProfileProps) => {
  return (
    <div className="flex flex-col items-center w-20 pt-6">
      {isLeader && mode !== 'change-leader' ? <span className='absolute top-[-4px] inline-block w-full  text-center font-semibold text-sm text-white'>
          그룹장
        </span> : null}
      <div className='relative'>
        {!isLeader && mode === 'change-leader' && (
          <Radio
            className='absolute right-[-16px] top-[-8px] z-10'
            id={id}
            onChange={() => {
              onChangeRadio && onChangeRadio(id);
            }}
          />
        )}
        {!isLeader && mode === 'manage-members' && (
          <XWhiteCircle
            className='absolute right-[-8px] top-[-8px] z-10 cursor-pointer'
            height={20}
            onClick={() => {
              onClickRemove && onClickRemove(id);
            }}
            width={20}
          />
        )}
        <div className='relative' style={{ color }}>
          <AvatarDefault height={64} width={64} />
          <MemberHat className='absolute top-[12px] left-[14px]' width={38} />
        </div>
        {contributionRank === RANK_LOWEST && (
          <AvatarRags className='absolute inset-0' height={64} width={64} />
        )}
        {contributionRank === RANK_HIGHST && (
          <AvatarSunglasses
            className='absolute inset-0'
            height={64}
            width={64}
          />
        )}
      </div>
      <span className='inline-block w-full text-clip text-center font-semibold text-sm text-white mt-2'>
        {nickname}
      </span>
    </div>
  );
};
