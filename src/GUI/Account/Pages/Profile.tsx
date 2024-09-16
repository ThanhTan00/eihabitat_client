import { useSelector } from "react-redux";
import { ProfileUserDetails, UserPostPart } from "../Components";
import { RootState } from "../../../Store/store";
import { useEffect, useState } from "react";
import { User } from "../../../Model/User";
import { getUserInfo } from "../../../API/UserApi";

export const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const findUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          const response = await getUserInfo(accessToken);

          if (response.data) {
            setUser(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    findUser();
  }, []);
  return (
    <div className="px-20">
      <div className="">
        <ProfileUserDetails user={user} />
      </div>
      <div className="flex items-centet justify-center">
        <UserPostPart />
      </div>
    </div>
  );
};
