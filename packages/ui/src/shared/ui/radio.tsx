interface Props {
  id: number;
  onChange: (id: number) => void;
  className?: string;
}

export const Radio = ({ id, onChange, className }: Props) => {
  return (
    <div className={`flex items-center ${className} `}>
      <input
        type='radio'
        id={`radio-${id}`}
        name='radio-group'
        className={`sr-only peer`}
        onChange={() => {
          onChange(id);
        }}
      />
      <label
        htmlFor={`radio-${id}`}
        className='cursor-pointer w-5 h-5 inline-block mr-2 rounded-full border-2 border-blue-300 bg-white  peer-checked:bg-blue-500 ring-2 ring-white ring-inset'
      ></label>
    </div>
  );
};
