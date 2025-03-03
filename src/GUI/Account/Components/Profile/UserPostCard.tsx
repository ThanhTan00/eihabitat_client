import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import "./UserPostCard.css";
import { Post, PostOnPersonalWall } from "../../../../Model/Post";

type Props = {
  post: PostOnPersonalWall;
  onClick: () => void;
};

export const UserPostCard = ({ post, onClick }: Props) => {
  return (
    <div
      className="h-80 rounded-md shadow-lg bg-pink-300 relative"
      key={post.id}
    >
      <img
        className="object-cover h-full w-full"
        src={post.representImage}
        alt=""
      />
      <div
        onClick={() => onClick()}
        className="absolute top-0 w-full h-full bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition ease-in-out duration-300 cursor-pointer"
      >
        <div className="absolute w-full flex justify-around top-[50%] text-white font-semibold">
          <div>
            <AiFillHeart className="text-2xl" />
            <span>{post.numberOfLikes}</span>
          </div>
          <div>
            <FaComment className="text-xl" />{" "}
            <span>{post.numberOfComments}</span>
          </div>
        </div>
      </div>
    </div>
    // <div className="p-1" key={post.id}>
    //   <div className="post">
    //     <img
    //       className="object-none w-full h-80"
    //       src={post.representImage}
    //       alt=""
    //     />
    //     <div onClick={() => onClick()} className="overlay cursor-pointer">
    //       <div className="overlay-text flex justify-between ">
    //         <div>
    //           <AiFillHeart className="text-2xl" />{" "}
    //           <span>{post.numberOfLikes}</span>
    //         </div>
    //         <div>
    //           <FaComment className="text-xl" />{" "}
    //           <span>{post.numberOfComments}</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
