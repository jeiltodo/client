import {
  Avatar,
  AvatarRags,
  AvatarSunglasses,
  XWhiteCircle,
} from '@jeiltodo/icons';
import { Radio } from '../../../shared';
import { BoardMode } from '../../../shared/model/type';

type Member = {
  id: number;
  colorCode: number;
  name: string;
  isLeader?: boolean;
  contributionRank?: number;
};

interface Props {
  member: Member;
  mode: BoardMode;
  onChangeRadio?: (id: number) => void;
  onClickRemove?: (id: number) => void;
}

export const Profile = ({
  member: { id, colorCode, name, contributionRank, isLeader = false },
  mode,
  onChangeRadio,
  onClickRemove,
}: Props) => {
  const colorClass = `text-group-${colorCode}`;
  const CONTRIBUTION_LOW = 0;
  const CONTRIBUTION_HIHG = 1;

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
        <Avatar width={64} height={64} className={colorClass} />
        {contributionRank === CONTRIBUTION_LOW && (
          <AvatarRags width={64} height={64} className='absolute inset-0' />
        )}
        {contributionRank === CONTRIBUTION_HIHG && (
          <AvatarSunglasses
            width={64}
            height={64}
            className='absolute inset-0'
          />
        )}
      </div>
      <span className='inline-block w-full  text-center font-semibold text-sm text-white mt-2'>
        {name}
      </span>
    </div>
  );
};
