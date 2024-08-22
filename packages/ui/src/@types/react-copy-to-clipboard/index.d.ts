declare module 'react-copy-to-clipboard' {
  import { ReactNode } from 'react';

  interface CopyToClipboardProps {
    text: string;
    onCopy?: (text: string, result: boolean) => void;
    children: ReactNode;
  }

  export class CopyToClipboard extends React.Component<CopyToClipboardProps> {}
}
