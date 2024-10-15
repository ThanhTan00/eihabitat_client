import { TbCircleDashed } from "react-icons/tb";
import { User } from "../../../../Model/User";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FollowerModal } from "./FollowerModal";
import { FollowingModal } from "./FollowingModal";

type Props = {
  user: User | null;
  numberOfPosts: number | undefined;
};

export const ProfileUserDetails = ({ user, numberOfPosts }: Props) => {
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const openFollowerModal = () => {
    if (user) {
      setSelectedUser(user?.profileName);
      setIsFollowerModalOpen(true);
    }
  };

  const closeFollowerModal = () => {
    setSelectedUser(null);
    setIsFollowerModalOpen(false);
  };

  const openFollowingModal = () => {
    if (user) {
      setSelectedUser(user?.profileName);
      setIsFollowingModalOpen(true);
    }
  };

  const closeFollowingModal = () => {
    setSelectedUser(null);
    setIsFollowingModalOpen(false);
  };

  return (
    <div className="py-10 px-10 w-[80%]">
      <div className="flex items-center justify-center space-x-5">
        <div className="min-w-48 px-4">
          <img
            className="w-40 h-40 rounded-full"
            src={user?.profileAvatar}
            alt=""
          />
        </div>
        <div className="space-y-4">
          <div className="flex space-x-10 items-center">
            <p>{user?.profileName}</p>
            <Link
              to={"/edit-profile"}
              className="hover:bg-[#083555] hover:text-white p-2 active:text-opacity-75 duration-300 rounded-md"
            >
              Edit Profile
            </Link>
            <TbCircleDashed />
          </div>
          <div className="flex space-x-10">
            <div>
              <span className="font-semibold mr-2">{numberOfPosts}</span>
              <span>posts</span>
            </div>
            <div onClick={openFollowerModal} className="cursor-pointer">
              <span className="font-semibold mr-2">{user?.followers}</span>
              <span>followers</span>
            </div>
            <div onClick={openFollowingModal} className="cursor-pointer">
              <span className="font-semibold mr-2">{user?.following}</span>
              <span>following</span>
            </div>
          </div>
          <div>
            <p className="font-semibold">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p style={{ whiteSpace: "pre-line" }} className="font-thin text-sm">
              {user?.bio}
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
    </div>
  );
};
