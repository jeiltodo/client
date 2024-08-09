interface NoteDetailSlideProps {
  data: object;
  isSlideOpen: boolean;
  handleSlideOpen: (arg: number) => void;
}

export const NoteDetailSlide = ({
  data,
  isSlideOpen,
  handleSlideOpen,
}: NoteDetailSlideProps) => {
  return <div>{data}</div>;
};
