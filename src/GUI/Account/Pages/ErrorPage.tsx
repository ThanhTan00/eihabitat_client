import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center py-5">
      <div className="py-5">
        <p className="flex items-center justify-center text-4xl font-semibold text-[#A68655]">
          Sorry, this page isn't available.
        </p>
        <p className="p-5">
          The link you followed may be broken, or the page may have been
          removed.{" "}
          <Link className="text-[#083555] font-semibold text-xl" to={"/"}>
            Go back to the newfeed
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
