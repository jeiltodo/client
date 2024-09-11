import { PropsWithChildren } from 'react';

interface FieldProps extends PropsWithChildren {
	label: string;
}

export const Field = ({ label, children }: FieldProps) => {
	return (
		<div className='flex flex-wrap w-full gap-1'>
			<span className='inline-block w-full text-sm text-slate-800 font-light opacity-50'>
				{label}
			</span>
			<div className='text-lg text-slate-800 font-semibold'>{children}</div>
		</div>
	);
};
