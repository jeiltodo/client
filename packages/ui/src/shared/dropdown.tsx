"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type DropdownContextType = {
  isOpen: boolean;
  toggle: () => void;
  selectedItem: string | null;
  selectItem: (item: string) => void;
};

type DropdownProps = {
  children: ReactNode;
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
    throw new Error("Dropdown context not found");
  }
  return context;
};

const DropdownToggle = ({ children }: DropdownToggleProps) => {
  const { toggle, selectedItem } = useDropdownContext();

  return (
    <button onClick={toggle} className="p-2 border rounded">
      {selectedItem || children || "목표를 선택하세요"}
    </button>
  );
};

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const { isOpen } = useDropdownContext();

  return (
    <div
      className={`absolute mt-2 bg-white border rounded shadow ${
        isOpen ? "block" : "hidden"
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
      className="cursor-pointer p-2 hover:bg-gray-200"
    >
      {children}
    </div>
  );
};

// Dropdown context 초기값 지정 및
export const Dropdown = ({ children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <DropdownContext.Provider
      value={{ isOpen, toggle, selectedItem, selectItem }}
    >
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
};

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
