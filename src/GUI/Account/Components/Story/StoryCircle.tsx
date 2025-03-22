import { useState } from "react";
import { StoryModal } from "./StoryModal";
import { FollowingNewStory } from "../../../../Model/Story";
import { seenStory } from "../../../../API/StoryAPI";
import { RootState } from "../../../../Store/store";
import { useSelector } from "react-redux";

interface Props {
  followingNewStory: FollowingNewStory;
}

export const StoryCircle = ({ followingNewStory }: Props) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isNew, setIsNew] = useState<boolean>(followingNewStory.newStory);

  const openStoryModal = () => {
    setIsStoryModalOpen(true);
    setIsNew(false);
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
        <div
          className={`${
            isNew
              ? "bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"
              : "bg-gray-500"
          } w-16 h-16 rounded-full p-0.5 `}
        >
          <div className="w-full h-full rounded-full bg-white p-0.5 hover:p-0 hover:scale-90">
            <img
              className="w-full h-full rounded-full object-cover"
              src={followingNewStory.authorAvatar}
              alt="Story"
            />
          </div>
        </div>
        <span className="text-xs mt-1 max-w-[60px] truncate">
          {followingNewStory.authorName}
        </span>
      </div>
      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={closeStoryModal}
        authorId={followingNewStory.authorId}
      />
    </div>
  );
};
