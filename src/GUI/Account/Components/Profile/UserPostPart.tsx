import {
  AiOutlineCamera,
  AiOutlineTable,
  AiOutlineUser,
  AiOutlineVideoCameraAdd,
} from "react-icons/ai";
import { RiVideoAddLine } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import { useEffect, useState } from "react";
import { UserPostCard } from "./UserPostCard";
import { Post, PostOnPersonalWall } from "../../../../Model/Post";
import { open } from "fs";

type Props = {
  postList: PostOnPersonalWall[] | null;
  openCommnetModal: (postId: string) => void;
};

export const UserPostPart = ({ postList, openCommnetModal }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("post");
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
    <div className="w-[80%]">
      <div className="flex border-t relative items-center justify-between pr-32 pl-32">
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
      <div className="min-h-[300px]">
        {postList?.length === 0 || postList === null ? (
          <div className="py-5 flex h-full w-full items-center justify-center">
            <div>
              <div className="flex items-center justify-center">
                <AiOutlineCamera className="text-[60px] text-gray-800 text-opacity-25" />
              </div>
              <p className="text-2xl font-bold text-gray-800 text-opacity-25">
                No Posts Yet
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-flow-row grid-cols-3">
            {postList.map((post) => (
              <UserPostCard
                key={post.id}
                post={post}
                onClick={() => openCommnetModal(post.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
