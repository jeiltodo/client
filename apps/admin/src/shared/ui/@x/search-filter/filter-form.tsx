'use client';

import { Button, ButtonGroup, Input } from '@jeiltodo/ui/shared';
import type { Dispatch, SetStateAction } from 'react';
import React, { useState } from 'react';
import type { TableFilter, TableQueryName } from '../../../model/table/type';

interface FilterFormProps {
  filters: TableFilter[];
  filtersState: Record<string, string>;
  updateFiltersState: Dispatch<SetStateAction<Record<string, string>>>;
}

export const FilterForm: React.FC<FilterFormProps> = ({
  filters,
  filtersState,
  updateFiltersState,
}) => {
  const [activeBtn, setActiveBtn] = useState<string>('');
  const [createdAfter, setCreatedAfter] = useState<string>('');
  const [createdBefore, setCreatedBefore] = useState<string>('');

  const handleButtonClick = (label: string) => {
    setActiveBtn(label);
    const today = new Date();
    let start = '';
    let end = today.toISOString().split('T')[0]; // 현재 날짜 (오늘)

    switch (label) {
      case '오늘':
        start = end;
        break;
      case '3일':
        start = new Date(today.setDate(today.getDate() - 3))
          .toISOString()
          .split('T')[0];
        break;
      case '7일':
        start = new Date(today.setDate(today.getDate() - 7))
          .toISOString()
          .split('T')[0];
        break;
      case '30일':
        start = new Date(today.setDate(today.getDate() - 30))
          .toISOString()
          .split('T')[0];
        break;
      case '기간':
        start = ''; // 기간 선택시 초기화
        end = ''; // 기간 선택시 초기화
        break;
      default:
        start = '';
        end = '';
    }

    setCreatedAfter(start);
    setCreatedBefore(end);

    filters.forEach((field) => {
      if (field.label === '기간') {
        updateFiltersState((prev) => ({
          ...prev,
          createdAfter: start,
          createdBefore: end,
        }));
      }
    });
  };

  const handleDateChange = (value: string, isStart: boolean) => {
    if (isStart) {
      setCreatedAfter(value);
    } else {
      setCreatedBefore(value);
    }

    filters.forEach((filter) => {
      if (filter.label === '기간') {
        const newStart = isStart ? value : createdAfter;
        const newEnd = isStart ? createdBefore : value;
        updateFiltersState((prev) => ({
          ...prev,
          createdAfter: newStart,
          createdBefore: newEnd,
        }));
      }
    });
  };

  return (
    <div className='flex flex-col gap-3 '>
      {filters.map((field) => (
        <div
          className='font-pretendard-medium'
          key={`${field.label}-${field.query}`}
        >
          {field.label === '기간' ? (
            <div className='flex items-center justify-start'>
              <label className='flex items-center w-[80px] h-[48px] font-pretendard-medium font-normal text-[14px]'>
                {field.label}
              </label>
              <ButtonGroup gap={2}>
                {['오늘', '3일', '7일', '30일', '기간'].map((label) => (
                  <Button
                    className='w-[84px] h-[36px]'
                    isSelected={activeBtn === label}
                    key={label}
                    onClick={() => {
                      handleButtonClick(label);
                    }}
                    variant='outline-date'
                  >
                    {label}
                  </Button>
                ))}
              </ButtonGroup>
              {activeBtn === '기간' && (
                <div className='ml-2 flex items-center justify-start gap-2'>
                  <input
                    className='px-2 block w-[138px] h-[36px] text-base text-slate-800  placeholder-slate-400 rounded-[8px] border border-slate-50 hover:border-blue-300 focus:border-blue-500 bg-slate-50 focus:outline-none'
                    name={`${field.query}Start`}
                    onChange={(e) => {
                      handleDateChange(e.target.value, true);
                    }}
                    type='date'
                    value={createdAfter}
                  />
                  <div>~</div>
                  <input
                    className='px-2 block w-[138px] h-[36px] text-base text-slate-800  placeholder-slate-400 rounded-[8px] border border-slate-50 hover:border-blue-300 focus:border-blue-500 bg-slate-50 focus:outline-none'
                    name={`${field.query}End`}
                    onChange={(e) => {
                      handleDateChange(e.target.value, false);
                    }}
                    type='date'
                    value={createdBefore}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className='flex items-center justify-start'>
              <label className='flex items-center w-[80px] h-[48px] font-pretendard-medium font-normal text-[14px]'>
                {field.label}
              </label>
              <Input
                className='block w-[810px] h-[48px] rounded-md'
                name={field.query}
                onChange={(e) => {
                  updateFiltersState((prev) => ({
                    ...prev,
                    [field.query]: e.target.value,
                  }));
                }}
                placeholder={field.placeholder}
                type={field.type || 'text'}
                value={filtersState[field.query as TableQueryName]}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
