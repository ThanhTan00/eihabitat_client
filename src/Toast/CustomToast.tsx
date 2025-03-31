import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotificationType } from "../Model/WebSocket";

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

interface NofificationProps {
  notification: NotificationType;
}

export const notiType = [
  {
    title: "LIKE_POST",
    message: "liked your post.",
  },
  {
    title: "LIKE_COMMENT",
    message: "liked your comment.",
  },
  {
    title: "FOLLOW",
    message: "followed you.",
  },
  {
    title: "COMMENT",
    message: "added a comment in your post.",
  },
  {
    title: "REPLY_COMMENT",
    message: "replied your comment.",
  },
];
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

export const ToastNotification = ({ notification }: NofificationProps) => (
  <div>
    <p className="font-semibold text-[#A78558]">New notification !</p>
    <div className="flex items-center">
      <div className="">
        <img
          className="w-12 h-12 rounded-full"
          src={notification.userProfileAvatar}
          alt="efwf"
        />
      </div>
      <div className="ml-3">
        <p className="max-w-[150px] truncate font-semibold text-md truncated">
          {notification.userProfileName}
        </p>
        {notiType.map((type) => (
          <p className="font-thin text-sm">
            {type.title === notification.type && type.message}
          </p>
        ))}
      </div>
    </div>
  </div>
);

const CustomToast: React.FC = () => {
  return <ToastContainer />;
};

export default CustomToast;
