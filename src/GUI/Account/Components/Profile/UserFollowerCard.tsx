import { useSelector } from "react-redux";
import { Follower } from "../../../../Model/User";
import { RootState } from "../../../../Store/store";
import { useEffect, useState } from "react";
import { followUser, unFollowUser } from "../../../../API/UserApi";
import { showToastMessage } from "../../../../Toast/CustomToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface userFollowerCardProps {
  follower: Follower;
  isGuess: boolean;
  setLisFollower: React.Dispatch<React.SetStateAction<Follower[] | undefined>>;
  setListFilterFollower: React.Dispatch<
    React.SetStateAction<Follower[] | undefined>
  >;
}

export const UserFollowerCard = ({
  follower,
  isGuess,
  setLisFollower,
  setListFilterFollower,
}: userFollowerCardProps) => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [isFollowedByMe, setIsFollowedByMe] = useState<boolean>(false);
  const [isFollowDropdown, setIsFollowDropdown] = useState<boolean>(false);

  const handleRemoveFollower = async () => {
    if (token && user?.id) {
      const unFollowUserResponse = await unFollowUser(token, {
        followedId: user?.id,
        followerId: follower.id,
      });
      if (unFollowUserResponse.code === 1000) {
        showToastMessage("Remove follower " + follower.profileName, "info");
        setLisFollower((prevFollowers) =>
          prevFollowers?.filter(
            (followerState) => followerState.id !== follower.id
          )
        );
        setListFilterFollower((prevFollowers) =>
          prevFollowers?.filter(
            (followerState) => followerState.id !== follower.id
          )
        );
      }
    }
  };

  const handleFollowUser = async () => {
    if (token && user?.id) {
      const followUserResponse = await followUser(token, {
        followedId: follower.id,
        followerId: user?.id,
      });
      if (followUserResponse.code === 1000) {
        setIsFollowedByMe(true);
        showToastMessage("You followed " + follower.profileName, "info");
      }
    }
  };

  const handleUnFollowUser = async () => {
    if (token && user?.id) {
      const unFollowUserResponse = await unFollowUser(token, {
        followedId: follower?.id,
        followerId: user?.id,
      });
      if (unFollowUserResponse.code === 1000) {
        showToastMessage("You unfollowed " + follower.profileName, "info");
        setIsFollowedByMe(false);
      }
    }
  };

  const toggleFollowDropdown = () => {
    setIsFollowDropdown((prev) => !prev);
  };

  useEffect(() => {
    if (follower.followedByMe) {
      setIsFollowedByMe(true);
    }
    setIsFollowDropdown(false);
  }, [follower]);

  return (
    <div className="flex items-center py-2">
      <div className="flex flex-shrink-0 self-start cursor-pointer">
        <img
          src={follower.profileAvatar}
          alt=""
          className="h-12 w-12 object-cover rounded-full"
        />
      </div>

      <div className="block">
        <div className="w-auto pl-3">
          <p className="flex items-center">
            <Link
              to={follower.userUrl}
              className="hover:opacity-[50%] font-bold"
            >
              {follower.profileName}
            </Link>
            {!isFollowedByMe && !isGuess ? (
              <>
                <span>
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ece4e4"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <circle
                        cx="12"
                        cy="12"
                        r="2"
                        fill="#c7c2c2"
                      ></circle>{" "}
                    </g>
                  </svg>
                </span>
                <span
                  onClick={async () => {
                    await handleFollowUser();
                  }}
                  className="text-sm font-semibold text-blue-500 hover:text-black cursor-pointer"
                >
                  Follow
                </span>
              </>
            ) : (
              ""
            )}
          </p>
          <p className="text-sm text-gray-500">
            {follower.firstName} {follower.lastName}
          </p>
        </div>
      </div>
      <div className="ml-auto">
        {isGuess ? (
          user?.profileName === follower.profileName ? (
            ""
          ) : (
            <>
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
                <button
                  type="button"
                  onClick={handleFollowUser}
                  className="font-medium text-white rounded-lg text-sm px-5 py-2 bg-[#0C5083] hover:bg-[#143D5C]"
                >
                  Follow
                </button>
              )}
            </>
          )
        ) : (
          <button
            type="button"
            onClick={async () => {
              await handleRemoveFollower();
            }}
            className="font-medium rounded-lg text-sm px-5 py-2 bg-[#E4E4E4] hover:bg-[#EBE4D8]"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};
