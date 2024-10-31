import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkFill, BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { Comment, Post } from "../../../../Model/Post";
import "./CommentModal.css";
import { CommentCard } from "./CommentCard";
import { useEffect, useState } from "react";
import { formatDistanceToNow, set } from "date-fns";
import Picker from "@emoji-mart/react";
import { Loading } from "../Loading/Loading";
import {
  addComment,
  getAllCommentOfPost,
  getSelectedPost,
  likePost,
} from "../../../../API/PostApi";
import "./CommentModal.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPost: string | null;
}

export const CommentModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedPost,
}) => {
  const [inputText, setInputText] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [likes, setLikes] = useState<number>(0);
  const [latestUserLike, setLatestUserLike] = useState<string | undefined>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const getPost = async () => {
      try {
        if (accessToken && selectedPost) {
          const postModal = await getSelectedPost(
            accessToken,
            selectedPost,
            user?.id
          );
          if (postModal.data) {
            setPost(postModal.data);
            //console.log(post)
            if (postModal.data.likeByUser) {
              setIsPostLiked(true);
            } else {
              setIsPostLiked(false);
            }
          }
          setLikes(postModal.data.numberOfLikes);
          setLatestUserLike(postModal.data.latestUserLike);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getComments = async () => {
      try {
        if (accessToken && selectedPost) {
          const commentsData = await getAllCommentOfPost(
            accessToken,
            selectedPost
          );
          //console.log(commentsData);
          const sortedComments = commentsData.data.sort(
            (a: Comment, b: Comment) =>
              new Date(b.creationDate).getTime() -
              new Date(a.creationDate).getTime()
          );
          if (commentsData.data) {
            setComment(sortedComments);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
    getComments();
    setCurrentIndex(0);
    setIsLoading(false);
  }, [selectedPost]);

  const handleEmojiSelect = (emoji: any) => {
    setInputText(inputText + emoji.native);
    //setShowEmojiPicker(false);
  };

  const handlePostLike = async () => {
    const accessToken = localStorage.getItem("accessToken");
    setIsPostLiked(!isPostLiked);
    setLikes(likes + 1);
    if (likes === 0) {
      setLatestUserLike(user?.profileName);
    }
    const likeResponse = await likePost(accessToken, {
      postId: post?.id,
      userId: user?.id,
    });
  };

  const handlePostDisLike = async () => {
    const accessToken = localStorage.getItem("accessToken");
    setIsPostLiked(!isPostLiked);
    setLikes(likes - 1);
    const likeResponse = await likePost(accessToken, {
      postId: post?.id,
      userId: user?.id,
    });
  };

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

  const status: Comment | any = {
    content: post?.caption,
    creationDate: post?.createdAt,
    ownerAvatar: post?.authorProfileAvatar,
    ownerProfileName: post?.authorProfileName,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const addCommentHandler = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (inputText && post && accessToken) {
      const newComment = await addComment(accessToken, {
        content: inputText,
        postId: post?.id,
      });
      setComment((prevComment) =>
        [...prevComment, newComment.data].sort(
          (a: Comment, b: Comment) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
        )
      );
      setInputText("");
    }
  };
  if (!isOpen) return null;

  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent className="min-w-[50vw] h-auto">
          <div className="flex">
            <div className="relative w-[55%] overflow-hidden flex bg-black">
              <div
                style={slideImage()}
                className="flex items-center transition-transform duration-500 ease-in-out"
              >
                {post?.postContentSet.map((image, index) => (
                  <img
                    key={index}
                    src={image.imageId}
                    alt={`Slide ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                ))}
                {/* <img
                    src={post?.postContentSet[currentIndex].imageId}
                    alt={`Slide ${index + 1}`}
                    className="h-full object-contain"
                  /> */}
              </div>
              <div className="absolute top-1/2 left-0 flex justify-between w-full transform -translate-y-1/2">
                <button
                  onClick={prevSlide}
                  className="ml-2 flex text-white items-center h-8 w-8 rounded-full justify-around hover:bg-gray-200 hover:text-black"
                >
                  &#10094; {/* Left arrow */}
                </button>
                <button
                  onClick={nextSlide}
                  className="mr-2 flex text-white items-center h-8 w-8 rounded-full justify-around p-2 hover:bg-gray-200 hover:text-black"
                >
                  &#10095; {/* Right arrow */}
                </button>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex">
                {post?.postContentSet.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full mx-1 ${
                      currentIndex === index ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
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
              <div className="comments px-5 py-4">
                <CommentCard comment={status} />
                {comment?.map((comment) => (
                  <CommentCard comment={comment} />
                ))}
              </div>
              <hr />
              <div className="h-auto mx-3">
                <div className="flex justify-between items-center w-full mt-5 py-1">
                  <div className="flex items-center space-x-4 ">
                    {isPostLiked ? (
                      <AiFillHeart
                        className="text-3xl hover:opacity-50 cursor-pointer text-red-500"
                        onClick={handlePostDisLike}
                      />
                    ) : (
                      <AiOutlineHeart
                        className="text-3xl hover:opacity-50 cursor-pointer"
                        onClick={handlePostLike}
                      />
                    )}
                    {/* <AiFillHeart className="text-3xl hover:opacity-50 cursor-pointer text-red-600" /> */}

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
                <p className="text-sm">
                  {likes === 0 ? (
                    <>
                      Be the first to{" "}
                      <span
                        className="font-semibold cursor-pointer"
                        onClick={handlePostLike}
                      >
                        like this
                      </span>
                    </>
                  ) : (
                    <>
                      Like by{" "}
                      <span className="font-semibold cursor-pointer">
                        {latestUserLike}
                      </span>
                      {likes === 1 ? (
                        ""
                      ) : (
                        <>
                          {" "}
                          and{" "}
                          <span className="font-semibold cursor-pointer">
                            {likes - 1} others
                          </span>
                        </>
                      )}
                    </>
                  )}
                </p>
                <p className="opacity-70 pb-5 text-xs">
                  {post ? formatDate(post.createdAt) : ""}
                </p>
              </div>
              <hr className="mt-2" />
              <div className="relative flex items-center mx-3 mt-1">
                <BsEmojiSmile
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="mr-3 text-2xl cursor-pointer"
                />
                {showEmojiPicker && (
                  <div className=" absolute bottom-[100%]">
                    <Picker onEmojiSelect={handleEmojiSelect} />
                  </div>
                )}
                <input
                  className="commentInput w-[65%] py-3"
                  placeholder="Add Comment..."
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button
                  onClick={addCommentHandler}
                  className="cursor-pointer opacity-80 text-blue-500 hover:font-bold"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};
