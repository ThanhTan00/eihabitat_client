import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRequestSchema } from "../../../Model/User";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { date } from "zod";
import { registerUser } from "../../../Store/Slices/AuthSlice";
import { showToastMessage } from "../../../Toast/CustomToast";
import { ToastContainer } from "react-toastify";

interface formFields {
  firstName: string;
  lastName: string;
  profileName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage: React.FC = () => {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>({
    mode: "all",
    resolver: zodResolver(UserRequestSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: formFields) => {
    //console.log(data);
    //console.log(confirmPassword);

    if (data.password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    try {
      const result = await dispatch(
        registerUser({
          profileName: data.profileName,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }) as any
      );
      if (result.payload.code === 1000) {
        showToastMessage("Account created successfully.", "success");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        showToastMessage(result.payload.message, "error");
      }
    } catch (error) {
      showToastMessage("Account created failed", "error");
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="min-h-screen py-40"
        style={{ backgroundImage: "linear-gradient(115deg, #9F7AEA, #FEE2FE)" }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div
              className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: "url('asset/images/register-background.png')",
              }}
            >
              <h1 className="text-white text-3xl mb-3">Welcome</h1>
              <div>
                <p className="text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean suspendisse aliquam varius rutrum purus maecenas ac{" "}
                  <a href="#" className="text-purple-500 font-semibold">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-16 px-12">
              <h2 className="text-3xl mb-4">Register</h2>
              <p className="mb-4">
                Create your account. It’s free and only take a minute
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Firstname"
                    className="border border-gray-400 py-1 px-2"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-xs italic">
                      {errors.firstName.message}
                    </span>
                  )}
                  <input
                    type="text"
                    placeholder="Lastname"
                    className="border border-gray-400 py-1 px-2"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-xs italic">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Profile Name"
                    className="border border-gray-400 py-1 px-2 w-full"
                    {...register("profileName", { required: true })}
                  />
                  {errors.profileName && (
                    <span className="text-red-500 text-xs italic">
                      {errors.profileName.message}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Email"
                    className="border border-gray-400 py-1 px-2 w-full"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs italic">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-400 py-1 px-2 w-full"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs italic">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="border border-gray-400 py-1 px-2 w-full"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {passwordError && (
                    <span className="text-red-500 text-xs italic">
                      {passwordError}
                    </span>
                  )}
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-xs italic">
                      Profile name must not be empty
                    </span>
                  )}
                </div>
                {/* <div className="mt-5">
                  <input type="checkbox" className="border border-gray-400" />
                  <span>
                    I accept the{" "}
                    <a href="#" className="text-purple-500 font-semibold">
                      Terms of Use
                    </a>{" "}
                    &{" "}
                    <a href="#" className="text-purple-500 font-semibold">
                      Privacy Policy
                    </a>
                  </span>
                </div> */}
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full bg-purple-500 py-3 text-center text-white"
                  >
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
