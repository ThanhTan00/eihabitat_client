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
    // <div className="flex items-center justify-between py-3">
    //   <div className="flex items-center">
    //     <div>
    //       <img
    //         className="w-9 h-9 rounded-full"
    //         src={comment?.ownerAvatar}
    //         alt=""
    //       />
    //     </div>

    //     <div className="ml-3 max-w-[75%] h-auto">
    //       <p>
    //         <span className="font-semibold">{comment?.ownerProfileName}</span>
    //         <span className="ml-2 h-auto">{comment?.content}</span>
    //       </p>
    //       <div className="flex items-center space-x-3 text-xs opacity-60 pt-2">
    //         <span>
    //           {comment?.creationDate ? formatDate(comment?.creationDate) : ""}
    //         </span>
    //         <span>53 likes</span>
    //         <span>reply</span>
    //       </div>
    //     </div>
    //   </div>

    // {isCommentLiked ? (
    //   <AiFillHeart
    //     onClick={handleLikecomment}
    //     className="text-xs hover:opacity-50 cursor-pointer text-red-500 min-w-8"
    //   />
    // ) : (
    //   <AiOutlineHeart
    //     onClick={handleLikecomment}
    //     className="text-xs hover:opacity-50 cursor-pointer min-w-8"
    //   />
    //  )}
    // </div>
    <div className="flex items-center">
      <div className="flex flex-shrink-0 self-start cursor-pointer">
        <img
          src={comment?.ownerAvatar}
          alt=""
          className="h-8 w-8 object-cover rounded-full"
        />
      </div>

      <div className="block">
        <div className="w-auto pl-3">
          <span className="font-medium mr-2">
            <a href="#" className="hover:opacity-[50%] text-sm">
              {comment?.ownerProfileName}
            </a>
          </span>
          <span className="md:text-sm"> {comment?.content}</span>
        </div>
        <div className="flex justify-start items-center text-xs w-full">
          <div className="font-semibold text-gray-500 px-2 flex items-center justify-center space-x-4">
            <a href="#" className="hover:underline">
              {comment?.creationDate ? formatDate(comment?.creationDate) : ""}
            </a>
            <a href="#" className="hover:underline">
              12 likes
            </a>
            <a href="#" className="hover:underline">
              Reply
            </a>
          </div>
        </div>
        <div className="flex font-semibold text-gray-500 px-2 flex items-center text-xs py-4">
          <hr className="w-8 mr-4" />
          <p className="cursor-pointer">View reply (7)</p>
        </div>
      </div>
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
    </div>
  );
};
