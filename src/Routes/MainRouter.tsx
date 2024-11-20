import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ChatPage,
  ConFirmEmailPage,
  EditProfilePage,
  ErrorPage,
  HomePage,
  LoginPage,
  LoginWithGGSuccessful,
  RegisterPage,
  UserLayout,
  
} from "../GUI/Account/Pages";
import { ProtectedRoute } from "./ProtectedRoute";
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
    path: "/loginWithGoogle",
    element: <LoginWithGGSuccessful />,
  },
  {
    path: "/confirmEmail",
    element: <ConFirmEmailPage />,
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
            path: "/:username",
            element: <Profile />,
          },
          {
            path: "/edit-profile",
            element: <EditProfilePage />,
          },
          {
            path: "/error",
            element: <ErrorPage />,
          },
          {
            path: "/chat/:id",
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export const MainRouter = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  return <RouterProvider router={router} />;
};
