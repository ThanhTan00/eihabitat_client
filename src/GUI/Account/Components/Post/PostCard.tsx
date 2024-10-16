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
import "./PostCard.css";
import Picker from "@emoji-mart/react";

export const PostCard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const toggleCaption = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handlePostLike = () => {
    setIsPostLiked(!isPostLiked);
  };
  const handleSavePost = () => {
    setIsSaved(!isSaved);
  };
  const handleEmojiSelect = (emoji: any) => {
    setInputText(inputText + emoji.native);
    //setShowEmojiPicker(false);
  };

  return (
    <div>
      <div className="w-full">
        <div className="flex justify-between items-center w-full py-2">
          <div className="flex items-center">
            {/* <img
              className="h-12 w-12 rounded-full"
              src="https://cdn.pixabay.com/photo/2022/01/07/01/21/girl-6920625_640.jpg"
              alt=""
            /> */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500">
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src="https://cdn.pixabay.com/photo/2022/01/07/01/21/girl-6920625_640.jpg"
                    alt="Story"
                  />
                </div>
              </div>
            </div>
            <div className="pl-4">
              <div className="flex justify-between items-end">
                <p className="font-semibold text-base">username</p>
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ece4e4"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <circle cx="12" cy="12" r="2" fill="#c7c2c2"></circle>{" "}
                  </g>
                </svg>
                <p className="text-sm text-gray-500 font-light">9h</p>
              </div>
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
            className="w-full rounded-md"
            src="https://cdn.pixabay.com/photo/2023/06/14/23/12/sunset-8064078_1280.jpg"
            alt=""
          />
        </div>

        <div className="flex justify-between items-center w-full py-2">
          <div className="flex items-center space-x-4">
            {isPostLiked ? (
              <AiFillHeart
                className="text-3xl hover:opacity-50 cursor-pointer text-red-500"
                onClick={handlePostLike}
              />
            ) : (
              <AiOutlineHeart
                className="text-3xl hover:opacity-50 cursor-pointer"
                onClick={handlePostLike}
              />
            )}

            <FaRegComment className="text-2xl hover:opacity-50 cursor-pointer" />

            <RiSendPlaneLine className="text-2xl hover:opacity-50 cursor-pointer" />
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

        <div className="w-full space-y-2 mb-2">
          <p className="font-bold text-sm">100 likes</p>
          <p
            className={`text-sm ${
              isExpanded ? "" : "line-clamp-1"
            } leading-none max-w-xl`}
          >
            <span className="font-semibold text-base mr-2 leading-none">
              Username
            </span>
            <span>
              This is the caption: There was a boy who has a dog and bingo was
              his name, there was a boy who has a dog and bingo was his name, B
              I N G O, B I N G O, B I N G O and Bingo was his name
            </span>
          </p>
          <button
            onClick={toggleCaption}
            className="text-gray-500 text-sm mt-2 focus:outline-none hover:underline"
          >
            {isExpanded ? "view less" : "view more"}
          </button>
          <p className="opacity-50 cursor-pointer">view all 10 comments</p>
        </div>

        <div className="w-full mb-3">
          <form className="relative flex w-full items-center">
            <input
              className="commentInput text-sm"
              type="text"
              placeholder="Add a comment..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <BsEmojiSmile
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-lg mr-2 cursor-pointer"
            />
            {showEmojiPicker && (
              <div className="absolute bottom-[100%] left-[100%] w-44">
                <Picker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </form>
        </div>
        <hr />
      </div>

      {/* <CommentModal false true isPostLiked isSaved handlePostLike handleSavePost /> */}
    </div>
  );
};
