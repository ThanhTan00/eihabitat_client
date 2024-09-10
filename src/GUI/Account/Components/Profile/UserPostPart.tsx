import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { RiVideoAddLine } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import { useEffect, useState } from "react";
import { UserPostCard } from "./UserPostCard";
import { getAllPost } from "../../../../API/PostApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { Post } from "../../../../Model/Post";

export const UserPostPart = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>();
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedProducts = await getAllPost();

        //console.log(fetchedProducts.data);

        setPosts(fetchedProducts.data);

        //console.log(posts);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchPosts();
  }, []);

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
    <div className="relative w-[60%] ">
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
      <div className="relative">
        {loading && (
          <div className="absolute bg-white bg-opacity-70 z-10 h-full w-full flex items-center justify-center">
            <div className="flex items-center">
              <span className="text-2xl mr-4 font-bold text-[#083555]">
                Loading posts...
              </span>

              <div className="flex items-center justify-center h-screen">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full border-t-4 border-b-4 border-[#083555]"></div>
                  <div className="absolute top-0 left-0 h-10 w-10 rounded-full border-t-4 border-b-4 border-[#A68655] animate-spin"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-wrap">
          {posts?.map((post) => (
            <UserPostCard post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
