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
      <div className="mt-5 flex w-[100%]">
        <div className="flex justify-center w-full px-10">
          <div className="max-w-3xl container mx-auto">
            <div
              onClick={() => openModal(user ? user.id : null)}
              className="flex space-x-2 border rounded-md justify-start w-full"
            >
              <StoryCircle
                userAvatar={user?.profileAvatar}
                userProfileName={user?.profileName}
              />
            </div>
            <div className="container space-y-4 mx-auto w-[80%] mt-5">
              {[1, 1, 1].map((item) => (
                <PostCard />
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
        onClose={closeModal}
        authorId={selectedStory}
      />
    </div>
  );
};
