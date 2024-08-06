import { Profile } from '@jeiltodo/ui/entities';
import { useBoardContext } from '@jeiltodo/ui/shared';

interface Props {
  onChangeLeader: (id: number) => void;
  onRemoveMember: (id: number) => void;
}

export const MemberList = ({ onChangeLeader, onRemoveMember }: Props) => {
  const { mode, changeMode } = useBoardContext();

  const members = [
    {
      id: 1,
      colorCode: 1,
      name: '체다치즈',
      contributionRank: 1,
    },
    {
      id: 2,
      colorCode: 2,
      name: '모짜렐라',
      isLeader: true,
      contributionRank: 0,
    },
    {
      id: 3,
      colorCode: 3,
      name: '고다치즈',
    },
    {
      id: 4,
      colorCode: 4,
      name: '부라타치즈',
    },
  ];

  const groupLeader = members.filter((member) => member.isLeader === true);
  const groupMembers = members.filter((member) => member.isLeader !== true);

  const handleChangeLeader = (id: number) => {
    onChangeLeader(id);
    changeMode('default');
  };

  const handleManageMembers = (id: number) => {
    onRemoveMember(id);
    changeMode('default');
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
