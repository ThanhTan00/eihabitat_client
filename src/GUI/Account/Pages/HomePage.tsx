import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import {
  CommentModal,
  HomeRight,
  PostCard,
  StoryCircle,
  StoryModal,
} from "../Components";
import { useEffect, useRef, useState } from "react";
import { Post } from "../../../Model/Post";
import { getNewsFeedPosts } from "../../../API/PostApi";
import { getAllFollowings } from "../../../API/UserApi";
import { Follower } from "../../../Model/User";
import "./Style.css";

export const HomePage = () => {
  const [selectedStory, setSelectedStory] = useState<string | undefined>(
    undefined
  );
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [followings, setFollowings] = useState<Follower[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const { token, user } = useSelector((state: RootState) => state.auth);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollAmount = 400;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const openStoryModal = (authorId: string | undefined) => {
    setSelectedStory(authorId);
    setIsStoryModalOpen(true);
  };

  const closeStoryModal = () => {
    setIsStoryModalOpen(false);
    setSelectedStory(undefined);
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
    const getNewsFeed = async () => {
      try {
        if (token) {
          const listPosts = await getNewsFeedPosts(token, user?.id);
          if (listPosts.data) {
            setPosts(listPosts.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getFollowings = async () => {
      try {
        if (token && user) {
          const followings = await getAllFollowings(
            token,
            user?.profileName,
            user?.id
          );
          console.log(followings.data);
          setFollowings(followings.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFollowings();
    getNewsFeed();
  }, [user?.id]);
  return (
    <div className="ml-96">
      <div className="mt-5 flex w-[1000px]">
        <div className="flex justify-center w-[70%]">
          <div className="container mx-auto">
            <div className="flex justify-center items-center w-full">
              <div className="relative w-[80%] flex items-center">
                <button
                  onClick={scrollLeft}
                  className="absolute left-2 bottom-9 h-6 w-6 rounded-full flex text-black bg-white items-center justify-around duration-200 shadow-md"
                >
                  &#10094;
                </button>
                <div
                  ref={scrollRef}
                  className="w-full overflow-x-auto whitespace-nowrap story-part"
                >
                  <div className="flex space-x-4">
                    <StoryCircle
                      key={user?.id}
                      userId={user?.id}
                      userProfileName={user?.profileName}
                      userAvatar={user?.profileAvatar}
                      openStoryModal={openStoryModal}
                    />
                    {followings?.map((following) => (
                      <StoryCircle
                        key={following.id}
                        userId={following.id}
                        userProfileName={following.profileName}
                        userAvatar={following.profileAvatar}
                        openStoryModal={openStoryModal}
                      />
                    ))}
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={scrollRight}
                  className="absolute right-2 bottom-9 h-6 w-6 rounded-full flex text-black bg-white items-center justify-around duration-200 shadow-md"
                >
                  &#10095;
                </button>
              </div>
            </div>

            <div className="container space-y-4 mx-auto w-[65%] mt-5">
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
        <div className="w-[30%]">
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
