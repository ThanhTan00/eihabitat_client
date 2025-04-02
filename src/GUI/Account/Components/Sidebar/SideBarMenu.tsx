import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../Store/store";
import { messageCallbackType } from "@stomp/stompjs";
import {
  AiFillCompass,
  AiFillHeart,
  AiFillHome,
  AiFillMessage,
  AiFillPlusCircle,
  AiOutlineCompass,
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlinePlusCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

interface MenuProps {
  activeTab: string | undefined;
  newNotification: number;
  handleTabClick: (title: string) => void;
}

export const SideBarMenu = ({
  activeTab,
  newNotification,
  handleTabClick,
}: MenuProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between h-full px-10 border-r border-gray-200">
      <div className="pt-8">
        <Link to={"http://localhost:3000/"}>
          <img className="w-40 h-10" src="\eiuhabitat-logo.png" alt="" />
        </Link>
        <div className="mt-10 space-y-4">
          <div
            onClick={() => handleTabClick("Home")}
            className="flex h-10 px-3 py-6 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-lg"
          >
            {activeTab === "Home" ? (
              <AiFillHome className="text-3xl mr-5" />
            ) : (
              <AiOutlineHome className="text-3xl mr-5" />
            )}
            <p
              className={`${
                activeTab === "Home" ? "font-bold" : "font-semibold"
              }`}
            >
              Home
            </p>
          </div>
          <div
            onClick={() => handleTabClick("Search")}
            className="flex h-10 px-3 py-6 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-lg"
          >
            {activeTab === "Search" ? (
              <AiOutlineSearch className="text-3xl mr-5" />
            ) : (
              <AiOutlineSearch className="text-3xl mr-5" />
            )}
            <p
              className={`${
                activeTab === "Search" ? "font-bold" : "font-semibold"
              }`}
            >
              Search
            </p>
          </div>
          <div
            onClick={() => handleTabClick("Message")}
            className="flex h-10 px-3 py-6 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-lg"
          >
            {activeTab === "Message" ? (
              <AiFillMessage className="text-3xl mr-5" />
            ) : (
              <AiOutlineMessage className="text-3xl mr-5" />
            )}
            <p
              className={`${
                activeTab === "Message" ? "font-bold" : "font-semibold"
              }`}
            >
              Message
            </p>
          </div>
          <div
            onClick={() => handleTabClick("Notification")}
            className="relative flex h-10 px-3 py-6 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-lg"
          >
            {activeTab === "Notification" ? (
              <AiFillHeart className="text-3xl mr-5" />
            ) : (
              <AiOutlineHeart className="text-3xl mr-5" />
            )}
            <p
              className={`${
                activeTab === "Notification" ? "font-bold" : "font-semibold"
              }`}
            >
              Notification
            </p>
            {newNotification !== 0 ? (
              <div className="absolute left-[100%] flex justify-center items-center w-4 h-4 m-2 bg-red-500 rounded-full font-semibold text-xs text-white">
                {newNotification}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div
            onClick={() => handleTabClick("Create")}
            className="flex h-10 px-3 py-6 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-lg"
          >
            {activeTab === "Create" ? (
              <AiFillPlusCircle className="text-3xl mr-5" />
            ) : (
              <AiOutlinePlusCircle className="text-3xl mr-5" />
            )}
            <p
              className={`${
                activeTab === "Create" ? "font-bold" : "font-semibold"
              }`}
            >
              Create
            </p>
          </div>
          <div
            onClick={() => handleTabClick("Profile")}
            className="flex h-10 px-3 py-6 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-md"
          >
            <img
              className={`h-8 w-8 mr-5 rounded-full ${
                activeTab === "Profile" ? "border-white border-4" : ""
              }`}
              src={user?.profileAvatar}
              alt=""
            />
            <p
              className={`${
                activeTab === "Profile" ? "font-bold" : "font-semibold"
              }`}
            >
              Profile
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center cursor-pointer pb-10">
        <IoReorderThreeOutline className="text-2xl" />
        <p className="ml-5">More</p>
      </div>
    </div>
  );
};
