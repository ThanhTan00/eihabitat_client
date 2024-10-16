import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../Store/store";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../Store/Slices/AuthSlice";
import { showToastMessage } from "../../../../Toast/CustomToast";

export const HomeRight = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log(token);
      const auth = await dispatch(logoutUser({ token: token }) as any);
      //const result = auth.payload;
      console.log(auth);
    } catch (error) {
      console.log(error);
      showToastMessage("email or password in correct", "error");
    }
  };

  return (
    <div className="border w-96">
      <a
        className="group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
        onClick={handleLogout}
      >
        <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
          Logout
        </span>
      </a>
    </div>
  );
};
