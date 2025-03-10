import { useState } from "react";
import { StoryModal } from "./StoryModal";

interface Props {
  userId: string | undefined;
  userAvatar: string | undefined;
  userProfileName: string | undefined;
}

export const StoryCircle = ({ userId, userProfileName, userAvatar }: Props) => {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const openStoryModal = () => {
    setIsStoryModalOpen(true);
  };

  const closeStoryModal = () => {
    setIsStoryModalOpen(false);
  };
  return (
    <div>
      <div
        onClick={() => openStoryModal()}
        className="flex flex-col items-center cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 ">
          <div className="w-full h-full rounded-full bg-white p-0.5 hover:p-0 hover:scale-90">
            <img
              className="w-full h-full rounded-full object-cover"
              src={userAvatar}
              alt="Story"
            />
          </div>
        </div>
        <span className="text-xs mt-1 max-w-[60px] truncate">
          {userProfileName}
        </span>
      </div>
      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={closeStoryModal}
        authorId={userId}
      />
    </div>
  );
};
