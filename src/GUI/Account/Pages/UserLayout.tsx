import { Outlet } from "react-router-dom";
import { Sidebar } from "../Components";

export const UserLayout = () => {
  return (
    <div>
      <div className="flex">
        <div className="fixed bg-white z-50 w-auto">
          <Sidebar />
        </div>
        <div className="absolute">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
