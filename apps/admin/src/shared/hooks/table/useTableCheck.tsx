'use client';
import { useContext } from 'react';
import { TableCheckListContext } from '../../model/table/table-checklist-provider';

export function useTableCheck() {
  const context = useContext(TableCheckListContext);
  if (!context) {
    throw new Error('tabel checklist provider 내부에서 사용해주세요 ');
  }

  const { checkList, updateCheckList } = context;
  const isAllChecked =
    checkList.findIndex((checkItem) => !checkItem.isChecked) < 0;

  const handleAllCheck = () => {
    updateCheckList((prev) => {
      const updated = prev.map((checkItem) => ({
        ...checkItem,
        isChecked: !isAllChecked,
      }));
      return updated;
    });
  };

  const getIsChecked = (id: number): boolean => {
    const checkItem = checkList.find((checked) => checked.id === id);
    return checkItem?.isChecked ?? false;
  };

  const handleCheck = (id: number) => {
    updateCheckList((prev) => {
      return prev.map((checkItem) => ({
        ...checkItem,
        isChecked:
          checkItem.id === id ? !checkItem.isChecked : checkItem.isChecked,
      }));
    });
  };

  return { checkList, handleAllCheck, handleCheck, isAllChecked, getIsChecked };
}
