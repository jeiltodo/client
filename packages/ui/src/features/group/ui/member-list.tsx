import { Member, Profile } from '@jeiltodo/ui/entities';
import { useBoardContext } from '@jeiltodo/ui/shared';

interface Props {
  members: Member[];
  onClientChangeLeader: (id: number) => void;
  onClientRemoveMember: (id: number) => void;
}

export const MemberList = ({
  members,
  onClientChangeLeader: onChangeLeader,
  onClientRemoveMember: onRemoveMember,
}: Props) => {
  const { mode } = useBoardContext();

  const groupLeader = members.filter((member) => member.isLeader === true);
  const groupMembers = members.filter((member) => member.isLeader !== true);

  const handleChangeLeader = (id: number) => {
    onChangeLeader(id);
  };

  const handleManageMembers = (id: number) => {
    onRemoveMember(id);
  };
  return (
    <div className='h-fit flex gap-6 items-center '>
      {groupLeader.map((member) => (
        <Profile key={member.id} member={member} mode={mode} />
      ))}
      {groupMembers.map((member) => (
        <Profile
          key={member.id}
          member={member}
          mode={mode}
          onChangeRadio={handleChangeLeader}
          onClickRemove={handleManageMembers}
        />
      ))}
    </div>
  );
};
