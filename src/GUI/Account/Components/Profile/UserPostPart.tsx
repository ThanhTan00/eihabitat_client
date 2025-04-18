import { AiOutlineCamera, AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { RiVideoAddLine } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import { useEffect, useState } from "react";
import { UserPostCard } from "./UserPostCard";
import { PostOnPersonalWall } from "../../../../Model/Post";
import { CommentModal } from "../Comment/CommentModal";

type Props = {
  postList: PostOnPersonalWall[] | null;
};

export const UserPostPart = ({ postList }: Props) => {
  const [posts, setPost] = useState<PostOnPersonalWall[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const openModal = (postId: string) => {
    setSelectedPost(postId);
    setIsCommentModalOpen(true);
  };

  const closeModal = () => {
    setIsCommentModalOpen(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    if (postList) {
      setPost(
        postList?.sort(
          (a: PostOnPersonalWall, b: PostOnPersonalWall) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    }
  });

  return (
    <>
      <div className="min-h-[300px]">
        {postList?.length === 0 || postList === null ? (
          <div className="py-5 flex h-full w-full items-center justify-center">
            <div>
              <div className="flex items-center justify-center">
                <AiOutlineCamera className="text-[60px] text-gray-800 text-opacity-25" />
              </div>
              <p className="text-2xl font-bold text-gray-800 text-opacity-25">
                No Posts Yet
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {posts.map((post) => (
              <UserPostCard
                key={post.id}
                post={post}
                onClick={() => openModal(post.id)}
              />
            ))}
          </div>
        )}
      </div>
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={closeModal}
        selectedPost={selectedPost}
      />
    </>
  );
};
