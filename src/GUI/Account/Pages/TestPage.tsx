import { useState } from "react";
import { PostCreateModal } from "../Components";

export const TestPage = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);

  const openPostModal = () => {
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };
  return (
    <>
      <button
        type="button"
        className="w-full bg-purple-500 py-3 text-center text-white"
        onClick={openPostModal}
      >
        Create Post
      </button>
      <PostCreateModal isOpen={isPostModalOpen} onClose={closePostModal} />
    </>
  );
};
