'use client';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react';

import { BoardMode } from './type';

export interface MembersBoardContextType {
  mode: BoardMode;
  changeMode: Dispatch<SetStateAction<BoardMode>>;
}

export const MembersBoardContext =
  createContext<MembersBoardContextType | null>(null);

export const MembersBoardProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<BoardMode>('default');

  return (
    <MembersBoardContext.Provider value={{ mode, changeMode: setMode }}>
      {children}
    </MembersBoardContext.Provider>
  );
};
