import { Link } from "react-router-dom";

export const SavePostPart = () => {
  return (
    <div className="px-5 pt-5">
      <p className="text-xs pb-4">Only you can see what you've saved</p>
      <div className="grid grid-cols-3 gap-4">
        <Link to={`/saved/all-posts`}  className="h-64 rounded-md shadow-lg relative">
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
            <div className="flex w-[50%] h-full">
              <img
                className="object-cover h-full w-full rounded-bl-md"
                src="https://cdn.pixabay.com/photo/2024/01/29/14/12/boy-8539958_1280.jpg"
                alt=""
              />
            </div>
            <div className="flex w-[50%] h-full">
              <img
                className="object-cover h-full w-full rounded-br-md"
                src="https://cdn.pixabay.com/photo/2024/01/29/08/35/girl-8539256_1280.jpg"
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
            <div className="flex w-[50%] h-full">
            </div>
            <div className="flex w-[50%] h-full">
            </div>
          </div>
          <div className="absolute flex items-end w-full h-full top-0 rounded-md shadow-[inset_1px_-50px_100px_12px_#1c1c1c] hover:shadow-[inset_-6px_-7px_83px_-28px_#000000] cursor-pointer">
            <p className="text-white p-4 text-md">Customize</p>
          </div>
        </div>

      </div>
    </div>
  );
};
