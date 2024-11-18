import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../Store/store";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../Store/Slices/AuthSlice";
import { showToastMessage } from "../../../../Toast/CustomToast";
import { Link } from "react-router-dom";

export const HomeRight = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);

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

  return (
    <div className="w-80">
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
    </div>
  );
};
