import { Link, useNavigate } from "react-router-dom";
import {
  authenticateWithGG,
  createNewAccountWithGG,
  getUserDemo,
  getUserInfo,
  loginWithGG,
} from "../../../API/UserApi";
import { useEffect, useState } from "react";
import { UserDemoInfo } from "../../../Model/User";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Store/store";
import { loginUser, loginWithGoogle } from "../../../Store/Slices/AuthSlice";
import { showToastMessage } from "../../../Toast/CustomToast";
import { Loading } from "../Components";

interface formFields {
  email: string;
  password: string;
}

export const LoginWithGGSuccessful = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userDemoInfo, setUserDemoInfo] = useState<UserDemoInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");
    const tokenParam = urlParams.get("token");

    if (emailParam && tokenParam) {
      setEmail(emailParam);
      setToken(tokenParam);
    } else {
      navigate("/login");
    }

    const getUser = async () => {
      try {
        if (emailParam) {
          const userDemo = await getUserDemo(emailParam);
          if (userDemo.code === 1000) {
            setUserDemoInfo(userDemo.data);
          } else {
            setUserDemoInfo(null);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    setIsLoading(false);
  }, []);

  const handleAuthWithGG = async () => {
    try {
      const auth = await dispatch(
        loginWithGoogle({
          email: email,
          token: token,
        }) as any
      );
      const result = auth.payload;

      result.roles.forEach((role: any) => {
        if (role.name === "ADMIN") {
          showToastMessage("Hello Admin", "success");
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        } else {
          showToastMessage(`Hello ${result.user.profileName}`, "success");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      });
    } catch (error) {
      showToastMessage("error", "error");
    }
  };

  if (isLoading) {
    return (
      <main className="w-full h-screen flex flex-col items-center justify-center px-4">
        <Loading />
      </main>
    );
  }
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      {userDemoInfo ? (
        <div className="max-w-sm w-full text-gray-600 space-y-8">
          <div className="text-center">
            <img
              src={userDemoInfo.profileAvatar}
              width={150}
              className="mx-auto rounded-full"
            />
            <div className="mt-5 space-y-2">
              <p>{userDemoInfo.profileName}</p>
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Log in to your account via {userDemoInfo.email}
              </h3>
              <p className="">
                Use another email?{" "}
                <a
                  href="javascript:void(0)"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Change
                </a>
              </p>
            </div>
          </div>
          <button
            onClick={handleAuthWithGG}
            className="w-full mt-4 px-4 py-2 text-white font-medium bg-[#002D74] hover:bg-[#052338] active:bg-indigo-600 rounded-lg duration-150"
          >
            Go to Newfeed
          </button>
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Thank for joining us
            </p>
          </div>
          <div className="text-center">
            <a
              href="javascript:void(0)"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-[#A68655] text-2xl font-bold sm:text-3xl">
            This email <span className="text-[#083555]">{email}</span> is not
            registered to any account yet
          </h3>
          <Link
            to={"/register"}
            className="text-[#A68655] text-xl font-semibold sm:text-3xl hover:underline hover:text-pink"
          >
            Create account?
          </Link>
        </div>
      )}
    </main>
  );
};
