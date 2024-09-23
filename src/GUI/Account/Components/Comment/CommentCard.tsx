import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Comment } from "../../../../Model/Post";
import { formatDistanceToNow } from "date-fns";

interface CommentCardProps {
  comment: Comment;
}
export const CommentCard = ({ comment }: CommentCardProps) => {
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const handleLikecomment = () => {
    setIsCommentLiked(!isCommentLiked);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };
  return (
    <div>
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center">
          <div>
            <img
              className="w-9 h-9 rounded-full"
              src={comment.ownerAvatar}
              alt=""
            />
          </div>

          <div className="ml-3">
            <p>
              <span className="font-semibold">{comment.ownerProfileName}</span>
              <span className="ml-2">{comment.content}</span>
            </p>
            <div className="flex items-center space-x-3 text-xs opacity-60 pt-2">
              <span>{formatDate(comment.creationDate)}</span>
              <span>53 likes</span>
              <span>reply</span>
            </div>
          </div>
        </div>

        {isCommentLiked ? (
          <AiFillHeart
            onClick={handleLikecomment}
            className="text-xs hover:opacity-50 cursor-pointer text-red-500"
          />
        ) : (
          <AiOutlineHeart
            onClick={handleLikecomment}
            className="text-xs hover:opacity-50 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};
