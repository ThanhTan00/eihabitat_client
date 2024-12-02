import { useEffect, useState } from "react";
import { Post } from "../../../../Model/Post";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { getNewsFeedPosts } from "../../../../API/PostApi";
import { PostCard } from "./PostCard";
import { CommentModal } from "../Comment/CommentModal";
import { PAUSE } from "redux-persist";

interface Props {
  page: number | undefined;
  setHasMore: (hasmore: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const NewsFeed = ({ page, setHasMore, loading, setLoading }: Props) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const getNewsFeed = async (currentPage: number | undefined) => {
    if (loading) return;
    console.log(page);
    try {
      setLoading(true);
      if (token) {
        const result = await getNewsFeedPosts(token, user?.id, currentPage, 4);
        if (result.code === 1000) {
          setPosts((prev) => [...prev, ...result.data.content]);
          setHasMore(!result.data.last);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
    getNewsFeed(page);
  }, [page]);
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
