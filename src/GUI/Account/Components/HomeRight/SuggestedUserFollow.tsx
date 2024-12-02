import { Link } from "react-router-dom";
import { SuggestFollow } from "../../../../Model/User";
import { showToastMessage } from "../../../../Toast/CustomToast";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { followUser, unFollowUser } from "../../../../API/UserApi";
import { useState } from "react";

interface Props {
  userSuggested: SuggestFollow;
}

export const SuggestedUserFollow = ({ userSuggested }: Props) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const handleFollowUser = async () => {
    if (token && user?.id) {
      const followUserResponse = await followUser(token, {
        followedId: userSuggested?.id,
        followerId: user?.id,
      });
      if (followUserResponse.code === 1000) {
        showToastMessage("You followed " + userSuggested.profileName, "info");
        setIsFollowing(true);
      }
    }
  };

  const handleUnFollowUser = async () => {
    if (token && user?.id) {
      const unFollowUserResponse = await unFollowUser(token, {
        followedId: userSuggested?.id,
        followerId: user?.id,
      });
      if (unFollowUserResponse.code === 1000) {
        showToastMessage("You unfollowed " + userSuggested.profileName, "info");
        setIsFollowing(false);
      }
    }
  };

  return (
    <div className="flex justify-between items-center w-full py-2">
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full">
            <img
              className="w-full h-full rounded-full object-cover"
              src={userSuggested?.profileAvatar}
              alt="Story"
            />
          </div>
        </div>
        <div className="pl-4">
          <div className="flex justify-between items-end">
            <Link
              to={user ? userSuggested.userUrl : ""}
              className="font-semibold text-base hover:opacity-70 duration-200"
            >
              {userSuggested?.profileName}
            </Link>
          </div>
          {userSuggested.followedBy ? (
            <p className="font-thin text-xs opacity-80">
              Followed by {userSuggested.followedBy}
            </p>
          ) : (
            <p className="font-thin text-xs opacity-80">Followed you</p>
          )}
        </div>
      </div>
      {!isFollowing && (
        <p
          onClick={() => handleFollowUser()}
          className="text-xs font-semibold text-blue-500 hover:text-black cursor-pointer"
        >
          Follow
        </p>
      )}
      {isFollowing && (
        <p
          onClick={() => handleUnFollowUser()}
          className="text-xs font-semibold text-blue-500 hover:text-black cursor-pointer"
        >
          Following
        </p>
      )}
    </div>
  );
};
