import { useCallback, useEffect, useRef, useState } from "react";
import { Post } from "../../../../Model/Post";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { getNewsFeedPosts } from "../../../../API/PostApi";
import { PostCard } from "./PostCard";
import { CommentModal } from "../Comment/CommentModal";
import { PAUSE } from "redux-persist";
import { Loading } from "../Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

export const NewsFeed = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const getNewsFeed = useCallback(async () => {
    if (!token || !hasMore) return;
    setIsLoading(true);

    try {
      const result = await getNewsFeedPosts(token, user?.id, page);
      console.log(result);
      if (result.code === 1000) {
        setPosts((prevPosts) => [...prevPosts, ...result.data.content]);
        if (result.data.last) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [token, user?.id, page, hasMore]);

  const openCommentModal = (postId: string) => {
    setSelectedPost(postId);
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    getNewsFeed();
  }, [page]);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore]);
  return (
    <div className="container space-y-4 mx-auto min-w-[65%] mt-5">
      {posts.length === 0 && !isLoading && (
        <div className="w-full p-20">
          <div className="flex justify-center items-center w-full py-4">
            <p className="text-gray-500">
              <FontAwesomeIcon icon={faImages} className="mr-2 text-6xl" />
            </p>
          </div>
          <div className="flex justify-center items-center w-full">
            <p className="text-gray-500 font-bold text-2xl">NO POSTS FOUND</p>
          </div>
          <div className="flex justify-center items-center w-full">
            <p className="text-gray-500 font-semibold">
              Follow other users to see their posts.
            </p>
          </div>
        </div>
      )}

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          openCommentModal={openCommentModal}
        />
      ))}

      {isLoading && (
        <div className="w-full h-20 flex justify-center items-center">
          <Loading />
        </div>
      )}

      <div ref={observerRef} className="w-full h-10" />

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={closeCommentModal}
        selectedPost={selectedPost}
      />
    </div>
  );
};
