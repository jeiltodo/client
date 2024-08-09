import { Dropdown } from '@jeiltodo/ui/shared';
import { Goal } from '../model/type';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  goals: Pick<Goal, 'id' | 'title'>[];
  defaultGoal?: Pick<Goal, 'id' | 'title'>;
  onSelect: Dispatch<SetStateAction<string | number | undefined>>;
}

export const GoalDropdown = ({ goals, defaultGoal, onSelect }: Props) => {
  return (
    <Dropdown
      hasInitialValue={true}
      onSelect={onSelect}
      size='fixed'
      round='round'
      defaultValue={
        defaultGoal && { value: defaultGoal.id, text: defaultGoal.title }
      }
    >
      <Dropdown.Toggle>목표를 선택해주세요</Dropdown.Toggle>
      <Dropdown.Menu>
        {goals.map((goal) => (
          <Dropdown.Item key={goal.id} value={goal.id}>
            {goal.title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
