import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  label: string;
}

export const Field = ({ label, children }: Props) => {
  return (
    <div className='flex flex-wrap w-full gap-1'>
      <span className='inline-block w-full text-sm text-slate-800 font-light opacity-50'>
        {label}
      </span>
      <p className='text-lg text-slate-800 font-semibold'>{children}</p>
    </div>
  );
};
