import { TbCircleDashed } from "react-icons/tb";
import { User } from "../../../../Model/User";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FollowerModal } from "./FollowerModal";
import { FollowingModal } from "./FollowingModal";
import { faAngleDown, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../Store/store";
import { logoutUser } from "../../../../Store/Slices/AuthSlice";
import { showToastMessage } from "../../../../Toast/CustomToast";
import { SignoutConfirmModal } from "../ComfirmationModal/SignoutConfirmModal";
import { followUser } from "../../../../API/UserApi";

type Props = {
  hostUser: User | null;
  numberOfPosts: number | undefined;
};

export const ProfileUserDetails = ({ hostUser, numberOfPosts }: Props) => {
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(hostUser?.followedByMe);
  const dispatch = useDispatch<AppDispatch>();
  const { token, user } = useSelector((state: RootState) => state.auth);

  const openFollowerModal = () => {
    if (hostUser) {
      setSelectedUser(hostUser?.profileName);
      setIsFollowerModalOpen(true);
    }
  };

  const closeFollowerModal = () => {
    setSelectedUser(null);
    setIsFollowerModalOpen(false);
  };

  const openFollowingModal = () => {
    if (hostUser) {
      setSelectedUser(hostUser?.profileName);
      setIsFollowingModalOpen(true);
    }
  };

  const closeFollowingModal = () => {
    setSelectedUser(null);
    setIsFollowingModalOpen(false);
  };

  const openSignOutModal = () => {
    setIsSignOutModalOpen(true);
  };

  const closeSignOutModal = () => {
    setIsSignOutModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      const auth = await dispatch(logoutUser({ token: token }) as any);
      showToastMessage(
        "Logout successfully! You are navigated to sign in page",
        "success"
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsFollowing(hostUser?.followedByMe)
    //console.log(isFollowing)
  }, [hostUser])

  const handleFollowUser = async () => {

    if (token && hostUser?.id && user?.id) {
      const followUserResponse = await followUser(token, {
        followedId: hostUser?.id,
        followerId: user?.id,
      });
      if (followUserResponse.code === 1000) {
        showToastMessage(
          "You followed "+hostUser.profileName,
          "info"
        );
        setIsFollowing(true)
      }
    }
  };
  return (
    <div className="py-10 px-10 w-[80%]">
      <div className="flex items-center justify-center space-x-5">
        <div className="min-w-48 px-4">
          <img
            className="w-40 h-40 rounded-full"
            src={hostUser?.profileAvatar}
            alt=""
          />
        </div>
        <div className="space-y-4">
          <div className="flex space-x-6 items-center">
            <p className="font-semibold">{hostUser?.profileName}</p>
            {hostUser?.profileName === user?.profileName ? (
              <div className="flex space-x-2">
                <Link
                  to={"/edit-profile"}
                  className="bg-[#0C5083] hover:bg-[#143D5C] px-5 py-1 text-white p-2 duration-300 rounded-md"
                >
                  Edit Profile
                </Link>
                <button
                  onClick={openSignOutModal}
                  className="bg-[#EBE4D8] hover:bg-[#D6C7AD] px-5 py-1 duration-300 rounded-md"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                {isFollowing ? (
                  <div className="flex space-x-2">
                    <button className="bg-[#0C5083] hover:bg-[#143D5C] px-5 py-1 text-white p-2 duration-300 rounded-md">
                      Following{" "}
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        className="ml-2"
                        size="xs"
                      />
                    </button>
                    <button className="bg-[#EBE4D8] hover:bg-[#D6C7AD] px-5 py-1 duration-300 rounded-md">
                      Message
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button onClick={handleFollowUser} className="bg-[#0C5083] hover:bg-[#143D5C] px-5 py-1 text-white p-2 duration-300 rounded-md">
                      Follow {hostUser?.followMe ? "back" : ""}
                    </button>
                    <button className="bg-[#EBE4D8] hover:bg-[#D6C7AD] px-5 py-1 duration-300 rounded-md">
                      Message
                    </button>
                  </div>
                )}
              </>
            )}

            <FontAwesomeIcon
              icon={faEllipsis}
              className="ml-2 cursor-pointer"
              size="xl"
            />
          </div>
          <div className="flex space-x-10">
            <div>
              <span className="font-semibold mr-2">{numberOfPosts}</span>
              <span>posts</span>
            </div>
            <div onClick={openFollowerModal} className="cursor-pointer">
              <span className="font-semibold mr-2">{hostUser?.followers}</span>
              <span>followers</span>
            </div>
            <div onClick={openFollowingModal} className="cursor-pointer">
              <span className="font-semibold mr-2">{hostUser?.following}</span>
              <span>following</span>
            </div>
          </div>
          <div className="max-w-80">
            <p className="font-semibold">
              {hostUser?.firstName + " " + hostUser?.lastName}
            </p>
            <p style={{ whiteSpace: "pre-line" }} className="font-thin text-sm">
              {hostUser?.bio}
            </p>
          </div>
        </div>
      </div>
      <FollowerModal
        isOpen={isFollowerModalOpen}
        onClose={closeFollowerModal}
        userProfileName={selectedUser}
      />
      <FollowingModal
        isOpen={isFollowingModalOpen}
        onClose={closeFollowingModal}
        userProfileName={selectedUser}
      />
      <SignoutConfirmModal
        isOpen={isSignOutModalOpen}
        onClose={closeSignOutModal}
        handleLogout={handleLogout}
      />
    </div>
  );
};
