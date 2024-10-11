import {
  Modal,
  ModalContent,
  ModalOverlay,
  useStatStyles,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Follower } from "../../../../Model/User";
import { getAllFollowers } from "../../../../API/UserApi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfileName: string | null;
}

export const FollowModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  userProfileName,
}) => {
  const [listFollower, setLisFollower] = useState<Follower[] | null>(null);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const getFollowers = async () => {
      if (accessToken) {
        const followers = await getAllFollowers(accessToken, userProfileName);
        setLisFollower(followers.data);
        console.log(followers.data);
      }
    };

    getFollowers();
  }, [userProfileName]);
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent className="h-4/6 w-64">
      <div className="">
        <div className="flex justify-around items-center p-4 text-lg font-semibold">
            Followers
        </div>
        <hr className="p-1"/>
      </div>
        <form className="w-full pl-3 pr-3 pb-3">
          <label
            htmlFor="searchFollower"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
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
              type="search"
              id="searchFollower"
              className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:outline-none bg-[#EBE4D8]"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 bg-[#A58751] hover:scale-105 duration-300"
            >
              Search
            </button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};
