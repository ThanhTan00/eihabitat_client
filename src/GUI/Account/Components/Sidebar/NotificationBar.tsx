import { formatDistanceToNow } from "date-fns";
import { NotificationType } from "../../../../Model/WebSocket";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CommentModal } from "../Comment/CommentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

interface NofificationProps {
  notifications: NotificationType[];
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

export const NotificationBar = ({ notifications }: NofificationProps) => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const openModal = (postId: string) => {
    if (postId === "") {
      return;
    }
    setSelectedPost(postId);
    setIsCommentModalOpen(true);
  };

  const closeModal = () => {
    setIsCommentModalOpen(false);
    setSelectedPost(null);
  };
  return (
    <div className="flex flex-col pt-6 h-full border-l border-gray-200">
      <div className="border-b border-gray-200">
        <div className="px-7 pb-5">
          <p className="font-bold text-2xl mb-3">Notifications</p>
          <p className="font-semibold text-md">Latest this month</p>
        </div>
        <div className="h-[40vh] overflow-y-auto">
          {notifications.map((noti) => (
            <div
              className={` ${
                !noti.seen ? "bg-[#ECE5DB]" : "bg-white"
              } flex justify-between items-center w-full hover:bg-[#DED1BF] px-5 py-2 cursor-pointer`}
            >
              <div className="flex">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={noti.userProfileAvatar}
                      alt="Story"
                    />
                  </div>
                </div>
                <div className="">
                  <p className="text-base duration-200 ml-4">
                    <Link
                      to={noti.userUrl}
                      className="font-semibold hover:opacity-70"
                    >
                      {noti.userProfileName} {"  "}
                    </Link>
                    <span className="font-thin text-sm opacity-80 ">
                      {notiType.map((type) => (
                        <p className="font-thin text-sm">
                          {type.title === noti.type && type.message}
                        </p>
                      ))}
                    </span>
                  </p>
                  <p className="pl-4 font-thin text-xs text-gray-400">
                    {formatDate(noti.createdAt)}
                  </p>
                </div>
              </div>
              {noti.postImage ? (
                <div
                  onClick={() => openModal(noti.postId)}
                  className="w-12 h-12 rounded-lg"
                >
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={noti.postImage}
                    alt="Story"
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="py-5">
        <p className="px-7 pb-5 font-semibold text-md">Last month</p>
        <div className="flex justify-between items-center w-full ">
          <div className="w-full p-10">
            <div className="flex justify-center items-center w-full py-4">
              <p className="text-gray-500">
                <FontAwesomeIcon icon={faImages} className="mr-2 text-2xl" />
              </p>
            </div>
            <div className="flex justify-center items-center w-full">
              <p className="text-gray-500 font-bold text-md">
                NO NOTIFICATIONS FOUND
              </p>
            </div>
          </div>
        </div>
      </div>
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={closeModal}
        selectedPost={selectedPost}
      />
    </div>
  );
};
