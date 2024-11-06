import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Follower } from "../../../../Model/User";
import { getAllFollowings } from "../../../../API/UserApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { Link } from "react-router-dom";
import { UserFollowingCard } from "./UserFollowingCard";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfileName: string | null;
}

export const FollowingModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  userProfileName,
}) => {
  const [listFollowing, setLisFollowing] = useState<Follower[] | undefined>(
    undefined
  );
  const [listFilterFollowing, setListFilterFollowing] = useState<
    Follower[] | undefined
  >(undefined);
  const [isGuess, setIsGuess] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const getFollowers = async () => {
      if (accessToken) {
        const followers = await getAllFollowings(
          accessToken,
          userProfileName,
          user?.id
        );
        console.log(followers.data);
        setLisFollowing(followers.data);
        setListFilterFollowing(followers.data);
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
    setListFilterFollowing(
      listFollowing?.filter((follower) =>
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
            Followings
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
          {listFilterFollowing?.map((following) => (
            <UserFollowingCard
              following={following}
              isGuess={isGuess}
              setLisFollowing={setLisFollowing}
              setListFilterFollowing={setListFilterFollowing}
            />
          ))}
        </div>
      </ModalContent>
    </Modal>
  );
};
