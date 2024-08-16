import { useContext } from 'react';
import { MembersBoardContext } from '../model/members-board-provider';

export const useBoardContext = () => {
  const boardContext = useContext(MembersBoardContext);
  if (!boardContext) {
    throw Error(`MembersBoardContext 내부에서 사용해주세요`);
  }

  return boardContext;
};
