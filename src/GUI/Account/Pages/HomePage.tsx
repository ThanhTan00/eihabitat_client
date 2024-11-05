import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import {
  CommentModal,
  HomeRight,
  PostCard,
  StoryCircle,
  StoryModal,
} from "../Components";
import { useEffect, useState } from "react";
import { Post } from "../../../Model/Post";
import { getNewsFeedPosts } from "../../../API/PostApi";

export const HomePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const openStoryModal = (authorId: string | null) => {
    setSelectedStory(authorId);
    setIsStoryModalOpen(true);
  };

  const closeStoryModal = () => {
    setIsStoryModalOpen(false);
    setSelectedStory(null);
  };

  const openCommentModal = (postId: string) => {
    setSelectedPost(postId);
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const getNewsFeed = async () => {
      try {
        if (accessToken) {
          const listPosts = await getNewsFeedPosts(accessToken, user?.id);
          console.log(accessToken);
          console.log(listPosts.data);
          if (listPosts.data) {
            setPosts(listPosts.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNewsFeed();
  }, [user?.id]);
  return (
    <div>
      <div className="mt-5 flex w-[100%]">
        <div className="flex justify-center w-full px-10">
          <div className="max-w-3xl container mx-auto">
            <div
              onClick={() => openStoryModal(user ? user.id : null)}
              className="flex space-x-2 border rounded-md justify-start w-full"
            >
              <StoryCircle
                userAvatar={user?.profileAvatar}
                userProfileName={user?.profileName}
              />
            </div>
            <div className="container space-y-4 mx-auto w-[80%] mt-5">
              {posts?.map((post) => (
                <PostCard
                  post={post}
                  openCommentModal={openCommentModal}
                  rootUserId={user?.id}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <HomeRight />
        </div>
      </div>
      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={closeStoryModal}
        authorId={selectedStory}
      />
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={closeCommentModal}
        selectedPost={selectedPost}
      />
    </div>
  );
};
