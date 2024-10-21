import { Link } from "react-router-dom";

export const ConFirmEmailPage = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h3 className="text-[#A68655] text-2xl font-bold sm:text-3xl">
          Please check out your email to confirm registeration. If you already
          confirmed your email, now you would be able to sign in
        </h3>
        <Link
          to={"/login"}
          className="text-[#A68655] text-xl font-semibold sm:text-3xl hover:underline hover:text-pink"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
};
