import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import { HomeRight, PostCard, StoryCircle, StoryModal } from "../Components";
import { useState } from "react";

export const HomePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  const openModal = (authorId: string | null) => {
    setSelectedStory(authorId);
    setIsStoryModalOpen(true);
  };

  const closeModal = () => {
    setIsStoryModalOpen(false);
    setSelectedStory(null);
  };
  return (
    <div>
      <div className="mt-10 flex w-[100%]">
        <div className="w-[60%] px-10">
          <div className="container mx-auto">
            <div
              onClick={() => openModal(user ? user.id : null)}
              className="storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full"
            >
              <StoryCircle
                userAvatar={user?.profileAvatar}
                userProfileName={user?.profileName}
              />
            </div>
            <div className="container space-y-3 mx-auto w-[60%] mt-10">
              {[1, 1, 1].map((item) => (
                <PostCard />
              ))}
            </div>
          </div>
        </div>
        <div>
          <HomeRight />
        </div>
      </div>
      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={closeModal}
        authorId={selectedStory}
      />
    </div>
  );
};
