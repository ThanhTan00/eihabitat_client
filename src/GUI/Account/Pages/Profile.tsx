import {
  CommentModal,
  Loading,
  ProfileUserDetails,
  UserPostPart,
} from "../Components";
import { useEffect, useState } from "react";
import { User } from "../../../Model/User";
import { getUserInfo } from "../../../API/UserApi";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPost } from "../../../API/PostApi";
import { Post } from "../../../Model/Post";

export const Profile = () => {
  const { username } = useParams<{ username: string | undefined }>();
  const [user, setUser] = useState<User | null>(null);
  const [postList, setPostList] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setIsCommentModalOpen(true);
  };

  const closeModal = () => {
    setIsCommentModalOpen(false);
    setSelectedPost(null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const getUser = async () => {
      try {
        if (accessToken && username) {
          const userInfo = await getUserInfo(accessToken, username);
          const userPostList = await getAllPost(accessToken, username);

          console.log(userInfo);
          console.log(userPostList);

          if (userInfo.code === 1000) {
            setUser(userInfo.data);
          } else {
            navigate("/error");
          }
          if (userPostList.data) {
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
        <ProfileUserDetails user={user} numberOfPosts={postList?.length} />
      </div>
      <div className="relative flex items-center justify-center">
        {isLoading && <Loading />}
        <UserPostPart postList={postList} openCommnetModal={openModal} />
      </div>
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={closeModal}
        post={selectedPost}
      />
    </div>
  );
};
