import { Loading, ProfileUserDetails, UserPostPart } from "../Components";
import { useEffect, useState } from "react";
import { User } from "../../../Model/User";
import { getUserInfo } from "../../../API/UserApi";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUserPost } from "../../../API/PostApi";
import { Post, PostOnPersonalWall } from "../../../Model/Post";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";

export const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { username } = useParams<{ username: string | undefined }>();
  const [hostUser, setHostUser] = useState<User | null>(null);
  const [postList, setPostList] = useState<PostOnPersonalWall[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const getUser = async () => {
      try {
        if (accessToken && username) {
          const userInfo = await getUserInfo(
            accessToken,
            username,
            user?.profileName
          );
          const userPostList = await getAllUserPost(accessToken, username);

          if (userInfo.code === 1000) {
            setHostUser(userInfo.data);
            console.log(userInfo.data);
          } else {
            navigate("/error");
          }
          if (userPostList.data) {
            console.log(userPostList.data);
            setPostList(userPostList.data);
          }
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [username]);

  return (
    <div className="px-20">
      <div className="relative flex items-center justify-center">
        {isLoading && <Loading />}
        <ProfileUserDetails
          hostUser={hostUser}
          numberOfPosts={postList?.length}
        />
      </div>
      <div className="relative flex items-center justify-center">
        {isLoading && <Loading />}
        <UserPostPart postList={postList} />
      </div>
    </div>
  );
};
