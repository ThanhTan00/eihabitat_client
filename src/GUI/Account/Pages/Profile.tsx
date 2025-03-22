import {
  Loading,
  ProfileUserDetails,
  SavePostPart,
  UserPostPart,
} from "../Components";
import { useEffect, useState } from "react";
import { User } from "../../../Model/User";
import { getUserInfo } from "../../../API/UserApi";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUserPost } from "../../../API/PostApi";
import { Post, PostOnPersonalWall } from "../../../Model/Post";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { RiVideoAddLine } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import { faL } from "@fortawesome/free-solid-svg-icons";

export const Profile = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<string>("post");
  const { username } = useParams<{ username: string | undefined }>();
  const [hostUser, setHostUser] = useState<User | null>(null);
  const [postList, setPostList] = useState<PostOnPersonalWall[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const tabs = [
    {
      tab: "post",
      icon: <AiOutlineTable />,
      activeTab: <UserPostPart postList={postList} />,
    },
    // {
    //   tab: "Reels",
    //   icon: <RiVideoAddLine />,
    //   activeTab: "",
    // },
    {
      tab: "Saved",
      icon: <BiBookmark />,
      activeTab: <SavePostPart />,
    },
    // {
    //   tab: "Tagged",
    //   icon: <AiOutlineUser />,
    //   activeTab: "",
    // },
  ];

  const getUser = async () => {
    try {
      if (token && username) {
        const userInfo = await getUserInfo(token, username, user?.profileName);
        const userPostList = await getAllUserPost(token, username);

        if (userInfo.code === 1000) {
          setHostUser(userInfo.data);
        } else {
          navigate("/error");
        }
        if (userPostList.data) {
          setPostList(userPostList.data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [username]);

  return (
    <div className="ml-96 w-[1000px]">
      <div className="relative flex items-center justify-center">
        {isLoading && (
          <div className="absolute top-0 w-full h-60">
            <Loading />
          </div>
        )}
        <ProfileUserDetails
          hostUser={hostUser}
          numberOfPosts={postList?.length}
        />
      </div>
      <div className="relative flex items-center justify-center">
        <div className="w-[80%]">
          <div className="flex border-t relative items-center justify-center space-x-8">
            {user?.profileName !== username ? (
              <div className="border-t border-black flex items-center cursor-pointer py-2">
                <p>
                  <AiOutlineTable />
                </p>
                <p className="ml-1">Post</p>
              </div>
            ) : (
              <>
                {tabs.map((item) => (
                  <div
                    onClick={() => setActiveTab(item.tab)}
                    className={`${
                      activeTab === item.tab
                        ? "border-t border-black"
                        : "opacity-60"
                    } flex items-center cursor-pointer py-2`}
                  >
                    <p>{item.icon}</p>
                    <p className="ml-1">{item.tab}</p>
                  </div>
                ))}
              </>
            )}
          </div>
          {tabs.map((item) => activeTab === item.tab && item.activeTab)}
        </div>
      </div>
    </div>
  );
};
