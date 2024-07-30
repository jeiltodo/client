'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { FullArrowDown, FullArrowUp } from '@jeiltodo/icons';

type DropdownContextType = {
  isOpen: boolean;
  toggle: () => void;
  selectedItem: string | null;
  selectItem: (item: string) => void;
};

type DropdownProps = {
  children: ReactNode;
  onSelect?: (item: string) => void;
  hasInitialValue: boolean;
};

type DropdownToggleProps = {
  children?: ReactNode;
  size: 'lg' | 'fixed' | 'sm';
  round: 'round' | 'rect';
};

type DropdownMenuProps = {
  children: ReactNode;
  round: 'round' | 'rect';
};

type DropdownItemProps = {
  children: ReactNode;
  value: string;
  size: 'lg' | 'fixed' | 'sm';
  round: 'round' | 'rect';
};

const sizeClass = {
  lg: 'w-[478px] h-[48px] py-[12px] pr-[8px] pl-[12px]',
  fixed: 'w-full h-[44px] py-[12px] pr-[8px] pl-[12px]',
  sm: 'w-[124px] h-[36px] py-[8px] pr-[8px] pl-[12px]',
};

const roundClass = {
  round: 'rounded-[12px]',
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
  const { isOpen, toggle, selectedItem } = useDropdownContext();

  return (
    <button
      onClick={toggle}
      className={`flex items-center justify-between ${sizeClass[size]} ${roundClass[round]} bg-slate-50 text-sm font-pretendard-semibold`}
    >
      <div
        className={`flex items-center ${selectedItem ? 'text-black' : 'text-slate-400'}`}
      >
        {selectedItem === null ? '' : (selectedItem || children || '목표를 선택해주세요')}
      </div>
      {isOpen ? (
        <div className='pl-[4px] border-l-[2px] border-slate-200'>
          <FullArrowUp className='w-6 h-6' />
        </div>
      ) : (
        <div className='pl-[4px] border-l-[2px] border-slate-200'>
          <FullArrowDown className='w-6 h-6' />
        </div>
      )}
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
      className={`cursor-pointer ${sizeClass[size]} ${roundClass[round]} bg-slate-50 text-sm font-pretendard-semibold`}
    >
      {children}
    </div>
  );
};

// Dropdown context 초기값 지정 및
export const Dropdown = ({
  children,
  onSelect,
  hasInitialValue,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  // 초기값 설정
  const initialValue = useMemo(() => {
    if (!hasInitialValue) return null;

    // DropdownMenu의 자식 요소 중 첫 번째 DropdownItem을 찾기
    let initialItem: string | null = null;
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === DropdownMenu) {
        const items = React.Children.toArray(child.props.children);
        const firstItem = items.find(
          (item) => React.isValidElement(item) && item.type === DropdownItem
        );

        if (firstItem && React.isValidElement(firstItem)) {
          initialItem = (firstItem.props as DropdownItemProps).value;
        }
      }
    });
    return initialItem;
  }, [hasInitialValue, children]);

  // 상태 업데이트
  useEffect(() => {
    if (initialValue) {
      selectItem(initialValue);
    }
  }, [initialValue]);

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
