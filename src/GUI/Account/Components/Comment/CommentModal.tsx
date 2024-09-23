import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { BsBookmarkFill, BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { Post } from "../../../../Model/Post";
import "./CommentModal.css";
import { CommentCard } from "./CommentCard";
import { useEffect, useState } from "react";
import { getSelectedPost } from "../../../../API/PostApi";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
}

export const CommentModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  post,
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };
  console.log(post);
  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent className="min-w-[55vw] h-auto">
          <div className="p-0">
            <div className="flex">
              <div className="max-w-[60%] h-[90vh] flex flex-col justify-center bg-black">
                <img
                  className="object-contain h-full w-auto max-h-screen"
                  src={post?.postContentSet[0].imageId}
                />
              </div>
              <div className="w-[50%] relative">
                <div className="reqUser flex justify-between items-center py-3 px-5">
                  <div className="flex items-center">
                    <div className="">
                      <img
                        className="w-9 h-9 rounded-full"
                        src={post?.authorProfileAvatar}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p>{post?.authorProfileName}</p>
                    </div>
                  </div>
                  <BsThreeDots />
                </div>
                <hr />

                <div className="comments px-5">
                  {post?.commentSet.map((comment) => (
                    <CommentCard comment={comment} />
                  ))}
                </div>
                <hr />

                <div className=" absolute bottom-5 h-auto w-[95%] mx-5">
                  <div className="flex justify-between items-center w-full mt-5 py-1">
                    <div className="flex items-center space-x-4 ">
                      <AiFillHeart className="text-3xl hover:opacity-50 cursor-pointer text-red-600" />

                      {/* <AiOutlineHeart
                          onClick={handleLikePost}
                          className="text-2xl hover:opacity-50 cursor-pointer "
                        /> */}

                      <FaRegComment className="text-2xl hover:opacity-50 cursor-pointer" />
                      <RiSendPlaneLine className="text-2xl hover:opacity-50 cursor-pointer" />
                    </div>
                    <div className="cursor-pointer">
                      <BsBookmarkFill className="text-2xl" />
                      {/* <BsBookmark
                          className="text-xl hover:opacity-50 cursor-pointer"
                        /> */}
                    </div>
                  </div>
                  <p className="text-sm font-semibold">
                    liked by {post?.latestUserLike} and{" "}
                    {post?.numberOfLikes ? post.numberOfLikes - 1 : ""} others
                  </p>
                  <p className="opacity-70 pb-5 text-xs">
                    {post ? formatDate(post.createdAt) : ""}
                  </p>
                  <hr className="p-0" />
                  <div className=" flex items-center ">
                    <BsEmojiSmile className="mr-2 text-2xl" />
                    <input
                      className="commentInput w-[70%] py-3"
                      placeholder="Add Comment..."
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};
