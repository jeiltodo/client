import { toast, ToastOptions } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Check, CheckGroup, DeleteCircleError } from '@jeiltodo/icons';

interface Toast {
  message: string;
  type: 'alert' | 'confirm';
  onClose?: () => void;
  button?: JSX.Element;
  autoClose?: number;
  isGroup?: boolean;
}
const getClassName = (isGroup: boolean): string => {
  return `${
    isGroup
      ? 'bg-groupColor-200 text-groupColor-800 border-groupColor-400'
      : 'bg-[#eff6ff] text-slate[800] border-blue-200'
  } w-full border rounded-[28px]`;
};

export const useToast = () => {
  return ({
    message,
    type,
    onClose,
    button,
    isGroup = false,
    autoClose = 3000,
  }: Toast) => {
    const backgroundColor = getClassName(isGroup);

    const alertConfig: ToastOptions = {
      //커스터마이징 옵션
      position: 'top-center',
      autoClose,
      hideProgressBar: true,
      closeOnClick: true,
      rtl: false, //알림 좌우 반전 안 함
      pauseOnFocusLoss: false, //화면 벗어나도 알람 정지 안함
      draggable: false,
      pauseOnHover: false, //마우스 올리면 알람 정지하지 않음
      icon: isGroup ? groupCheckIcon : checkIcon,
      bodyClassName: getClassName(isGroup),
    };
    const confirmConfig: ToastOptions = {
      //커스터마이징 옵션
      position: 'top-center',
      autoClose,
      hideProgressBar: true,
      closeOnClick: true,
      rtl: false, //알림 좌우 반전 안 함
      pauseOnFocusLoss: false, //화면 벗어나도 알람 정지 안함
      draggable: false,
      pauseOnHover: false, //마우스 올리면 알람 정지하지 않음
      icon: deleteCircleIcon,
      onClose: onClose as (() => void) | undefined,
      bodyClassName: 'bg-[#FFCCCC] border-error',
    };
    const content = (
      <div
        className='confirm'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>{message}</span>
        {button}
      </div>
    );

    if (type === 'alert') toast.success(message, alertConfig);
    if (type === 'confirm') toast.info(content, confirmConfig);

    //호출하는 컴포넌트에서 toast.dismiss(); 하면 토스트 꺼짐
  };
};

const checkIcon = () => {
  return <Check />;
};
const groupCheckIcon = () => {
  return <CheckGroup />;
};
const deleteCircleIcon = () => {
  return <DeleteCircleError />;
};
