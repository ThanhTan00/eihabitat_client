import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { Comment } from "../../../../Model/Comment";
import { getAllCommentOfPost, likeComment } from "../../../../API/CommentApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { showToastMessage } from "../../../../Toast/CustomToast";
import { ReplyComment } from "./ReplyComment";

interface CommentCardProps {
  comment: Comment;
  postId: string | null;
  handleReply: (replyToId: string, replyToName: string) => void;
}
export const CommentCard = ({
  comment,
  postId,
  handleReply,
}: CommentCardProps) => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [numberOfLike, setNumberOfLike] = useState<number>(0);
  const [viewReplies, setViewReplies] = useState<boolean>(false);
  const [replyComment, setReplyComment] = useState<Comment[]>([]);
  const handleLikecomment = async () => {
    const result = await likeComment(token, {
      commentId: comment.id,
      userId: user?.id,
    });
    console.log(result);
    if (result.code === 1000) {
      showToastMessage(result.data, "info");
    }
    if (isCommentLiked) {
      setNumberOfLike(numberOfLike - 1);
    } else {
      setNumberOfLike(numberOfLike + 1);
    }
    setIsCommentLiked(!isCommentLiked);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleViewReplies = () => {
    getComments();
    setViewReplies(!viewReplies);
  };

  const getComments = async () => {
    try {
      if (token && comment) {
        const commentsData = await getAllCommentOfPost(token, {
          postId: postId,
          rootUserID: user?.id,
          replyTo: comment.id,
        });
        console.log(commentsData);
        const sortedComments = commentsData.data.sort(
          (a: Comment, b: Comment) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
        );
        if (commentsData.data) {
          setReplyComment(sortedComments);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (comment.likedByMe) {
      setIsCommentLiked(true);
    } else {
      setIsCommentLiked(false);
    }
    setNumberOfLike(comment.numberOfLike);
  }, [comment]);

  return (
    <>
      <div className="flex w-full">
        <div className="w-10 mr-2">
          <img
            src={comment?.ownerAvatar}
            alt=""
            className="h-8 w-8 object-cover rounded-full"
          />
        </div>
        <div className="w-full">
          <div className="flex w-full min-h-8 mb-3">
            <div className="w-[90%]">
              <div className="w-full mb-3">
                <span className="font-medium">
                  <Link
                    to={comment.ownerUrl}
                    className="hover:opacity-70 duration-100 text-sm"
                  >
                    {comment?.ownerProfileName}
                  </Link>
                </span>
                <span className="md:text-sm"> {comment?.content}</span>
              </div>
              <div className="font-semibold text-xs text-gray-500 space-x-4">
                <span className="hover:underline cursor-pointer">
                  {comment?.creationDate
                    ? formatDate(comment?.creationDate)
                    : ""}
                </span>
                <span className="hover:underline cursor-pointer">
                  {numberOfLike} likes
                </span>
                <span
                  className="hover:underline cursor-pointer"
                  onClick={() =>
                    handleReply(comment.id, comment.ownerProfileName)
                  }
                >
                  Reply
                </span>
              </div>
            </div>
            <div className="w-[10%] mt-2">
              <div className="flex justify-end">
                {isCommentLiked ? (
                  <AiFillHeart
                    onClick={handleLikecomment}
                    className="text-xs hover:opacity-50 cursor-pointer text-red-500 w-12 mr-0"
                  />
                ) : (
                  <AiOutlineHeart
                    onClick={handleLikecomment}
                    className="text-xs hover:opacity-50 cursor-pointer w-12 mr-0"
                  />
                )}
              </div>
            </div>
          </div>
          {viewReplies ? (
            <>
              <div className="flex items-center text-sm text-gray-500">
                <hr className="w-10 mr-4" />
                <p
                  className="hover:underline cursor-pointer"
                  onClick={handleViewReplies}
                >
                  Hide replies
                </p>
              </div>
              {replyComment?.map((replyComment) => (
                <ReplyComment replyComment={replyComment} />
              ))}
            </>
          ) : (
            <div className="flex items-center text-sm text-gray-500">
              <hr className="w-10 mr-4" />
              <p
                className="hover:underline cursor-pointer"
                onClick={handleViewReplies}
              >
                View replies
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
