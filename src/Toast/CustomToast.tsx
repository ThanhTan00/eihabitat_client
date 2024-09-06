import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const showToastMessage = (
  message: string,
  type: "success" | "error" | "info" | "warning",
  options?: ToastOptions
) => {
  const toastOption = { ...defaultToastOptions, ...options };
  switch (type) {
    case "success":
      toast.success(message, toastOption);
      break;
    case "error":
      toast.error(message, toastOption);
      break;
    case "info":
      toast.info(message, toastOption);
      break;
    case "warning":
      toast.warning(message, toastOption);
      break;
    default:
      toast(message, toastOption);
  }
};

const CustomToast: React.FC = () => {
  return <ToastContainer />;
};

export default CustomToast;
