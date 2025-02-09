import { useEffect, useState } from "react";
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
import { Post } from "../../../../Model/Post";
import { formatDistanceToNow } from "date-fns";
import { likePost } from "../../../../API/PostApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { showToastMessage } from "../../../../Toast/CustomToast";
import { addComment } from "../../../../API/CommentApi";

interface PostCardProps {
  post: Post;
  openCommentModal: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  openCommentModal,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputText, setInputText] = useState<string>("");
  const [numberOfLikes, setNumberOfLikes] = useState<number>(
    post.numberOfLikes
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const { user, token } = useSelector((state: RootState) => state.auth);
  // const user = localStorage.getItem("user");
  const totalImages = post?.postContentSet.length;
  const nextSlide = () => {
    if (totalImages)
      setCurrentIndex((prevIndex) =>
        prevIndex === totalImages - 1 ? 0 : prevIndex + 1
      );
  };

  const prevSlide = () => {
    if (totalImages)
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? totalImages - 1 : prevIndex - 1
      );
  };

  const slideImage = () => {
    return {
      transform: `translateX(-${currentIndex * 100}%)`,
    };
  };
  const toggleCaption = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handlePostLike = async () => {
    setIsPostLiked(!isPostLiked);
    post.numberOfLikes += 1;
    setNumberOfLikes(numberOfLikes + 1);
    const likeResponse = await likePost(token, {
      postId: post.id,
      userId: user?.id,
    });
    //console.log(likeResponse.data)
  };
  const handlePostDislike = async () => {
    setIsPostLiked(!isPostLiked);
    post.numberOfLikes -= 1;
    setNumberOfLikes(numberOfLikes - 1);
    const likeResponse = await likePost(token, {
      postId: post.id,
      userId: user?.id,
    });
    //console.log(likeResponse.data)
  };
  const handleSavePost = () => {
    setIsSaved(!isSaved);
  };
  const handleEmojiSelect = (emoji: any) => {
    setInputText(inputText + emoji.native);
    //setShowEmojiPicker(false);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const addCommentHandler = async () => {
    if (inputText && token) {
      const newComment = await addComment(token, user?.id, {
        content: inputText,
        postId: post?.id,
      });
      if (newComment.code === 1000) {
        showToastMessage("New comment added", "info");
      }
      setInputText("");
    }
  };

  const handleAddCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the default page reload
    addCommentHandler(); // Calls your handler function
  };

  useEffect(() => {
    const setInit = () => {
      if (post.likeByUser) {
        setIsPostLiked(true);
      }
    };
    setInit();
  }, [post]);

  return (
    <div>
      <div className="w-full">
        <div className="flex justify-between items-center w-full py-2">
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500">
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={post.authorProfileAvatar}
                    alt="Story"
                  />
                </div>
              </div>
            </div>
            <div className="pl-4">
              <div className="flex justify-between items-end">
                <Link
                  to={"/" + post.authorProfileName}
                  className="font-semibold text-base hover:opacity-70 duration-200"
                >
                  {post.authorProfileName}
                </Link>
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
                <p className="text-sm text-gray-500 font-light">
                  {formatDate(post.createdAt)}
                </p>
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
        <div className="relative overflow-hidden bg-black rounded-lg w-full">
          <div
            style={slideImage()}
            className="flex transition-transform duration-500 ease-in-out"
          >
            {post?.postContentSet.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full max-h-[500px] flex justify-center items-center bg-black"
              >
                <img
                  className="h-full w-auto object-contain"
                  src={image.imageId}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>
          {totalImages > 1 && (
            <div className="absolute h-full top-1/2 left-0 flex justify-between items-center w-full transform -translate-y-1/2">
              <button
                onClick={prevSlide}
                className="h-full w-[10%] flex text-white items-center h-8 w-8 justify-around bg-gray-200 opacity-50 bg-opacity-0 hover:bg-opacity-30 hover:opacity-100 duration-200"
              >
                &#10094; {/* Left arrow */}
              </button>
              <button
                onClick={nextSlide}
                className="h-full w-[10%] flex text-white items-center h-8 w-8 justify-around bg-gray-200 opacity-50 bg-opacity-0 hover:bg-opacity-30 hover:opacity-100 duration-200"
              >
                &#10095; {/* Right arrow */}
              </button>
            </div>
          )}
          {totalImages > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex">
              {post?.postContentSet.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-1.5 h-1.5 rounded-full mx-0.5 ${
                    currentIndex === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center w-full py-2">
          <div className="flex items-center space-x-4">
            {isPostLiked ? (
              <AiFillHeart
                className="text-3xl hover:opacity-50 cursor-pointer text-red-500"
                onClick={handlePostDislike}
              />
            ) : (
              <AiOutlineHeart
                className="text-3xl hover:opacity-50 cursor-pointer"
                onClick={handlePostLike}
              />
            )}

            <FaRegComment
              onClick={() => openCommentModal(post.id)}
              className="text-2xl hover:opacity-50 cursor-pointer"
            />

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
          <p className="font-bold text-sm">{numberOfLikes} likes</p>
          <p className={`text-sm ${isExpanded ? "" : "line-clamp-1"} max-w-xl`}>
            <Link
              to={post.authorUrl}
              className="font-semibold text-base mr-2 leading-none hover:opacity-70 duration-200"
            >
              {post.authorProfileName}
            </Link>
            <span>{post.caption}</span>
          </p>
          <button
            onClick={toggleCaption}
            className="text-gray-500 text-sm mt-2 focus:outline-none hover:underline"
          >
            {isExpanded ? "view less" : "view more"}
          </button>
          <p
            onClick={() => openCommentModal(post.id)}
            className="opacity-50 cursor-pointer"
          >
            view all {post.numberOfComments} comments
          </p>
        </div>

        <div className="w-full mb-3">
          <form
            onSubmit={handleAddCommentSubmit}
            className="relative flex w-full items-center"
          >
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
