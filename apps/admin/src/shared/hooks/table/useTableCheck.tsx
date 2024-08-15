'use client';
import { useState } from 'react';

interface WithId {
  id: number;
}

export function useTableCheck<T extends WithId>(tableData: T[]) {
  const tableCheckList = tableData.map((table) => ({
    id: table.id,
    isChecked: false,
  }));
  const [checkList, setCheckList] = useState(tableCheckList);

  const isAllChecked =
    checkList.findIndex((checkItem) => !checkItem.isChecked) < 0;

  const handleAllCheck = () => {
    setCheckList((prev) => {
      const updated = prev.map((checkItem) => ({
        ...checkItem,
        isChecked: !isAllChecked,
      }));
      return updated;
    });
  };

  const getIsChecked = (id: number) => {
    return checkList.find((checkItem) => checkItem.id === id)!.isChecked;
  };

  const handleCheck = (id: number) => {
    setCheckList((prev) => {
      return prev.map((checkItem) => ({
        ...checkItem,
        isChecked:
          checkItem.id === id ? !checkItem.isChecked : checkItem.isChecked,
      }));
    });
  };

  return { handleAllCheck, handleCheck, isAllChecked, getIsChecked };
}
