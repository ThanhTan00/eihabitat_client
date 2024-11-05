import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Follower } from "../../../../Model/User";
import { getAllFollowers } from "../../../../API/UserApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfileName: string | null;
}

export const FollowerModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  userProfileName,
}) => {
  const [listFollower, setLisFollower] = useState<Follower[] | undefined>(
    undefined
  );
  const [listFilterFollower, setListFilterFollower] = useState<
    Follower[] | undefined
  >(undefined);
  const [isGuess, setIsGuess] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const getFollowers = async () => {
      if (accessToken) {
        const followers = await getAllFollowers(
          accessToken,
          userProfileName,
          user?.id
        );
        setLisFollower(followers.data);
        setListFilterFollower(followers.data);
        if (user && userProfileName !== user.profileName) {
          setIsGuess(true);
        } else {
          setIsGuess(false);
        }
      }
    };
    setFilter("");
    getFollowers();
  }, [userProfileName]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    setListFilterFollower(
      listFollower?.filter((follower) =>
        follower.profileName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent className="h-96 w-64">
        <div className="">
          <div className="flex justify-around items-center p-4 text-lg font-semibold">
            Followers
          </div>
          <hr className="p-1" />
        </div>
        <div className="w-full pl-3 pr-3 pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              value={filter}
              onChange={handleFilter}
              className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:outline-none bg-[#EBE4D8]"
              placeholder="Profile name"
            />
          </div>
        </div>
        <div className="px-4 h-full overflow-y-auto">
          {listFilterFollower?.map((follower) => (
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
                    <span className="hover:opacity-[50%] font-bold">
                      {follower.profileName}
                    </span>
                    {!follower.followedByMe && !isGuess ? (
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
                        <span className="text-sm font-semibold text-blue-500 hover:text-black cursor-pointer">
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
                      {follower.followedByMe ? (
                        <button
                          type="submit"
                          className="font-medium rounded-lg text-sm px-5 py-2 bg-[#E4E4E4] hover:bg-[#EBE4D8]"
                        >
                          Following
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="font-medium text-white rounded-lg text-sm px-5 py-2 bg-[#0C5083] hover:bg-[#143D5C]"
                        >
                          Follow
                        </button>
                      )}
                    </>
                  )
                ) : (
                  <button
                    type="submit"
                    className="font-medium rounded-lg text-sm px-5 py-2 bg-[#E4E4E4] hover:bg-[#EBE4D8]"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </ModalContent>
    </Modal>
  );
};
