import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import "../Post/PostCard.css";

export const PostCard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handlePostLike = () => {
    setIsPostLiked(!isPostLiked);
  };
  const handleSavePost = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div>
      <div className="border rounded-md w-full">
        <div className="flex justify-between items-center w-full py-4 px-5">
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-full"
              src="https://cdn.pixabay.com/photo/2022/01/07/01/21/girl-6920625_640.jpg"
              alt=""
            />
            <div className="pl-2">
              <p className="font-semibold text-sm">username</p>
              <p className="font-thin text-sm">location</p>
            </div>
          </div>

          <div className="dropdown">
            <BsThreeDots className="dots" onClick={handleClick} />
            <div className="dropdown-content">
              {showDropdown && (
                <p className="bg-black text-white py-1 px-4 rounded-md cursor-pointer">
                  Delete
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          <img
            className="w-full"
            src="https://cdn.pixabay.com/photo/2020/09/21/13/38/woman-5590119_640.jpg"
            alt=""
          />
        </div>

        <div className="flex justify-between items-center w-full px-5 py-4">
          <div className="flex items-center space-x-2">
            {isPostLiked ? (
              <AiFillHeart
                className="text-2xl hover:opacity-50 cursor-pointer text-red-500"
                onClick={handlePostLike}
              />
            ) : (
              <AiOutlineHeart
                className="text-2xl hover:opacity-50 cursor-pointer"
                onClick={handlePostLike}
              />
            )}

            <FaRegComment className="text-xl hover:opacity-50 cursor-pointer" />

            <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
          </div>

          <div className="cursor-pointer">
            {isSaved ? (
              <BsBookmarkFill
                onClick={handleSavePost}
                className="text-xl hover:opacity-50 cursor-pointer"
              />
            ) : (
              <BsBookmark
                onClick={handleSavePost}
                className="text-xl hover:opacity-50 cursor-pointer"
              />
            )}
          </div>
        </div>

        <div className="w-full py-2 px-5">
          <p>100 likes</p>
          <p className="opacity-50 py-2 cursor-pointer">view all 10 comments</p>
        </div>

        <div className=" border-t w-full">
          <div className="flex w-full items-center px-5">
            <BsEmojiSmile className="text-xl" />
            <input
              className="commentInput"
              type="text"
              placeholder="Add a comment..."
            />
            <p className="cursor-pointer opacity-80 text-blue-500">Post</p>
          </div>
        </div>
      </div>

      {/* <CommentModal false true isPostLiked isSaved handlePostLike handleSavePost /> */}
    </div>
  );
};
