import { useEffect, useState } from "react";
import { Post } from "../../../../Model/Post";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { getNewsFeedPosts } from "../../../../API/PostApi";
import { PostCard } from "./PostCard";
import { CommentModal } from "../Comment/CommentModal";
import { PAUSE } from "redux-persist";

export const NewsFeed = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
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
    <div className="container space-y-4 mx-auto w-[65%] mt-5">
      {posts?.map((post) => (
        <PostCard post={post} openCommentModal={openCommentModal} />
      ))}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={closeCommentModal}
        selectedPost={selectedPost}
      />
    </div>
  );
};
