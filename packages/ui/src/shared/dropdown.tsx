import React, { createContext, useContext, useState, ReactNode } from "react";

type DropdownContextType = {
  isOpen: boolean;
  toggle: () => void;
};

type DropdownProps = {
  children: ReactNode;
};

type DropdownToggleProps = {
  children: ReactNode;
};

//dropdown context 설정
const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Not context");
  }
  return context;
};

//dropdown context 초기값 지정 및 타이틀
export const Dropdown = ({ children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
};

const DropdownToggle = ({ children }: DropdownToggleProps) => {
  const { toggle } = useDropdownContext();

  return (
    <button onClick={toggle} className="p-2 border rounded">
      {children}
    </button>
  );
};

type DropdownMenuProps = {
  children: ReactNode;
};

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const { isOpen } = useDropdownContext();

  return (
    <div
      className={`absolute mt-2 bg-white border rounded shadow ${isOpen ? "block" : "hidden"}`}
    >
      {children}
    </div>
  );
};

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;


