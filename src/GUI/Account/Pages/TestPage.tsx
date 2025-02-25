import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TestPage = () => {
  return (
    <div className="px-5 pt-5">
      <a
        className="flex items-center w-20 bg-blue-300p py-2 text-gray-500 hover:text-black"
        href="/"
      >
        {" "}
        <FontAwesomeIcon icon={faArrowLeft} size="sm" className="p-2" />
        Back
      </a>
      <p className="text-xl pb-2">All Posts</p>
      <div className="grid grid-cols-3 gap-1">
        <div className="h-72 rounded-md shadow-lg bg-pink-300">
          <img
            className="object-cover h-full w-full"
            src="https://cdn.pixabay.com/photo/2021/10/08/07/13/autumn-6690466_1280.jpg"
            alt=""
          />
        </div>
        <div className="h-72 rounded-md shadow-lg bg-pink-300">
          <img
            className="object-cover h-full w-full"
            src="https://cdn.pixabay.com/photo/2024/08/26/23/38/maranhao-sheets-9000410_1280.jpg"
            alt=""
          />
        </div>
        <div className="h-72 rounded-md shadow-lg bg-pink-300">
          <img
            className="object-cover h-full w-full"
            src="https://cdn.pixabay.com/photo/2021/10/08/07/13/autumn-6690466_1280.jpg"
            alt=""
          />
        </div>
        <div className="h-72 rounded-md shadow-lg bg-pink-300">
          <img
            className="object-cover h-full w-full"
            src="https://cdn.pixabay.com/photo/2024/08/26/23/38/maranhao-sheets-9000410_1280.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
