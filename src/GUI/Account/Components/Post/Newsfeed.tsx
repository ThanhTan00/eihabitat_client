import { useEffect, useState } from "react";
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

  const getNewsFeed = async () => {
    try {
      if (token) {
        const result = await getNewsFeedPosts(token, user?.id);
        if (result.code === 1000) {
          setPosts(result.data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
    getNewsFeed();
  }, []);
  return (
    <div className="container space-y-4 mx-auto min-w-[65%] mt-5">
      {isLoading && (
        <div className="w-full h-72">
          <Loading />
        </div>
      )}

      {isLoading || posts[0] ? (
        posts?.map((post) => (
          <PostCard post={post} openCommentModal={openCommentModal} />
        ))
      ) : (
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
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={closeCommentModal}
        selectedPost={selectedPost}
      />
    </div>
  );
};
