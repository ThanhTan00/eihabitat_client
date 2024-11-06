import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Comment } from "../../../../Model/Post";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface CommentCardProps {
  comment: Comment;
  type: string | null;
}
export const CommentCard = ({ comment, type }: CommentCardProps) => {
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const handleLikecomment = () => {
    setIsCommentLiked(!isCommentLiked);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };
  return (
    <div className="flex items-center">
      <div className="flex flex-shrink-0 self-start cursor-pointer">
        <img
          src={comment?.ownerAvatar}
          alt=""
          className="h-8 w-8 object-cover rounded-full"
        />
      </div>

      <div className="block">
        <div className={type === "status" ? "w-full pl-3 mb-2" : "w-auto pl-3"}>
          <span className="font-medium mr-2">
            <Link
              to={comment.ownerUrl}
              className="hover:opacity-70 duration-100 text-sm"
            >
              {comment?.ownerProfileName}
            </Link>
          </span>
          <span className="md:text-sm"> {comment?.content}</span>
        </div>
        {type !== "status" ? (
          <>
            <div className="flex justify-start items-center text-xs w-full">
              <div className="font-semibold text-gray-500 px-2 flex items-center justify-center space-x-4">
                <p className="hover:underline cursor-pointer">
                  {comment?.creationDate
                    ? formatDate(comment?.creationDate)
                    : ""}
                </p>
                <p className="hover:underline cursor-pointer">12 likes</p>
                <p className="hover:underline cursor-pointer">Reply</p>
              </div>
            </div>
            <div className="flex font-semibold text-gray-500 px-2 flex items-center text-xs py-2">
              <hr className="w-8 mr-4" />
              <p className="cursor-pointer">View reply (7)</p>
            </div>
          </>
        ) : (
          " "
        )}
      </div>
      {type !== "status" && (
        <div className="flex self-start justify-between max-w-8 pt-4 ml-auto">
          {isCommentLiked ? (
            <AiFillHeart
              onClick={handleLikecomment}
              className="text-xs hover:opacity-50 cursor-pointer text-red-500 w-8"
            />
          ) : (
            <AiOutlineHeart
              onClick={handleLikecomment}
              className="text-xs hover:opacity-50 cursor-pointer w-12"
            />
          )}
        </div>
      )}
    </div>
  );
};
