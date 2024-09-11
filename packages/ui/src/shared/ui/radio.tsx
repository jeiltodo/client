interface RadioProps {
  id: number;
  onChange: (id: number) => void;
  className?: string;
}

export const Radio = ({ id, onChange, className }: RadioProps) => {
  return (
    <div className={`flex items-center ${className} `}>
      <input
        className='sr-only peer'
        id={`radio-${id}`}
        name='radio-group'
        onChange={() => {
          onChange(id);
        }}
        type='radio'
      />
      <label
        className='cursor-pointer w-5 h-5 inline-block mr-2 rounded-full border-2 border-blue-300 bg-white peer-checked:bg-blue-500 ring-2 ring-white ring-inset'
        htmlFor={`radio-${id}`}
      >
        <span className='sr-only'>{`Option ${id}`}</span>{' '}
      </label>
    </div>
  );
};
