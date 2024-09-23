import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import "./UserPostCard.css";
import { Post } from "../../../../Model/Post";

type Props = {
  post: Post;
  onClick: () => void;
};

export const UserPostCard = ({ post, onClick }: Props) => {
  return (
    <div className="p-1" key={post.id}>
      <div className="post">
        <img
          className="object-none w-full h-80"
          src={post.postContentSet[0].imageId}
          alt=""
        />
        <div onClick={() => onClick()} className="overlay cursor-pointer">
          <div className="overlay-text flex justify-between ">
            <div>
              <AiFillHeart className="text-2xl" />{" "}
              <span>{post.numberOfLikes}</span>
            </div>
            <div>
              <FaComment className="text-xl" /> <span>30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
