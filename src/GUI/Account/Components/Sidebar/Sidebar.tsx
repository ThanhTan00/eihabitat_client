import { useEffect, useState } from "react";
import { PostCreateModal } from "../Post/PostCreateModal";
import { SideBarMenu } from "./SideBarMenu";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { useNavigate } from "react-router-dom";
import { SideBarMenuIcon } from "./SideBarMenuIcon";
import { NotificationType } from "../../../../Model/WebSocket";
import connectNotificationSocket from "../../../../API/connectNotificationSocket";
import { toast } from "react-toastify";
import { ToastNotification } from "../../../../Toast/CustomToast";
import { getNotifications } from "../../../../API/Notification";

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<string>();
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [isSearchBarOPen, setIsSearchBarOpen] = useState<boolean>(false);
  const [isNotiBarOpen, setIsNotiBarOpen] = useState<boolean>(false);
  const [isMenuSpan, setIsMenuSpan] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { token, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleTabClick = (title: string) => {
    if (title === "Profile") {
      setIsMenuSpan(true);
      setIsSearchBarOpen(false);
      setIsNotiBarOpen(false);
      navigate("/" + user?.profileName);
      setActiveTab(title);
    } else if (title === "Home") {
      setIsMenuSpan(true);
      setIsSearchBarOpen(false);
      setIsNotiBarOpen(false);
      navigate("/");
      setActiveTab(title);
    } else if (title === "Create") {
      setIsPostModalOpen(true);
    } else if (title === "Message") {
      setIsMenuSpan(false);
      setIsSearchBarOpen(false);
      setIsNotiBarOpen(false);
      navigate("/chat/0");
      setActiveTab(title);
    } else if (title === "Search") {
      setIsSearchBarOpen(!isSearchBarOPen);
      setIsNotiBarOpen(false);
    } else if (title === "Notification") {
      setIsNotiBarOpen(!isNotiBarOpen);
      setIsSearchBarOpen(false);
    }
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };
  const getNotificationHis = async () => {
    try {
      if (token && user) {
        const result = await getNotifications(token, user?.profileName);
        console.log(result.data);
        if (result.code === 1000) {
          setNotifications(result.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotificationHis();
  }, [user]);

  useEffect(() => {
    const client = connectNotificationSocket(
      user?.profileName,
      (notification: NotificationType) => {
        setNotifications((prev) => [notification, ...prev]);

        toast(<ToastNotification notification={notification} />, {
          autoClose: 5000,
          position: "bottom-right",
        });
      }
    );
  }, [user]);

  return (
    <div className="sticky top-0 left-0 h-[100vh]">
      {isSearchBarOPen || isNotiBarOpen || !isMenuSpan ? (
        <SideBarMenuIcon
          activeTab={activeTab}
          isSearchBarOpen={isSearchBarOPen}
          isNotiBarOpen={isNotiBarOpen}
          notifications={notifications}
          handleTabClick={handleTabClick}
        />
      ) : (
        <SideBarMenu activeTab={activeTab} handleTabClick={handleTabClick} />
      )}
      <PostCreateModal isOpen={isPostModalOpen} onClose={closePostModal} />
    </div>
  );
};
