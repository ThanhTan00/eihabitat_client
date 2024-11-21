import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../Store/store";
import { messageCallbackType } from "@stomp/stompjs";
import { AiFillCompass, AiFillHeart, AiFillHome, AiFillMessage, AiFillPlusCircle, AiOutlineCompass, AiOutlineHeart, AiOutlineHome, AiOutlineMessage, AiOutlinePlusCircle, AiOutlineSearch } from "react-icons/ai";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";
import { IoReorderThreeOutline } from "react-icons/io5";

interface MenuProps {
    activeTab:string | undefined;
    setActiveTab: React.Dispatch<React.SetStateAction<string | undefined>>;
    setIsPostModalOpen: React.Dispatch<React.SetStateAction<boolean | false>>;
}

export const SideBarMenu = ({activeTab, setActiveTab, setIsPostModalOpen} : MenuProps) => {
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleTabClick = (title: string) => {
        if (title === "Profile") {
          navigate("/" + user?.profileName);
        } else if (title === "Home") {
          navigate("/");
        } else if (title === "Create") {
          setIsPostModalOpen(true);
        }
        setActiveTab(title);
      };
    return (
        <div className="flex flex-col justify-between h-full px-10">
        <div className="pt-10">
          <img className="w-40" src="\eiuhabitat-logo.png" alt="" />
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
              onClick={() => handleTabClick("Explore")}
              className="flex h-10 px-3 py-6 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-lg"
            >
              {activeTab === "Explore" ? (
                <AiFillCompass className="text-3xl mr-5" />
              ) : (
                <AiOutlineCompass className="text-3xl mr-5" />
              )}
              <p
                className={`${
                  activeTab === "Explore" ? "font-bold" : "font-semibold"
                }`}
              >
                Explore
              </p>
            </div>
            <div
              onClick={() => handleTabClick("Reels")}
              className="flex h-10 px-3 py-6 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-lg"
            >
              {activeTab === "Reels" ? (
                <RiVideoFill className="text-3xl mr-5" />
              ) : (
                <RiVideoLine className="text-3xl mr-5" />
              )}
              <p
                className={`${
                  activeTab === "Reels" ? "font-bold" : "font-semibold"
                }`}
              >
                Reels
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
              className="flex h-10 px-3 py-6 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-lg"
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
    )
}