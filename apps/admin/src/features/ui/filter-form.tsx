'use client';
import { Button, ButtonGroup, Input } from '@jeiltodo/ui';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface FilterField {
  label: string;
  name: string;
  type?: 'email' | 'date'; // 선택
  placeholder?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

interface FilterFormProps {
  formType: FilterField[];
}

export const FilterForm: React.FC<FilterFormProps> = ({ formType }) => {
  const [activeBtn, setActiveBtn] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

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

    setStartDate(start);
    setEndDate(end);

    formType.forEach((field) => {
      if (field.label === '기간') {
        field.setValue(`${start}&${end}`);
      }
    });
  };

  const handleDateChange = (
    value: string,
    isStart: boolean
  ) => {
    if (isStart) {
      setStartDate(value);
    } else {
      setEndDate(value);
    }

    formType.forEach((formField) => {
      if (formField.label === '기간') {
        const newStart = isStart ? value : startDate;
        const newEnd = isStart ? endDate : value;
        formField.setValue(`${newStart}&${newEnd}`);
      }
    });
  };

  return (
    <div className='flex flex-col gap-3 '>
      {formType?.map((field, id) => (
        <div key={id} className='font-pretendard-medium'>
          {field.label === '기간' ? (
            <div className='flex items-center justify-start'>
              <label className='flex items-center w-[80px] h-[48px] font-pretendard-medium font-normal text-[14px]'>
                {field.label}
              </label>
              <ButtonGroup gap={2}>
                {['오늘', '3일', '7일', '30일', '기간'].map((label) => (
                  <Button
                    key={label}
                    isSelected={activeBtn === label}
                    variant='outline-date'
                    className='w-[84px] h-[36px]'
                    onClick={() => handleButtonClick(label)}
                  >
                    {label}
                  </Button>
                ))}
              </ButtonGroup>
              {activeBtn === '기간' && (
                <div className='ml-2 flex items-center justify-start gap-2'>
                  <input
                    type='date'
                    name={`${field.name}Start`}
                    value={startDate}
                    onChange={(e) =>
                      handleDateChange(e.target.value, true)
                    }
                    className='px-2 block w-[138px] h-[36px] text-base text-slate-800  placeholder-slate-400 rounded-[8px] border border-slate-50 hover:border-blue-300 focus:border-blue-500 bg-slate-50 focus:outline-none'
                  />
                  <div>~</div>
                  <input
                    type='date'
                    name={`${field.name}End`}
                    value={endDate}
                    onChange={(e) =>
                      handleDateChange(e.target.value, false)
                    }
                    className='px-2 block w-[138px] h-[36px] text-base text-slate-800  placeholder-slate-400 rounded-[8px] border border-slate-50 hover:border-blue-300 focus:border-blue-500 bg-slate-50 focus:outline-none'
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
                type={field.type || 'text'}
                name={field.name}
                value={field.value}
                placeholder={field.placeholder}
                onChange={(e) => field.setValue(e.target.value)}
                className='block w-[810px] h-[48px] rounded-md'
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
