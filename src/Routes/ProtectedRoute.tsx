import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? <Outlet /> : <Navigate to={"/"} />;
};
