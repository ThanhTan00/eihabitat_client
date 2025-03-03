import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../Store/store";
import { getTop4SavedPosts } from "../../../../API/PostApi";
import { useEffect, useState } from "react";
import { Image } from "../../../../Model/Post";

export const SavePostPart = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [album, setAlbum] = useState<Image[]>([]);

  const loadAlbums = async () => {
    if (user && token) {
      const albums = await getTop4SavedPosts(token, user?.id);
      if (albums.code === 1000) {
        setAlbum(albums.data.representImages);
        console.log(albums.data);
      }
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  return (
    <div className="px-5 pt-5">
      <p className="text-xs pb-4">Only you can see what you've saved</p>
      <div className="grid grid-cols-3 gap-4">
        <Link
          to={`/saved/all-posts`}
          className="h-64 rounded-md shadow-lg relative"
        >
          <div className="flex w-full h-[50%] space-x-0.5 pb-0.5">
            <div className="flex w-[50%] h-full">
              <img
                className="object-cover h-full w-full rounded-tl-md"
                src={album[0] && album[0].imageId}
                alt=""
              />
            </div>
            <div className="flex w-[50%] h-full">
              <img
                className="object-cover h-full w-full rounded-tr-md"
                src={album[1] && album[1].imageId}
                alt=""
              />
            </div>
          </div>
          <div className="flex w-full h-[50%] space-x-0.5">
            <div className="flex w-[50%] h-full">
              <img
                className="object-cover h-full w-full rounded-bl-md"
                src={album[2] && album[2].imageId}
                alt=""
              />
            </div>
            <div className="flex w-[50%] h-full">
              <img
                className="object-cover h-full w-full rounded-br-md"
                src={album[3] && album[3].imageId}
                alt=""
              />
            </div>
          </div>
          <div className="absolute flex items-end w-full h-full top-0 rounded-md shadow-[inset_1px_-50px_100px_12px_#1c1c1c] hover:shadow-[inset_-6px_-7px_83px_-28px_#000000] cursor-pointer">
            <p className="text-white p-4 text-md">All posts</p>
          </div>
        </Link>

        <div className="h-64 rounded-md shadow-lg relative">
          <div className="flex w-full h-[50%] space-x-0.5 pb-0.5">
            <div className="flex w-[50%] h-full">
              <img
                className="object-cover h-full w-full rounded-tl-md"
                src="https://cdn.pixabay.com/photo/2021/10/08/07/13/autumn-6690466_1280.jpg"
                alt=""
              />
            </div>
            <div className="flex w-[50%] h-full">
              <img
                className="object-cover h-full w-full rounded-tr-md"
                src="https://cdn.pixabay.com/photo/2021/01/06/21/50/couple-5895730_1280.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="flex w-full h-[50%] space-x-0.5">
            <div className="flex w-[50%] h-full"></div>
            <div className="flex w-[50%] h-full"></div>
          </div>
          <div className="absolute flex items-end w-full h-full top-0 rounded-md shadow-[inset_1px_-50px_100px_12px_#1c1c1c] hover:shadow-[inset_-6px_-7px_83px_-28px_#000000] cursor-pointer">
            <p className="text-white p-4 text-md">Customize</p>
          </div>
        </div>
      </div>
    </div>
  );
};
