import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getAllChatRoom } from "../../../API/UserApi";
import { ChatUser } from "../../../Model/User";
import { ChatBot, ChatBox, ChatRoom } from "../Components";

export const ChatPage = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [chatRooms, setChatRooms] = useState<ChatUser[]>([]);
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
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

  const getChatRoms = async () => {
    try {
      if (token && user) {
        const chats = await getAllChatRoom(token, user?.id);
        console.log(chats);
        setChatRooms(chats);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChatBotClick = () => {
    navigate("/chat/0");
  };

  // const HandleChatSelected = (id: string) => {
  //   setSelectedChat(id);
  // };

  useEffect(() => {
    getChatRoms();
  }, []);

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
              {chatRooms.map((room) => (
                <ChatRoom chatUser={room} />
              ))}
              <div
                onClick={handleChatBotClick}
                className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4"
              >
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-300">
                      <img
                        className="w-full h-full rounded-full object-fit"
                        src="\eiuhabitat-icon.png"
                        alt="Story"
                      />
                    </div>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-md  max-w-[200px] duration-200 truncate">
                        EIHabitat
                      </p>
                    </div>
                    <p className="font-thin text-xs opacity-80">last message</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {userId && userId !== "0" ? (
          <ChatBox selectedId={userId} />
        ) : (
          <ChatBot />
        )}
      </div>
      {/* <div className="w-full">
        <ChatBox recipientId={id ? id : ""} />
      </div> */}
    </div>
  );
};
