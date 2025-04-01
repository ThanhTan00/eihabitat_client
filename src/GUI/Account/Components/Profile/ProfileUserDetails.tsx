import { TbCircleDashed } from "react-icons/tb";
import { User } from "../../../../Model/User";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FollowerModal } from "./FollowerModal";
import {
  faAngleDown,
  faEllipsis,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../Store/store";
import { logoutUser } from "../../../../Store/Slices/AuthSlice";
import { showToastMessage } from "../../../../Toast/CustomToast";
import { SignoutConfirmModal } from "../ComfirmationModal/SignoutConfirmModal";
import { followUser, unFollowUser } from "../../../../API/UserApi";
import Picker from "@emoji-mart/react";
import { FollowingModal } from "./FollowingModal";
import { BsEmojiSmile } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { addMessage } from "../../../../API/PostApi";

type Props = {
  hostUser: User | null;
  numberOfPosts: number | undefined;
};
interface formFields {
  content: string;
  recipientId: string;
  senderId: string;
}

export const ProfileUserDetails = ({ hostUser, numberOfPosts }: Props) => {
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isFollowDropdown, setIsFollowDropdown] = useState<boolean>(false);
  const [isChatModelOpen, setIsChatModelOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(false);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const navigate = useNavigate();
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

  const toggleFollowDropdown = () => {
    setIsFollowDropdown((prev) => !prev);
  };

  const toggleChatModel = () => {
    setIsChatModelOpen((prev) => !prev);
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

  const handleFollowUser = async () => {
    if (token && hostUser?.id && user?.id) {
      const followUserResponse = await followUser(token, {
        followedId: hostUser?.id,
        followerId: user?.id,
      });
      if (followUserResponse.code === 1000) {
        showToastMessage("You followed " + hostUser.profileName, "info");
        setIsFollowing(true);
      }
    }
  };

  const handleUnFollowUser = async () => {
    if (token && hostUser?.id && user?.id) {
      const unFollowUserResponse = await unFollowUser(token, {
        followedId: hostUser?.id,
        followerId: user?.id,
      });
      if (unFollowUserResponse.code === 1000) {
        showToastMessage("You unfollowed " + hostUser.profileName, "info");
        setIsFollowing(false);
      }
    }
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>({
    mode: "all",
  });

  const onSubmit = async () => {
    try {
      if (token && user && hostUser) {
        const addNewMessage = await addMessage(token, {
          content: input,
          recipientId: hostUser?.id,
          senderId: user?.id,
        });
        if (addNewMessage.code === 1000) {
          showToastMessage("message sent", "success");
        }
      }
    } catch (error) {
      showToastMessage("Something went wrong, try again later", "error");
    } finally {
      setInput("");
      setIsChatModelOpen(false);
      setShowEmojiPicker(false);
    }
  };
  const handleEmojiSelect = (emoji: any) => {
    setInput(input + emoji.native);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    setIsFollowing(hostUser?.followedByMe);
    closeFollowerModal();
    closeFollowingModal();
    closeSignOutModal();
  }, [hostUser]);

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
        <div className="space-y-2">
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
                  <div className="relative flex space-x-2">
                    <button
                      onClick={toggleFollowDropdown}
                      className="min-w-36 bg-[#0C5083] hover:bg-[#143D5C] px-5 py-1 text-white p-2 duration-300 rounded-md"
                    >
                      Following{" "}
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        className="ml-2"
                        size="xs"
                      />
                    </button>
                    {isFollowDropdown && (
                      <div className="absolute right-0 top-[35px] w-48 bg-gray-100 rounded-md shadow-lg z-20">
                        <div
                          onClick={handleUnFollowUser}
                          className="w-full block px-4 py-2 text-gray-800 hover:bg-[#EBE4D8]"
                        >
                          <FontAwesomeIcon
                            icon={faUserMinus}
                            className="mr-4"
                            size="xs"
                          />
                          Unfollow
                        </div>
                        <div className="block px-4 py-2 text-gray-800 hover:bg-[#EBE4D8] cursor-pointer">
                          Mute
                        </div>
                        <div className="block px-4 py-2 text-gray-800 hover:bg-[#EBE4D8] cursor-pointer">
                          Block
                        </div>
                      </div>
                    )}
                    <div className="relative">
                      <button
                        onClick={toggleChatModel}
                        className="bg-[#EBE4D8] hover:bg-[#D6C7AD] px-5 py-1 duration-300 rounded-md"
                      >
                        Message
                      </button>
                      {isChatModelOpen && (
                        <div className="absolute mt-2 p-3 top-[100%] z-10 w-72 h-56 bg-white rounded-xl shadow-[2px_2px_10px_5px_rgba(0,_0,_0,_0.1)]">
                          <div className="flex justify-center w-full">
                            <div className="text-center">
                              <img
                                src={hostUser?.profileAvatar}
                                width={150}
                                className="h-32 w-32 rounded-full"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="w-full text-center text-md font-bold">
                            {hostUser?.firstName + " " + hostUser?.lastName}
                          </div>
                          <div className="absolute bottom-0 left-0 z-10 bg-white w-full flex items-center w-full px-2 my-2 rounded-lg">
                            {/* Smile icon */}
                            <span className="absolute left-4 text-gray-500">
                              <BsEmojiSmile
                                onClick={() =>
                                  setShowEmojiPicker(!showEmojiPicker)
                                }
                                className="mr-3 text-xl cursor-pointer"
                              />
                              {showEmojiPicker && (
                                <div className="absolute top-[100%] mt-3">
                                  <Picker onEmojiSelect={handleEmojiSelect} />
                                </div>
                              )}
                            </span>

                            <form
                              className="flex w-full"
                              onSubmit={handleSubmit(onSubmit)}
                            >
                              <input
                                type="text"
                                placeholder="Message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full py-1  pl-10 pr-4 text-gray-700 bg-white border rounded-full shadow-sm focus:outline-none focus:ring focus:ring-blue-200 border-gray-300"
                              />
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleFollowUser}
                      className="bg-[#0C5083] hover:bg-[#143D5C] px-5 py-1 text-white p-2 duration-300 rounded-md"
                    >
                      Follow {hostUser?.followMe ? "back" : ""}
                    </button>
                    <div className="relative">
                      <button
                        onClick={toggleChatModel}
                        className="bg-[#EBE4D8] hover:bg-[#D6C7AD] px-5 py-1 duration-300 rounded-md"
                      >
                        Message
                      </button>
                      {isChatModelOpen && (
                        <div className="absolute mt-2 p-3 top-[100%] z-10 w-72 h-56 bg-white rounded-xl shadow-[2px_2px_10px_5px_rgba(0,_0,_0,_0.1)]">
                          <div className="flex justify-center w-full">
                            <div className="text-center">
                              <img
                                src={hostUser?.profileAvatar}
                                width={150}
                                className="h-32 w-32 rounded-full"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="w-full text-center text-md font-bold">
                            {hostUser?.firstName + " " + hostUser?.lastName}
                          </div>
                          <div className="absolute bottom-0 left-0 z-10 bg-white w-full flex items-center w-full px-2 my-2 rounded-lg">
                            {/* Smile icon */}
                            <span className="absolute left-4 text-gray-500">
                              <BsEmojiSmile
                                onClick={() =>
                                  setShowEmojiPicker(!showEmojiPicker)
                                }
                                className="mr-3 text-xl cursor-pointer"
                              />
                              {showEmojiPicker && (
                                <div className="absolute top-[100%] mt-3">
                                  <Picker onEmojiSelect={handleEmojiSelect} />
                                </div>
                              )}
                            </span>

                            <form
                              className="flex w-full"
                              onSubmit={handleSubmit(onSubmit)}
                            >
                              <input
                                type="text"
                                placeholder="Message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full py-1  pl-10 pr-4 text-gray-700 bg-white border rounded-full shadow-sm focus:outline-none focus:ring focus:ring-blue-200 border-gray-300"
                              />
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
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
          <div className="max-w-90">
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
