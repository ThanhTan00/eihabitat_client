import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../Store/store";
import {
  faPenToSquare,
  faPhoneFlip,
  faCameraAlt,
  faVideoCamera,
  faIcicles,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { Link } from "react-router-dom";

export const ChatPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { id } = useParams<{ id: string | undefined }>();

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollAmount = 400;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="ml-20 ">
      <div className="flex ">
        <div className="max-w-[500px] relative z-0 border-r border-gray-200 ">
          <div className="absolute z-10 w-full bg-white top-0 flex justify-between items-center px-10 pt-10 pb-10">
            <p className="text-xl font-bold">{user?.profileName}</p>
            <FontAwesomeIcon icon={faPenToSquare} size="xl" />
          </div>
          <div className="pt-40 h-screen overflow-y-auto px-5 space-y-4">
            <div className="flex justify-center items-center w-full px-4">
              <div className="px-2 relative w-[100%] flex items-center">
                <button
                  onClick={scrollLeft}
                  className="absolute left-2 bottom-9 h-6 w-6 rounded-full flex text-black bg-white items-center justify-around duration-200 shadow-md"
                >
                  &#10094;
                </button>
                <div
                  ref={scrollRef}
                  className="w-full overflow-x-auto whitespace-nowrap story-part"
                >
                  <div className="flex space-x-4">
                    <div className="flex flex-col items-center cursor-pointer">
                      <div className="w-20 h-20 rounded-full">
                        <img
                          className="w-full h-full rounded-full object-cover"
                          src="https://cdn.pixabay.com/photo/2022/01/20/15/34/monkey-6952630_640.jpg"
                          alt="Story"
                        />
                      </div>
                      <span className="text-xs mt-1 max-w-[60px] truncate">
                        eheheheheheheehe
                      </span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer">
                      <div className="w-20 h-20 rounded-full">
                        <img
                          className="w-full h-full rounded-full object-cover"
                          src="https://cdn.pixabay.com/photo/2022/01/20/15/34/monkey-6952630_640.jpg"
                          alt="Story"
                        />
                      </div>
                      <span className="text-xs mt-1 max-w-[60px] truncate">
                        eheheheheheheehe
                      </span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer">
                      <div className="w-20 h-20 rounded-full">
                        <img
                          className="w-full h-full rounded-full object-cover"
                          src="https://cdn.pixabay.com/photo/2022/01/20/15/34/monkey-6952630_640.jpg"
                          alt="Story"
                        />
                      </div>
                      <span className="text-xs mt-1 max-w-[60px] truncate">
                        eheheheheheheehe
                      </span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer">
                      <div className="w-20 h-20 rounded-full">
                        <img
                          className="w-full h-full rounded-full object-cover"
                          src="https://cdn.pixabay.com/photo/2022/01/20/15/34/monkey-6952630_640.jpg"
                          alt="Story"
                        />
                      </div>
                      <span className="text-xs mt-1 max-w-[60px] truncate">
                        eheheheheheheehe
                      </span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer">
                      <div className="w-20 h-20 rounded-full">
                        <img
                          className="w-full h-full rounded-full object-cover"
                          src="https://cdn.pixabay.com/photo/2022/01/20/15/34/monkey-6952630_640.jpg"
                          alt="Story"
                        />
                      </div>
                      <span className="text-xs mt-1 max-w-[60px] truncate">
                        eheheheheheheehe
                      </span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer">
                      <div className="w-20 h-20 rounded-full">
                        <img
                          className="w-full h-full rounded-full object-cover"
                          src="https://cdn.pixabay.com/photo/2022/01/20/15/34/monkey-6952630_640.jpg"
                          alt="Story"
                        />
                      </div>
                      <span className="text-xs mt-1 max-w-[60px] truncate">
                        eheheheheheheehe
                      </span>
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={scrollRight}
                  className="absolute right-2 bottom-9 h-6 w-6 rounded-full flex text-black bg-white items-center justify-around duration-200 shadow-md"
                >
                  &#10095;
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center  px-4">
              <p className="text-md font-bold">Messages</p>
              <p className="text-sm font-semibold text-gray-500">Requests</p>
            </div>
            <div className="">
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        Lnt.Tan00
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">
                      How are you today?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full relative z-0">
          <div className="absolute bg-white w-full z-10 top-0 flex items-center border-b border-gray-200">
            <div className="flex items-center space-x-4 px-10 py-5">
              <div className="w-14 h-14 rounded-full">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={user?.profileAvatar}
                  alt="Story"
                />
              </div>
              <div className="flex justify-between items-end">
                <p className="text-md font-semibold max-w-[600px] duration-200 truncate">
                  Lnt.Tan00
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 px-10 py-5 ml-auto">
              <FontAwesomeIcon
                icon={faPhoneFlip}
                size="xl"
                className="cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faVideoCamera}
                size="xl"
                className="cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faInfoCircle}
                size="xl"
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col h-screen overflow-y-scroll px-5 py-28 space-y-4">
            <div className="text-center font-semibold">3 Nov 2024, 17:23</div>
            <div className="grid grid-cols-1 space-y-4">
              <div className="justify-self-start">
                <div className="grid grid-cols-6 max-w-96">
                  <div className="w-8 h-8 col-span-1 place-self-end rounded-full mr-4">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={user?.profileAvatar}
                      alt="Story"
                    />
                  </div>
                  <div className="col-span-5 space-y-1">
                    <p className="text-md max-w-96 duration-200 p-2 rounded-2xl bg-gray-100">
                      You can also use variant modifiers to target media queries
                      like responsive breakpoints, dark mode,
                      prefers-reduced-motion, and more. For example, use
                      md:justify-self-end to apply the justify-self-end utility
                      at only medium screen sizes and above.
                    </p>
                    <p className="text-md max-w-96 duration-200 p-2 rounded-2xl bg-gray-100">
                      You can also use variant modifiers to target media queries
                    </p>
                  </div>
                </div>
              </div>
              <div className="justify-self-end space-y-1">
                <p className="text-md text-white max-w-96 duration-200 p-2 rounded-2xl bg-[#0C5083]">
                  You can also use variant modifiers to target media queries
                  like responsive breakpoints, dark mode,
                  prefers-reduced-motion, and more. For example, use
                  md:justify-self-end to apply the justify-self-end utility at
                  only medium screen sizes and above.
                </p>
                <p className="text-md text-white max-w-96 duration-200 p-2 rounded-2xl bg-[#0C5083]">
                  only medium screen sizes and above.
                </p>
              </div>
              <div className="justify-self-start">
                <div className="grid grid-cols-6 max-w-96">
                  <div className="w-8 h-8 col-span-1 place-self-end rounded-full mr-4">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={user?.profileAvatar}
                      alt="Story"
                    />
                  </div>
                  <div className="col-span-5 space-y-1">
                    <p className="text-md max-w-96 duration-200 p-2 rounded-2xl bg-gray-100">
                      You can also use variant modifiers to target media queries
                      like responsive breakpoints, dark mode,
                      prefers-reduced-motion, and more. For example, use
                      md:justify-self-end to apply the justify-self-end utility
                      at only medium screen sizes and above.
                    </p>
                    <p className="text-md max-w-96 duration-200 p-2 rounded-2xl bg-gray-100">
                      You can also use variant modifiers to target media queries
                    </p>
                  </div>
                </div>
              </div>
              <div className="justify-self-end space-y-1">
                <p className="text-md text-white max-w-96 duration-200 p-2 rounded-2xl bg-[#0C5083]">
                  You can also use variant modifiers to target media queries
                  like responsive breakpoints, dark mode,
                  prefers-reduced-motion, and more. For example, use
                  md:justify-self-end to apply the justify-self-end utility at
                  only medium screen sizes and above.
                </p>
                <p className="text-md text-white max-w-96 duration-200 p-2 rounded-2xl bg-[#0C5083]">
                  only medium screen sizes and above.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 z-10 bg-white w-full flex items-center w-full px-6 py-6">
            {/* Smile icon */}
            <span className="absolute left-8 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.75 9.75l-.004.001m-5.496 0L9.25 9.75m2.5 5.25a3.75 3.75 0 003.75-3.75m-7.5 0a3.75 3.75 0 017.5 0m-7.5 0A3.75 3.75 0 0112 15a3.75 3.75 0 01-7.5 0z"
                />
              </svg>
            </span>

            {/* Input field */}
            <input
              type="text"
              placeholder="Message..."
              className="w-full py-2 pl-8 pr-20 text-gray-700 bg-white border rounded-full shadow-sm focus:outline-none focus:ring focus:ring-blue-200 border-gray-300"
            />
          </div>
        </div>
      </div>
      {/* <div className="w-full">
        <ChatBox recipientId={id ? id : ""} />
      </div> */}
    </div>
  );
};
