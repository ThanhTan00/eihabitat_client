interface Props {
  userId: string | undefined;
  userAvatar: string | undefined;
  userProfileName: string | undefined;
  openStoryModal: (authorId: string | undefined) => void;
}

export const StoryCircle = ({
  userId,
  userProfileName,
  userAvatar,
  openStoryModal,
}: Props) => {
  return (
    <div
      onClick={() => openStoryModal(userId)}
      className="flex flex-col items-center cursor-pointer"
    >
      <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500">
        <div className="w-full h-full rounded-full bg-white p-0.5">
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
  );
};
