import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { RiVideoAddLine } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import { useState } from "react";
import { UserPostCard } from "./UserPostCard";

export const UserPostPart = () => {
  const [activeTab, setActiveTab] = useState<string>();

  const tabs = [
    {
      tab: "post",
      icon: <AiOutlineTable />,
      activeTab: "",
    },
    {
      tab: "Reels",
      icon: <RiVideoAddLine />,
      activeTab: "",
    },
    {
      tab: "Saved",
      icon: <BiBookmark />,
      activeTab: "",
    },
    {
      tab: "Tagged",
      icon: <AiOutlineUser />,
      activeTab: "",
    },
  ];
  return (
    <div>
      <div className="flex space-x-14 border-t relative">
        {tabs.map((item) => (
          <div
            onClick={() => setActiveTab(item.tab)}
            className={`${
              activeTab === item.tab ? "border-t border-black" : "opacity-60"
            } flex items-center cursor-pointer py-2`}
          >
            <p>{item.icon}</p>
            <p className="ml-1">{item.tab}</p>
          </div>
        ))}
      </div>
      <div>
        <div className="flex flex-wrap">
          {[1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
            <UserPostCard />
          ))}
        </div>
      </div>
    </div>
  );
};
