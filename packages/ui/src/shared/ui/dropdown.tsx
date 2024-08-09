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

interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  selectedValue: string | number | null;
  selectedText: ReactNode | null;
  selectValue: (item: string | number) => void;
  selectText: (item: ReactNode) => void;
  size: 'lg' | 'fixed' | 'sm';
  round: 'round' | 'rect';
}

interface DropdownProps {
  children: ReactNode;
  onSelect: React.Dispatch<React.SetStateAction<string | number | undefined>>;
  hasInitialValue: boolean;
  size: 'lg' | 'fixed' | 'sm';
  round: 'round' | 'rect';
  defaultValue?: InitialItem;
}

interface DropdownToggleProps {
  children?: ReactNode;
}

interface DropdownMenuProps {
  children: ReactNode;
}

interface DropdownItemProps {
  children: ReactNode;
  value: string | number;
}

type InitialItem = { value: string | number; text: ReactNode } | null;

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

const DropdownToggle = ({ children }: DropdownToggleProps) => {
  const { isOpen, toggle, selectedText, size, round } = useDropdownContext();
  return (
    <button
      onClick={toggle}
      className={`flex items-center justify-between ${sizeClass[size]} ${roundClass[round]} bg-slate-50 text-sm font-pretendard-semibold`}
    >
      <div
        className={`flex items-center ${selectedText ? 'text-black' : 'text-slate-400'}`}
      >
        {selectedText === null ? children : selectedText}
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

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const { isOpen, round, size } = useDropdownContext();

  return (
    <div
      className={`absolute mt-2 w-full ${roundClass[round]} bg-slate-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      {children}
    </div>
  );
};

const DropdownItem = ({ children, value }: DropdownItemProps) => {
  const { selectValue, selectText, toggle, size, round } = useDropdownContext();

  const handleClick = () => {
    selectValue(value);
    selectText(children);
    toggle();
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer ${sizeClass[size]} ${roundClass[round]} bg-slate-50 text-sm font-pretendard-semibold hover:bg-slate-300 transition-all duration-300 ease-in-out`}
    >
      {children}
    </div>
  );
};

// Dropdown context 초기값 지정 및
export const Dropdown = ({
  children,
  onSelect,
  defaultValue,
  hasInitialValue,
  size,
  round,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    null
  );
  const [selectedText, setSelectedText] = useState<ReactNode | null>(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const selectValue = (value: string | number) => {
    setSelectedValue(value);
    if (onSelect) {
      onSelect(value);
    }
  };

  const selectText = (text: ReactNode) => {
    setSelectedText(text);
  };

  const initialValue = useMemo<InitialItem>(() => {
    if (!hasInitialValue) return null;

    let initialItem: InitialItem = null;
    if (hasInitialValue && defaultValue) {
      initialItem = defaultValue;
      return initialItem;
    }
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === DropdownMenu) {
        const items = React.Children.toArray(child.props.children);
        const firstItem = items.find(
          (item): item is React.ReactElement<DropdownItemProps> =>
            React.isValidElement(item) && item.type === DropdownItem
        );

        if (firstItem) {
          initialItem = {
            value: firstItem.props.value,
            text: firstItem.props.children,
          };
        }
      }
    });
    return initialItem;
  }, [hasInitialValue, children]);

  // 상태 업데이트
  useEffect(() => {
    if (initialValue && selectedValue === null) {
      selectValue(initialValue.value);
      selectText(initialValue.text);
    }
  }, [initialValue, selectedValue]);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        toggle,
        selectedValue,
        selectedText,
        selectValue,
        selectText,
        size,
        round,
      }}
    >
      <div className='relative '>{children}</div>
    </DropdownContext.Provider>
  );
};

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
