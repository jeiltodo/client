import { Checkbox } from '@jeiltodo/ui/shared';

import { ChangeEvent } from 'react';
import { TableHead } from './head';

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}

export const TableHeadWithCheck = ({ isChecked, onChange }: Props) => {
  return (
    <TableHead>
      <Checkbox isChecked={isChecked} onChange={onChange} />
    </TableHead>
  );
};
