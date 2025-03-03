import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../Store/store";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostOnPersonalWall } from "../../../Model/Post";
import { getAllSavedPosts } from "../../../API/PostApi";

export const SavePostPage = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { album } = useParams<{ album: string | undefined }>();
  const [savePosts, setSavedPosts] = useState<PostOnPersonalWall[]>([])
  const albums = [
    {
      albumTag: "all-posts",
      Name: "All Posts",
    },
    {
        albumTag: "favorite",
        Name: "Favorite",
      },
  ];

const loadSavePosts = async () => {
    if (user && token) {
      const posts = await getAllSavedPosts(token, user?.id);
      if (posts.code === 1000) {
        setSavedPosts(posts.data);
      }
    }
  };

  useEffect(() => {
    loadSavePosts();
  }, []);

  return (
    <div className="ml-96 mb-20">
      <div className="px-5 pt-2 w-[60vw]">
        <Link
          className="flex items-center w-20 bg-blue-300p py-2 text-gray-500 hover:text-black"
          to={user?.userUrl ? user.userUrl : ""}
        >
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} size="sm" className="p-2" />
          Back
        </Link>
        {albums.map((al) => (
          <p className="text-xl pb-2">{al.albumTag === album ? al.Name : ""}</p>
        ))}
        <div className="grid grid-cols-3 gap-1">
          {savePosts?.map((post) => (
            <div className="h-80 rounded-md shadow-lg bg-pink-300 relative">
            <img
              className="object-cover h-full w-full"
              src={post.representImage}
              alt=""
            />
            <div className="absolute top-0 w-full h-full bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition ease-in-out duration-300 cursor-pointer">
              <div className="absolute w-full flex justify-center top-[50%] text-white font-semibold">
                <AiFillHeart className="text-2xl pr-2" />
                <span>{post.numberOfLikes}</span>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};
