import { Input } from '@jeiltodo/ui';
import React, { Dispatch, SetStateAction } from 'react';

interface FilterField {
  label: string;
  name: string;
  type?: 'email' | 'date'; // 선택
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

interface FilterFormProps {
  formType: FilterField[];
}

export const FilterForm: React.FC<FilterFormProps> = ({ formType }) => {
  console.log(formType);
  return (
    <form>
      {formType?.map((field, id) => (
        <div key={id} className='mb-4 font-pretendard-medium'>
          {field.label === '기간' ? (
            <div>
              <label className='block text-gray-700'>
                {field.label}
                <Input
                  type={field.type || 'date'}
                  name={field.name}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  className='mt-1 block w-full border border-gray-300 rounded-md'
                />
              </label>
            </div>
          ) : (
            <div>
              <label className='block text-gray-700'>
                {field.label}
                <Input
                  type={field.type || 'text'}
                  name={field.name}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  className='mt-1 block w-full border border-gray-300 rounded-md'
                />
              </label>
            </div>
          )}
        </div>
      ))}
    </form>
  );
};
