import { useEffect, useState } from "react";
import { SearchUserResponse } from "../../../../Model/User";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { searchUser } from "../../../../API/UserApi";
import { Link } from "react-router-dom";
import { Loading } from "../Loading/Loading";

export const SearchBar = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchUserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query === "") {
      setResults([]);
      return;
    }

    const searchUserHandler = async () => {
      setLoading(true);
      try {
        if (token) {
          const searchResult = await searchUser(token, query);
          console.log(searchResult.data);
          setResults(searchResult.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      searchUserHandler();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="flex flex-col pt-6 h-full border-l border-gray-200">
      <div className="border-b border-gray-200 px-5 pb-5">
        <p className="font-bold text-2xl mb-10">Search</p>
        <input
          className="block w-full py-[9px] px-2 text-sm text-gray-900 rounded-md bg-gray-100 focus:outline-none focus:shadow-sm"
          type="text"
          value={query}
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="py-5">
        {loading && (
          <div className="flex justify-around">
            <div className="flex items-center space-x-2">
              <p>Loading</p>

              <div
                className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            </div>
          </div>
        )}
        {results.map((user) => (
          <Link
            to={user.userUrl}
            key={user.id}
            className="flex justify-between items-center w-full "
          >
            <div className="flex items-center w-full hover:bg-[#DED1BF] hover:bg-opacity-50 px-5 py-2 cursor-pointer">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={user.profileAvatar}
                    alt="Story"
                  />
                </div>
              </div>
              <div className="pl-4 w-full">
                <div className="flex justify-between items-end">
                  <p className="font-semibold text-base hover:opacity-70 duration-200">
                    {user.profileName}
                  </p>
                </div>
                <p className="flex font-thin text-sm opacity-80 truncate">
                  {user.firstName} {user.lastName}
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ece4e4"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <circle
                        cx="12"
                        cy="12"
                        r="2"
                        fill="#c7c2c2"
                      ></circle>{" "}
                    </g>
                  </svg>
                  {user.followers} folowers
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
