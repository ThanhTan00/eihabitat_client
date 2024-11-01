import { useEffect, useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { mainu } from "./SidebarConfig";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../Store/store";
import { useSelector } from "react-redux";
import { PostCreateModal } from "../Post/PostCreateModal";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<string>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState<string | undefined>("nul");

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  const handleTabClick = (title: string) => {
    if (title === "Profile") {
      navigate("/" + user?.profileName);
      setActiveTab(title);
    } else if (title === "Home") {
      navigate("/");
      setActiveTab(title);
    } else if (title === "Create") {
      setIsPostModalOpen(true);
    }
  };
  useEffect(() => {
    setUserAvatar(user?.profileAvatar);
  });

  return (
    <div className="sticky top-0 h-[100vh]">
      <div className="flex flex-col justify-between h-full px-10">
        <div>
          <div className="pt-10">
            <img className="w-40" src="\eiuhabitat-logo.png" alt="" />
            <div className="mt-10 space-y-4">
              {mainu.map((item) => (
                <div
                  onClick={() => handleTabClick(item.title)}
                  className="flex h-10 px-3 py-6 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-lg"
                >
                  {activeTab === item.title ? item.activeIcon : item.icon}
                  <p
                    className={`${
                      activeTab === item.title ? "font-bold" : "font-semibold"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              ))}
              <div
                onClick={() => handleTabClick("Create")}
                className="flex h-10 px-3 py-6 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-lg"
              >
                <AiOutlinePlusCircle className="text-3xl mr-5" />
                <p className="font-semibold">Create</p>
              </div>
              <div
                onClick={() => handleTabClick("Profile")}
                className="flex h-10 px-3 py-6 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-md"
              >
                <img
                  className={`h-8 w-8 mr-5 rounded-full ${
                    activeTab === "Profile" ? "border-white border-4" : ""
                  }`}
                  src={userAvatar}
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
        </div>
        <div className="flex items-center cursor-pointer pb-10">
          <IoReorderThreeOutline className="text-2xl" />
          <p className="ml-5">More</p>
        </div>
      </div>
      <PostCreateModal isOpen={isPostModalOpen} onClose={closePostModal} />
    </div>
  );
};
