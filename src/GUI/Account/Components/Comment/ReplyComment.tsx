import { Link } from "react-router-dom";
import { Comment } from "../../../../Model/Comment";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../../../Store/store";
import { formatDistanceToNow } from "date-fns";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { likeComment } from "../../../../API/CommentApi";
import { showToastMessage } from "../../../../Toast/CustomToast";

interface ReplyCommentProps {
  replyComment: Comment;
}

export const ReplyComment = ({ replyComment }: ReplyCommentProps) => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [numberOfLike, setNumberOfLike] = useState<number>(0);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleLikecomment = async () => {
    const result = await likeComment(token, {
      commentId: replyComment.id,
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
  return (
    <div className="flex min-h-8 mt-3">
      <div className="w-1/6">
        <img
          src={replyComment?.ownerAvatar}
          alt=""
          className="h-8 w-8 object-cover rounded-full"
        />
      </div>
      <div className="flex w-full">
        <div className="w-[90%]">
          <div className="w-full mb-3">
            <span className="font-medium">
              <Link
                to={replyComment.ownerUrl}
                className="hover:opacity-70 duration-100 text-sm"
              >
                {replyComment?.ownerProfileName}
              </Link>
            </span>
            <span className="md:text-sm">
              {" "}
              {replyComment?.content} nang am xa dan roi nang am xa dan roi,
              nang am xa dan bo roi de lai nhung giac mo
            </span>
          </div>
          <div className="font-semibold text-xs text-gray-500 space-x-4">
            <span className="hover:underline cursor-pointer">
              {replyComment?.creationDate
                ? formatDate(replyComment?.creationDate)
                : ""}
            </span>
            <span className="hover:underline cursor-pointer">
              {numberOfLike} likes
            </span>
            <span className="hover:underline cursor-pointer">Reply</span>
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
    </div>
  );
};
