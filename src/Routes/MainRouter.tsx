import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  UserLayout,
} from "../GUI/Account/Pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { Profiler } from "react";
import { Profile } from "../GUI/Account/Pages/Profile";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <UserLayout />,
        children: [
          {
            element: <HomePage />,
            index: true,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export const MainRouter = () => {
  return <RouterProvider router={router} />;
};
