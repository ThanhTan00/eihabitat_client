import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../Store/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../Store/Slices/AuthSlice";

export const HomeRight = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="border">
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
