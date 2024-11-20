import { Outlet } from "react-router-dom";
import { Sidebar } from "../Components";

export const UserLayout = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-auto border border-l-slate-500">
          <Sidebar />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
