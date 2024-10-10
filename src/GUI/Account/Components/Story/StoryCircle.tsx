interface Props {
  userAvatar: string | undefined;
  userProfileName: string | undefined;
}

export const StoryCircle = ({ userAvatar, userProfileName }: Props) => {
  return (
    <div className="cursor-pointer flex flex-col items-center">
      <img className="w-16 h-16 rounded-full" src={userAvatar} alt="" />
      <p>{userProfileName}</p>
    </div>
  );
};
