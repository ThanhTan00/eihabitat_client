import { Outlet } from "react-router-dom";
import { Sidebar } from "../Components";
import { useChatBase } from "../../hooks/useChatBase";

export const UserLayout = () => {
  useChatBase()
  return (
    <div>
      <div className="fixed bg-white z-50 w-auto">
        <Sidebar />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};
