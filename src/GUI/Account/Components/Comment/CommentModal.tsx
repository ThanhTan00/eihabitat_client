import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkFill, BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { Post } from "../../../../Model/Post";
import "./CommentModal.css";
import { CommentCard } from "./CommentCard";
import { useEffect, useState } from "react";
import { formatDistanceToNow, set } from "date-fns";
import Picker from "@emoji-mart/react";
import { getSelectedPost, likePost } from "../../../../API/PostApi";
import "./CommentModal.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { Link } from "react-router-dom";
import { Comment } from "../../../../Model/Comment";
import { addComment, getAllCommentOfPost } from "../../../../API/CommentApi";

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
  const [replyTo, setReplyTo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [likes, setLikes] = useState<number>(0);
  const [latestUserLike, setLatestUserLike] = useState<string | undefined>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { user, token } = useSelector((state: RootState) => state.auth);

  const getComments = async (
    postID: string | null,
    rootUserID: string | undefined,
    replyToId: string
  ) => {
    try {
      if (token && selectedPost) {
        const commentsData = await getAllCommentOfPost(token, {
          postId: postID,
          rootUserID: rootUserID,
          replyTo: replyToId,
        });
        console.log(commentsData);
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

  useEffect(() => {
    const getPost = async () => {
      try {
        if (token && selectedPost) {
          const postModal = await getSelectedPost(
            token,
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
    getPost();
    getComments(selectedPost, user?.id, "");
    setCurrentIndex(0);
    setIsLoading(false);
  }, [selectedPost]);

  const handleEmojiSelect = (emoji: any) => {
    setInputText(inputText + emoji.native);
    //setShowEmojiPicker(false);
  };

  const handleReply = (replyToId: string, replyToName: string) => {
    setReplyTo(replyToId);
    setInputText(inputText + "@" + replyToName);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const addCommentHandler = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (inputText && post && accessToken) {
      const newComment = await addComment(accessToken, user?.id, {
        content: inputText,
        postId: post?.id,
        replyTo: replyTo,
      });
      if (replyTo === "") {
        setComment((prevComment) =>
          [...prevComment, newComment.data].sort(
            (a: Comment, b: Comment) =>
              new Date(b.creationDate).getTime() -
              new Date(a.creationDate).getTime()
          )
        );
      }
      setReplyTo("");
      setInputText("");
    }
  };
  if (!isOpen) return null;

  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent className="min-w-[60vw] h-auto">
          <div className="flex w-full bg-none">
            <div className="w-[60%]">
              <div className="relative overflow-hidden bg-black rounded-tl-md rounded-bl-md w-full min-h-full max-h-[90vh]">
                <div
                  style={slideImage()}
                  className="flex transition-transform duration-500 ease-in-out"
                >
                  {post?.postContentSet.map((image, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-full h-[90vh] flex justify-center items-center bg-black"
                    >
                      <img
                        className="h-full w-auto object-contain"
                        src={image.imageId}
                        alt={`Slide ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>

                {totalImages !== undefined && totalImages > 1 && (
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
                {totalImages !== undefined && totalImages > 1 && (
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
            </div>
            <div className="w-[40%]">
              <div className="reqUser flex justify-between items-center py-3 px-5">
                <div className="flex items-center">
                  <div className="">
                    <img
                      className="w-9 h-9 rounded-full"
                      src={post?.authorProfileAvatar}
                      alt=""
                    />
                  </div>
                  <div className="ml-3 font-semibold hover:opacity-70 duration-200">
                    <Link to={"/" + post?.authorProfileName}>
                      {post?.authorProfileName}
                    </Link>
                  </div>
                </div>
                <BsThreeDots />
              </div>
              <hr />
              <div className="comments px-5 space-y-4 py-4">
                <div className="flex w-[90%] pb-4">
                  <div className="w-10 mr-2">
                    <img
                      className="w-9 h-9 rounded-full"
                      src={post?.authorProfileAvatar}
                      alt=""
                    />
                  </div>
                  <div className="w-full">
                    <span className="font-semibold hover:opacity-70 duration-200 pr-3">
                      <Link to={"/" + post?.authorProfileName}>
                        {post?.authorProfileName}
                      </Link>
                    </span>
                    <span className="md:text-sm">{post?.caption}</span>
                  </div>
                </div>
                {comment?.map((comment) => (
                  <CommentCard
                    comment={comment}
                    postId={selectedPost}
                    handleReply={handleReply}
                  />
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
