import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Store/store";
import { Navigate, useNavigate } from "react-router-dom";
import {
  authenticatedAction,
  loginUser,
  loginWithGoogle,
} from "../../../Store/Slices/AuthSlice";
import { showToastMessage } from "../../../Toast/CustomToast";
import { useForm } from "react-hook-form";
import { loginWithGG } from "../../../API/UserApi";

interface formFields {
  email: string;
  password: string;
}
export const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>({
    mode: "all",
  });

  const onLoginWithGGHandler = async () => {
    try {
      const auth = await dispatch(loginWithGoogle() as any);
      console.log(auth);
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
      //console.log(error);
      showToastMessage("email or password in correct", "error");
    }
  };

  const onSubmit = async (data: formFields) => {
    try {
      const auth = await dispatch(
        loginUser({
          email: data.email,
          password: data.password,
        }) as any
      );
      //console.log(auth);
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
      //console.log(error);
      showToastMessage("email or password in correct", "error");
    }
  };
  return !user ? (
    <div className="relative">
      {loading && (
        <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
          <div className="flex items-center">
            <span className="text-4xl mr-4 font-bold text-[#083555]">
              Logging in...
            </span>

            <div className="flex items-center justify-center h-screen">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-[#A68655] animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="bg-gray-52 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
            <p className="text-sm mt-4 text-[#002D74]">
              If you already a member, easily login
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <input
                className="p-2 mt-8 rounded-xl border"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
                <img
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                  src="\asset\icons\eye.svg"
                  alt=""
                />
              </div>

              <button
                type="submit"
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              >
                Login
              </button>
            </form>
            <div className="mt-10 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>
            <a
              onClick={onLoginWithGGHandler}
              className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300"
            >
              <img className="mr-3" src="\asset\icons\google-logo.svg" alt="" />
              Login with Google
            </a>

            <p className="mt-5 text-xs border-b py-4 border-gray-400">
              Forgot your password?
            </p>

            <div className="text-xs flex justify-between items-center mt-3">
              <p>Don't have an account?</p>
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                Register
              </button>
            </div>
          </div>

          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl"
              src="\asset\images\login-img.jpg"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};
