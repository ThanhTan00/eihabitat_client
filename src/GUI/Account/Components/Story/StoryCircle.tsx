interface Props {
  userAvatar: string | undefined;
  userProfileName: string | undefined;
}

export const StoryCircle = ({ userAvatar, userProfileName }: Props) => {
  return (
    <div className="flex flex-col items-center cursor-pointer">
      <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500">
        <div className="w-full h-full rounded-full bg-white p-0.5">
          <img
            className="w-full h-full rounded-full object-cover"
            src={userAvatar}
            alt="Story"
          />
        </div>
      </div>
      <span className="text-sm mt-1">{userProfileName}</span>
    </div>
  );
};
