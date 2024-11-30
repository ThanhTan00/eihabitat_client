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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../Store/store";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { NotificationBar } from "./NotificationBar";

interface MenuProps {
  activeTab: string | undefined;
  handleTabClick: (title: string) => void;
}

export const SideBarMenuIcon = ({ activeTab, handleTabClick }: MenuProps) => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="relative w-20 flex flex-col justify-between h-full px-4 border-r border-gray-200">
      <div className="pt-8 flex flex-col justify-between">
        <img className="w-10 h-10" src="\eiuhabitat-icon.png" alt="" />
        <div className="mt-10 space-y-4">
          <div
            onClick={() => handleTabClick("Home")}
            className="flex justify-around h-10 px-2 py-4 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-lg"
          >
            <AiOutlineHome className="text-3xl" />
          </div>
          <div
            onClick={() => handleTabClick("Search")}
            className={` ${
              activeTab === "Search" ? "border-[1px] border-stone-400" : ""
            } flex justify-around h-10 px-2 py-4 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-xl`}
          >
            <AiOutlineSearch className="text-3xl" />
          </div>
          <div
            onClick={() => handleTabClick("Message")}
            className={` ${
              activeTab === "Message" ? "border-[1px] border-stone-400" : ""
            } flex justify-around h-10 px-2 py-4 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-xl`}
          >
            {activeTab === "Message" ? (
              <AiFillMessage className="text-3xl" />
            ) : (
              <AiOutlineMessage className="text-3xl" />
            )}
          </div>
          <div
            onClick={() => handleTabClick("Notification")}
            className={` ${
              activeTab === "Notification"
                ? "border-[1px] border-stone-400"
                : ""
            } flex justify-around h-10 px-2 py-4 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-xl`}
          >
            {activeTab === "Notification" ? (
              <AiFillHeart className="text-3xl" />
            ) : (
              <AiOutlineHeart className="text-3xl" />
            )}
          </div>
          <div
            onClick={() => handleTabClick("Create")}
            className="flex h-10 justify-around h-10 px-2 py-4 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-lg"
          >
            <AiOutlinePlusCircle className="text-3xl" />
          </div>
          <div
            onClick={() => handleTabClick("Profile")}
            className="flex h-10 justify-around h-10 px-2 py-4 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-md"
          >
            <img
              className="h-6 w-6 rounded-full 
                "
              src={user?.profileAvatar}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex justify-around items-center cursor-pointer pb-10">
        <IoReorderThreeOutline className="text-2xl" />
      </div>

      {activeTab === "Search" ? (
        <div
          style={{ boxShadow: "8px 0 15px rgba(0, 0, 0, 0.15)" }}
          className="h-full absolute left-full top-0 bg-white w-[400px] h-full rounded-r-2xl"
        >
          <SearchBar />
        </div>
      ) : activeTab === "Notification" ? (
        <div
          style={{ boxShadow: "8px 0 15px rgba(0, 0, 0, 0.15)" }}
          className="h-full absolute left-full top-0 bg-white w-[400px] h-full rounded-r-2xl"
        >
          <NotificationBar />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
