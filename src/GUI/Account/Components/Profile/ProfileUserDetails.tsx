import { TbCircleDashed } from "react-icons/tb";
import { User } from "../../../../Model/User";
import { Link } from "react-router-dom";

type Props = {
  user: User | null;
};

export const ProfileUserDetails = ({ user }: Props) => {
  return (
    <div className="py-10 w-full">
      <div className="flex items-center justify-center">
        <div className="w-[15%]">
          <img
            className="w-32 h-32 rounded-full"
            src={user?.profileAvatar}
            alt=""
          />
        </div>
        <div className="space-y-5">
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
              <span className="font-semibold mr-2">10</span>
              <span>posts</span>
            </div>
            <div>
              <span className="font-semibold mr-2">5</span>
              <span>followers</span>
            </div>
            <div>
              <span className="font-semibold mr-2">7</span>
              <span>following</span>
            </div>
          </div>
          <div>
            <p className="font-semibold">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="font-thin text-sm">{user?.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
