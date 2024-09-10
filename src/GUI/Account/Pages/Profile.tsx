import { useSelector } from "react-redux";
import { ProfileUserDetails, UserPostPart } from "../Components";
import { RootState } from "../../../Store/store";

export const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
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
