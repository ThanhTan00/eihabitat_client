import { useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { mainu } from "./SidebarConfig";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../Store/store";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<string>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleTabClick = (title: string) => {
    setActiveTab(title);
    if (title === "profile") {
      navigate("/" + user?.profileName);
    } else if (title === "Home") {
      navigate("/");
    }
  };

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
                onClick={() => handleTabClick("profile")}
                className="flex h-10 px-3 py-6 items-center mb-5 cursor-pointer text-lg hover:scale-105 duration-300 hover:bg-[#DED1BF] hover:bg-opacity-50 rounded-md"
              >
                <img
                  className={`h-8 w-8 mr-5 rounded-full ${
                    activeTab === "profile" ? "border-white border-4" : ""
                  }`}
                  src={user?.profileAvatar}
                  alt=""
                />
                <p
                  className={`${
                    activeTab === "profile" ? "font-bold" : "font-semibold"
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
    </div>
  );
};
