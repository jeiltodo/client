'use client';
import { BgGroupAvatar, GroupFill } from '@jeiltodo/icons';
import { MembersManageButtons } from '../../../features/group/ui/members-manage-buttons';
import { useBoardContext } from '@jeiltodo/ui/shared';
import { MemberList } from '../../../features/group/ui';
import { GroupWithMembers, Member } from '../../../entities';
import { getFormattedRanks } from '../../../entities/group/lib/getFormattedRanks';
import { useState } from 'react';

interface MembersBoardProps {
  members: Member[];
  userId?: number;
  onChangeLeader: (id: number) => void;
  onRemoveMember: (id: number) => void;
  isAdmin?: boolean;
}

const MembersBoard = ({
  members,
  userId,
  onChangeLeader,
  onRemoveMember,
  isAdmin = false,
}: MembersBoardProps) => {
  const { mode } = useBoardContext();

  const leaderId = members.find((member) => member.isLeader)!.id;
  const isUserALeader = userId ? leaderId === userId : isAdmin;
  const [newLeaderId, setNewLeaderId] = useState<number>(leaderId);
  const [deletedId, setDeletedId] = useState<number | null>(null);

  const sortedMembers = members
    .map((member) => ({ id: member.id, rank: member.contributionRank }))
    .sort((a, b) => a.rank - b.rank);
  const lowestRankNum = sortedMembers.pop()!.rank;

  const formattedMembers = members
    .map((member) => ({
      ...member,
      contributionRank: getFormattedRanks(
        member.id,
        sortedMembers,
        lowestRankNum
      ),
    }))
    .filter((member) => member.id !== deletedId);

  const handleClientChange = (selectedLeaderId: number) => {
    setNewLeaderId(selectedLeaderId);
  };

  const handleClientRemove = (memberId: number) => {
    setDeletedId(memberId);
  };

  const handleSave = () => {
    mode === 'change-leader'
      ? onChangeLeader(newLeaderId)
      : deletedId && onRemoveMember(deletedId);
  };

  return (
    <div
      className={`relative px-6 py-4 rounded-lg mobile:w-full desktop:max-w-[734px] ${isAdmin ? 'w-[504px] bg-blue-500' : 'bg-orange-500'} overflow-hidden`}
    >
      <div className='w-full h-full'>
        <div className='flex flex-row justify-between items-center mb-6 tablet:flex-row  gap-y-3'>
          <div className='flex gap-4 items-center'>
            {/* desktop:hidden !xl:flex */}
            <div className='hidden tablet:flex gap-2 items-center'>
              <GroupFill height={40} width={40} />
              <span className='font-semibold text-lg text-nowrap text-white'>
                구성원
              </span>
            </div>
            <div className='bg-white opacity-50 rounded-md w-fit h-fit px-1 py-0 flex justify-center items-center bottom-1'>
              <span className='text-slate-800'>{members.length}</span>
              <span
                className={isAdmin ? 'text-blue-500' : 'text-groupColor-500'}
              >
                /10
              </span>
            </div>
          </div>

          {isUserALeader || isAdmin ? (
            <MembersManageButtons isAdmin={isAdmin} onSave={handleSave} />
          ) : null}
        </div>
        <div className='flex h-4/5 items-center -mt-6 overflow-hidden tablet:pb-6 desktop:pb-0'>
          <div className='px-4 w-full'>
            <MemberList
              members={formattedMembers}
              onClientChangeLeader={handleClientChange}
              onClientRemoveMember={handleClientRemove}
            />
          </div>
        </div>
        <BgGroupAvatar
          className='block w-[120px] h-[120px] right-[-12px] bottom-[-16px] desktop:w-[184px] desktop:h-[184px] absolute z-1 desktop:right-[-32px] desktop:bottom-[-24px]'
          height={164}
          width={164}
        />
      </div>
    </div>
  );
};

export { MembersBoard };
