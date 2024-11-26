import { Outlet } from "react-router-dom";
import { Sidebar } from "../Components";

export const UserLayout = () => {
  return (
    <div>
      <div className="flex">
        <div className="fixed bg-white z-50 w-auto">
          <Sidebar />
        </div>
        <div className="absolute w-full grid grid-cols-8">
          <div className="col-span-2"></div>
          <div className="col-span-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
