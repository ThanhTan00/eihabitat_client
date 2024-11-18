import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Follower } from "../../../../Model/User";
import {
  followUser,
  getAllFollowers,
  unFollowUser,
} from "../../../../API/UserApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showToastMessage } from "../../../../Toast/CustomToast";
import { UserFollowerCard } from "./UserFollowerCard";

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
  const [filter, setFilter] = useState<string>("");
  const { user, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const getFollowers = async () => {
      if (token) {
        const followers = await getAllFollowers(
          token,
          userProfileName,
          user?.id
        );
        //console.log(followers.data);
        setLisFollower(followers.data);
        setListFilterFollower(followers.data);
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
            <UserFollowerCard
              follower={follower}
              isGuess={userProfileName !== user?.profileName}
              setLisFollower={setLisFollower}
              setListFilterFollower={setListFilterFollower}
            />
          ))}
        </div>
      </ModalContent>
    </Modal>
  );
};
