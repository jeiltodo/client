import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Check, DeleteCircle } from '@jeiltodo/icons';

interface Toast {
  message: string;
  type: 'alert' | 'confirm';
  onClose?: () => void;
  button?: JSX.Element;
  autoClose?: number;
}
export const useToast = () => {
  return ({ message, type, onClose, button, autoClose = 4000 }: Toast) => {
    const alertConfig: ToastOptions = {
      //커스터마이징 옵션
      position: 'top-center',
      autoClose: autoClose,
      hideProgressBar: true,
      closeOnClick: false,
      rtl: false, //알림 좌우 반전 안 함
      pauseOnFocusLoss: false, //화면 벗어나도 알람 정지 안함
      draggable: false,
      pauseOnHover: false, //마우스 올리면 알람 정지하지 않음
      icon: checkIcon,
    };
    const confirmConfig: ToastOptions = {
      //커스터마이징 옵션
      position: 'top-center',
      autoClose: autoClose,
      hideProgressBar: true,
      closeOnClick: false,
      rtl: false, //알림 좌우 반전 안 함
      pauseOnFocusLoss: false, //화면 벗어나도 알람 정지 안함
      draggable: false,
      pauseOnHover: false, //마우스 올리면 알람 정지하지 않음
      icon: deleteCircleIcon,
      onClose: onClose as (() => void) | undefined,
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
const deleteCircleIcon = () => {
  return <DeleteCircle />;
};
