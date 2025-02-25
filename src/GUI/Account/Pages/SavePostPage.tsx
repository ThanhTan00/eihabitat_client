import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../Store/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const SavePostPage = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { album } = useParams<{ album: string | undefined }>();
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
          <div className="h-80 rounded-md shadow-lg bg-pink-300 relative">
            <img
              className="object-cover h-full w-full"
              src="https://cdn.pixabay.com/photo/2021/10/08/07/13/autumn-6690466_1280.jpg"
              alt=""
            />
            <div className="absolute top-0 w-full h-full bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition ease-in-out duration-300 cursor-pointer">
              <div className="absolute w-full flex justify-center top-[50%] text-white font-semibold">
                <AiFillHeart className="text-2xl pr-2" />
                <span>3.2M</span>
              </div>
            </div>
          </div>
          <div className="h-80 rounded-md shadow-lg bg-pink-300 relative">
            <img
              className="object-cover h-full w-full"
              src="https://cdn.pixabay.com/photo/2024/10/04/18/30/giant-hummingbird-9097277_1280.jpg"
              alt=""
            />
            <div className="absolute top-0 w-full h-full bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition ease-in-out duration-300 cursor-pointer">
              <div className="absolute w-full flex justify-center top-[50%] text-white font-semibold">
                <AiFillHeart className="text-2xl pr-2" />
                <span>3.2M</span>
              </div>
            </div>
          </div>
          <div className="h-80 rounded-md shadow-lg bg-pink-300 relative">
            <img
              className="object-cover h-full w-full"
              src="https://cdn.pixabay.com/photo/2021/10/08/07/13/autumn-6690466_1280.jpg"
              alt=""
            />
            <div className="absolute top-0 w-full h-full bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition ease-in-out duration-300 cursor-pointer">
              <div className="absolute w-full flex justify-center top-[50%] text-white font-semibold">
                <AiFillHeart className="text-2xl pr-2" />
                <span>3.2M</span>
              </div>
            </div>
          </div>
          <div className="h-80 rounded-md shadow-lg bg-pink-300 relative">
            <img
              className="object-cover h-full w-full"
              src="https://cdn.pixabay.com/photo/2021/10/08/07/13/autumn-6690466_1280.jpg"
              alt=""
            />
            <div className="absolute top-0 w-full h-full bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition ease-in-out duration-300 cursor-pointer">
              <div className="absolute w-full flex justify-center top-[50%] text-white font-semibold">
                <AiFillHeart className="text-2xl pr-2" />
                <span>3.2M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
