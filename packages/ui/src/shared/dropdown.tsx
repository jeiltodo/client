'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { IconArrowDown, IconArrowUp } from "@jeiltodo/icons";

interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  selectedItem: string | null;
  selectItem: (item: string) => void;
}

interface DropdownProps {
  children: ReactNode;
  onSelect?: (item: string) => void;
}

interface DropdownToggleProps {
  children?: ReactNode;
  size: 'lg' | 'fixed' | 'sm';
  round: 'round' | 'rect';
}

interface DropdownMenuProps {
  children: ReactNode;
  round: 'round' | 'rect';
}

interface DropdownItemProps {
  children: ReactNode;
  value: string;
  size: 'lg' | 'fixed' | 'sm';
  round: 'round' | 'rect';
}

const sizeClass = {
  lg: 'w-[478px] h-[48px] py-[12px] pr-[8px] pl-[12px]',
  fixed: 'w-full h-[44px] py-[12px] pr-[8px] pl-[12px]',
  sm: 'w-[124px] h-[36px] py-[8px] pr-[8px] pl-[12px]',
};

const roundClass = {
  round: 'rounded-xl',
  rect: 'rounded-[4px]',
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

const DropdownToggle = ({ children, size, round }: DropdownToggleProps) => {
  const { toggle, selectedItem } = useDropdownContext();

  return (
    <button
      onClick={toggle}
      className={`flex items-center justify-between ${sizeClass[size]} ${roundClass[round]} bg-slate-50`}
    >
      <div>{selectedItem || children || '목표를 선택해주세요'}</div>
      <div className='pl-[4px] border-l-[2px] border-l-[#E2E8F0]'>아이콘~</div>
    </button>
  );
};

const DropdownMenu = ({ children, round }: DropdownMenuProps) => {
  const { isOpen } = useDropdownContext();

  return (
    <div
      className={`absolute mt-2 ${roundClass[round]} bg-slate-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      {children}
    </div>
  );
};

const DropdownItem = ({ children, value, size, round }: DropdownItemProps) => {
  const { selectItem, toggle } = useDropdownContext();

  const handleClick = () => {
    selectItem(value);
    toggle();
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer ${sizeClass[size]} ${roundClass[round]} bg-slate-50`}
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
