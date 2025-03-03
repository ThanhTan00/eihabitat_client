import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../Store/store";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../Store/Slices/AuthSlice";
import { showToastMessage } from "../../../../Toast/CustomToast";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  suggestFollow,
  suggestFollowByFollowedMe,
} from "../../../../API/UserApi";
import { SuggestFollow } from "../../../../Model/User";
import { SuggestedUserFollow } from "./SuggestedUserFollow";

export const HomeRight = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestFollow[]>([]);
  const [followedMe, setFollowedMe] = useState<SuggestFollow[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    try {
      const auth = await dispatch(logoutUser({ token: token }) as any);
      //const result = auth.payload;
    } catch (error) {
      console.log(error);
      showToastMessage("email or password in correct", "error");
    }
  };

  const getSuggestFollow = async () => {
    try {
      if (token && user) {
        const suggested = await suggestFollow(token, user?.id);
        setSuggestedUsers(suggested.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSuggestFollowByFollowedMe = async () => {
    try {
      if (token && user) {
        const suggested = await suggestFollowByFollowedMe(token, user?.id);
        setFollowedMe(suggested.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSuggestFollow();
    getSuggestFollowByFollowedMe();
  }, []);

  return (
    <div className="w-80 h-[100vh]">
      <div className="flex justify-between items-center w-full py-2">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full">
              <img
                className="w-full h-full rounded-full object-cover"
                src={user?.profileAvatar}
                alt="Story"
              />
            </div>
          </div>
          <div className="pl-4">
            <div className="flex justify-between items-end">
              <Link
                to={user ? user.userUrl : ""}
                className="font-semibold text-base hover:opacity-70 duration-200"
              >
                {user?.profileName}
              </Link>
            </div>
            <p className="font-thin text-sm">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
        </div>
        <p
          onClick={async () => {
            await handleLogout();
          }}
          className="text-sm font-semibold text-blue-500 hover:text-black cursor-pointer"
        >
          Sign out
        </p>
      </div>

      <div className="pt-4 space-y-2">
        <div className="flex justify-between items-center mb-4">
          <p className="text-md font-bold text opacity-50"> You may know</p>
          <p className="text-xs font-semibold hover:text-black cursor-pointer hover:opacity-50">
            See all
          </p>
        </div>

        {followedMe?.map((suggested) => (
          <SuggestedUserFollow userSuggested={suggested} />
        ))}
      </div>

      <div className="pt-4 space-y-2">
        <div className="flex justify-between items-center mb-4">
          <p className="text-md font-bold text opacity-50">
            {" "}
            Suggested for you
          </p>
          <p className="text-xs font-semibold hover:text-black cursor-pointer hover:opacity-50">
            See all
          </p>
        </div>

        {suggestedUsers?.map((suggested) => (
          <SuggestedUserFollow userSuggested={suggested} />
        ))}
      </div>

      <div className="my-8">
        <ul className="flex flex-wrap justify-center text-gray-500 text-xs">
          <li className="flex">
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
                <circle cx="12" cy="12" r="2" fill="#c7c2c2"></circle>{" "}
              </g>
            </svg>
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
          <li className="flex">
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
                <circle cx="12" cy="12" r="2" fill="#c7c2c2"></circle>{" "}
              </g>
            </svg>
            <a href="#" className="hover:underline">
              Help
            </a>
          </li>
          <li className="flex">
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
                <circle cx="12" cy="12" r="2" fill="#c7c2c2"></circle>{" "}
              </g>
            </svg>
            <a href="#" className="hover:underline">
              Press
            </a>
          </li>
          <li className="flex">
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
                <circle cx="12" cy="12" r="2" fill="#c7c2c2"></circle>{" "}
              </g>
            </svg>
            <a href="#" className="hover:underline">
              API
            </a>
          </li>
          <li className="flex">
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
                <circle cx="12" cy="12" r="2" fill="#c7c2c2"></circle>{" "}
              </g>
            </svg>
            <a href="#" className="hover:underline">
              Jobs
            </a>
          </li>
          <li className="flex">
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
                <circle cx="12" cy="12" r="2" fill="#c7c2c2"></circle>{" "}
              </g>
            </svg>
            <a href="#" className="hover:underline">
              Privacy
            </a>
          </li>
          <li className="flex">
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
                <circle cx="12" cy="12" r="2" fill="#c7c2c2"></circle>{" "}
              </g>
            </svg>
            <a href="#" className="hover:underline">
              Terms
            </a>
          </li>
          <li className="flex">
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
                <circle cx="12" cy="12" r="2" fill="#c7c2c2"></circle>{" "}
              </g>
            </svg>
            <a href="#" className="hover:underline">
              Locations
            </a>
          </li>
          <li className="flex">
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
                <circle cx="12" cy="12" r="2" fill="#c7c2c2"></circle>{" "}
              </g>
            </svg>
            <a href="#" className="hover:underline">
              Language
            </a>
          </li>
          <li className="flex">
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
                <circle cx="12" cy="12" r="2" fill="#c7c2c2"></circle>{" "}
              </g>
            </svg>
            <a href="#" className="hover:underline">
              Meta Verified
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
