'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type DropdownContextType = {
  isOpen: boolean;
  toggle: () => void;
  selectedItem: string | null;
  selectItem: (item: string) => void;
};

type DropdownProps = {
  children: ReactNode;
  onSelect?: (item: string) => void;
};

type DropdownToggleProps = {
  children?: ReactNode;
};

type DropdownMenuProps = {
  children: ReactNode;
};

type DropdownItemProps = {
  children: ReactNode;
  value: string;
};

// Dropdown context 설정
const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('No context');
  }
  return context;
};

const DropdownToggle = ({ children }: DropdownToggleProps) => {
  const { toggle, selectedItem } = useDropdownContext();

  return (
    <button
      onClick={toggle}
      className='flex items-center justify-between text-sm w-[472px] h-[48px] py-[12px] px-[20px] bg-slate-50 rounded-[12px]'
    >
      {selectedItem || children || '목표를 선택해주세요'}
    </button>
  );
};

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const { isOpen } = useDropdownContext();

  return (
    <div
      className={`absolute mt-2 w-[472px] bg-slate-50 rounded-[12px] ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      {children}
    </div>
  );
};

const DropdownItem = ({ children, value }: DropdownItemProps) => {
  const { selectItem, toggle } = useDropdownContext();

  const handleClick = () => {
    selectItem(value);
    toggle();
  };

  return (
    <div
      onClick={handleClick}
      className='cursor-pointer w-[472px] py-[12px] px-[20px] hover:bg-gray-200 rounded-[12px] text-sm '
    >
      {children}
    </div>
  );
};

// Dropdown context 초기값 지정 및
export const Dropdown = ({ children, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (item: string) => {
    setSelectedItem(item);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <DropdownContext.Provider
      value={{ isOpen, toggle, selectedItem, selectItem }}
    >
      <div className='relative'>{children}</div>
    </DropdownContext.Provider>
  );
};

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
