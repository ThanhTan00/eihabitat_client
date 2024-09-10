import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  EditProfilePage,
  HomePage,
  LoginPage,
  RegisterPage,
  UserLayout,
} from "../GUI/Account/Pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { Profile } from "../GUI/Account/Pages/Profile";

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
          {
            path: "/edit-profile",
            element: <EditProfilePage />,
          },
        ],
      },
    ],
  },
]);

export const MainRouter = () => {
  return <RouterProvider router={router} />;
};
