import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import "./UserPostCard.css";
import { Post } from "../../../../Model/Post";

type Props = {
  post: Post;
};

export const UserPostCard = ({ post }: Props) => {
  console.log(post);
  return (
    <div className="p-1">
      <div className="post w-60 h-60">
        <img
          className="cursor-pointer"
          src={post.postContentSet[0].imageId}
          alt=""
        />
        <div className="overlay">
          <div className="overlay-text flex justify-between">
            <div>
              <AiFillHeart /> <span>10</span>
            </div>
            <div>
              <FaComment /> <span>30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
