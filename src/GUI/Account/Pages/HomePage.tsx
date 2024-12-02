import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import {
  CommentModal,
  HomeRight,
  NewsFeed,
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
  // const [posts, setPosts] = useState<Post[]>([]);
  const [followings, setFollowings] = useState<Follower[] | null>(null);
  // const [selectedPost, setSelectedPost] = useState<string | null>(null);
  // const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
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

  // const openCommentModal = (postId: string) => {
  //   setSelectedPost(postId);
  //   setIsCommentModalOpen(true);
  // };

  // const closeCommentModal = () => {
  //   setIsCommentModalOpen(false);
  //   setSelectedPost(null);
  // };

  // const getNewsFeed = async (currentPage: number) => {
  //   if (loading) return;
  //   console.log(page);
  //   try {
  //     setLoading(true);
  //     if (token) {
  //       const result = await getNewsFeedPosts(token, user?.id, currentPage, 4);
  //       if (result.code === 1000) {
  //         setPosts((prev) => [...prev, ...result.data.content]);
  //         setHasMore(!result.data.last);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

  useEffect(() => {
    getFollowings();
  }, []);

  // const handleScroll = () => {
  //   if (loading || !hasMore) return;

  //   const scrollTop = document.documentElement.scrollTop;
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   const clientHeight = document.documentElement.clientHeight;

  //   // Check if near the bottom (adjust the threshold as needed)
  //   if (scrollHeight - scrollTop <= clientHeight + 400) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 &&
      hasMore &&
      !loading
    ) {
      console.log(page);
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Attach and detach scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, page]);

  return (
    <div className="ml-96">
      <div className="mt-5 flex w-[70%]">
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

            <NewsFeed
              page={page}
              setHasMore={setHasMore}
              loading={loading}
              setLoading={setLoading}
            />
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
    </div>
  );
};
