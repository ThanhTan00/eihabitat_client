import { Link } from "react-router-dom";
import { Follower } from "../../../../Model/User";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { followUser, unFollowUser } from "../../../../API/UserApi";
import { showToastMessage } from "../../../../Toast/CustomToast";

interface userFollowingCardProps {
  following: Follower;
  isGuess: boolean;
  setLisFollowing: React.Dispatch<React.SetStateAction<Follower[] | undefined>>;
  setListFilterFollowing: React.Dispatch<
    React.SetStateAction<Follower[] | undefined>
  >;
}

export const UserFollowingCard = ({
  following,
  isGuess,
  setLisFollowing,
  setListFilterFollowing,
}: userFollowingCardProps) => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [isFollowedByMe, setIsFollowedByMe] = useState<boolean>(false);
  const [isFollowDropdown, setIsFollowDropdown] = useState<boolean>(false);

  const toggleFollowDropdown = () => {
    setIsFollowDropdown((prev) => !prev);
  };

  const handleFollowUser = async () => {
    if (token && user?.id) {
      const followUserResponse = await followUser(token, {
        followedId: following.id,
        followerId: user?.id,
      });
      if (followUserResponse.code === 1000) {
        setIsFollowedByMe(true);
        showToastMessage("You followed " + following.profileName, "info");
      }
    }
  };

  const handleUnFollowUser = async () => {
    if (token && user?.id) {
      const unFollowUserResponse = await unFollowUser(token, {
        followedId: following?.id,
        followerId: user?.id,
      });
      if (unFollowUserResponse.code === 1000) {
        showToastMessage("You unfollowed " + following.profileName, "info");
        setIsFollowedByMe(false);
      }
    }
  };

  useEffect(() => {
    if (following.followedByMe) {
      setIsFollowedByMe(true);
    }
  }, [following]);

  return (
    <div className="flex items-center py-2">
      <div className="flex flex-shrink-0 self-start cursor-pointer">
        <img
          src={following.profileAvatar}
          alt=""
          className="h-12 w-12 object-cover rounded-full"
        />
      </div>

      <div className="block">
        <div className="w-auto pl-3">
          <Link
            to={following.userUrl}
            className="hover:opacity-[50%] font-bold"
          >
            {following.profileName}
          </Link>
          <p className="text-sm text-gray-500">
            {following.firstName} {following.lastName}
          </p>
        </div>
      </div>
      <div className="ml-auto">
        {isFollowedByMe ? (
          <div className="relative">
            <button
              onClick={toggleFollowDropdown}
              type="button"
              className="font-medium rounded-lg text-sm px-5 py-2 bg-[#E4E4E4] hover:bg-[#EBE4D8]"
            >
              Following
            </button>
            {isFollowDropdown && (
              <div className="absolute top-0 right-[100px] w-32 bg-gray-100 rounded-md shadow-lg z-20">
                <button
                  className="block w-full px-4 py-2 text-gray-800 rounded-md hover:bg-[#EBE4D8]"
                  onClick={handleUnFollowUser}
                >
                  <FontAwesomeIcon
                    icon={faUserMinus}
                    className="mr-4"
                    size="xs"
                  />
                  Unfollow
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {following.profileName !== user?.profileName ? (
              <button
                onClick={handleFollowUser}
                type="submit"
                className="font-medium text-white rounded-lg text-sm px-5 py-2 bg-[#0C5083] hover:bg-[#143D5C]"
              >
                Follow
              </button>
            ) : (
              " "
            )}
          </>
        )}
      </div>
    </div>
  );
};
