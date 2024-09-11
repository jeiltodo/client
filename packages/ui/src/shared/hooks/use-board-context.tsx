import React from 'react';
import {
  MembersBoardContext,
  MembersBoardContextType,
} from '../model/members-board-provider';

export const useBoardContext = (): MembersBoardContextType => {
  const boardContext = React.useContext(MembersBoardContext);
  if (!boardContext) {
    throw Error(`MembersBoardContext 내부에서 사용해주세요`);
  }

  return boardContext;
};
