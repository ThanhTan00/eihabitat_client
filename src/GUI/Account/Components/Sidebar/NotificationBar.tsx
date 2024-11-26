export const NotificationBar = () => {
  return (
    <div className="flex flex-col pt-6 h-full border-l border-gray-200">
      <div className="border-b border-gray-200 pb-4">
        <div className="px-7 pb-5">
          <p className="font-bold text-2xl mb-3">Notifications</p>
          <p className="font-semibold text-md">Latest this month</p>
        </div>
        <div className="flex justify-between items-center w-full hover:bg-[#DED1BF] hover:bg-opacity-50 px-5 py-2 cursor-pointer">
          <div className="flex">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src="https://cdn.pixabay.com/photo/2022/04/12/19/35/dog-7128749_640.jpg"
                  alt="Story"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-base duration-200 ml-4">
                <span className="font-semibold hover:opacity-70">
                  profilename{" "}
                </span>
                <span className="font-thin text-sm opacity-80 ">
                  Like your post.{" "}
                </span>
                <span className="font-thin text-xs text-gray-400">2 weeks</span>
              </p>
            </div>
          </div>

          <div className="w-12 h-12 rounded-lg">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://cdn.pixabay.com/photo/2023/11/05/15/25/winter-8367632_640.jpg"
              alt="Story"
            />
          </div>
        </div>
        <div className="flex items-center w-full hover:bg-[#DED1BF] hover:bg-opacity-50 px-5 py-2 cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full">
              <img
                className="w-full h-full rounded-full object-cover"
                src="https://cdn.pixabay.com/photo/2022/04/12/19/35/dog-7128749_640.jpg"
                alt="Story"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-base duration-200 ml-4">
              <span className="font-semibold hover:opacity-70">
                profilename{" "}
              </span>
              <span className="font-thin text-sm opacity-80">
                Started following you.{" "}
              </span>
              <span className="font-thin text-xs text-gray-400">2 weeks</span>
            </p>
          </div>
          <button
            type="button"
            className="font-sm rounded-lg text-sm px-4 py-1 bg-[#E4E4E4] hover:bg-[#0C5083] hover:text-white"
          >
            Following
          </button>
        </div>
      </div>
      <div className="py-5">
        <p className="px-7 pb-5 font-semibold text-md">Earlier</p>
        <div className="flex justify-between items-center w-full ">
          <div className="flex items-center w-full hover:bg-[#DED1BF] hover:bg-opacity-50 px-7 py-2 cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src="https://cdn.pixabay.com/photo/2022/04/12/19/35/dog-7128749_640.jpg"
                  alt="Story"
                />
              </div>
            </div>
            <div className="pl-4 w-full">
              <div className="flex justify-between items-end">
                <p className="font-semibold text-base hover:opacity-70 duration-200">
                  profilename
                </p>
              </div>
              <p className="flex font-thin text-sm opacity-80 truncate">
                muadongemve
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
                    <circle cx="12" cy="12" r="2" fill="#c7c2c2"></circle>{" "}
                  </g>
                </svg>
                Followed by ins_khang
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full ">
          <div className="flex items-center w-full hover:bg-[#DED1BF] hover:bg-opacity-50 px-7 py-2 cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src="https://cdn.pixabay.com/photo/2023/11/05/15/25/winter-8367632_640.jpg"
                  alt="Story"
                />
              </div>
            </div>
            <div className="pl-4 w-full">
              <div className="flex justify-between items-end">
                <p className="font-semibold text-base hover:opacity-70 duration-200">
                  profilename
                </p>
              </div>
              <p className="flex font-thin text-sm opacity-80 truncate">
                muadongemve
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
                    <circle cx="12" cy="12" r="2" fill="#c7c2c2"></circle>{" "}
                  </g>
                </svg>
                Followed by ins_khang
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full ">
          <div className="flex items-center w-full hover:bg-[#DED1BF] hover:bg-opacity-50 px-7 py-2 cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src="https://cdn.pixabay.com/photo/2022/04/12/19/35/dog-7128749_640.jpg"
                  alt="Story"
                />
              </div>
            </div>
            <div className="pl-4 w-full">
              <div className="flex justify-between items-end">
                <p className="font-semibold text-base hover:opacity-70 duration-200">
                  profilename
                </p>
              </div>
              <p className="flex font-thin text-sm opacity-80 truncate">
                muadongemve
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
                    <circle cx="12" cy="12" r="2" fill="#c7c2c2"></circle>{" "}
                  </g>
                </svg>
                Followed by ins_khang
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full ">
          <div className="flex items-center w-full hover:bg-[#DED1BF] hover:bg-opacity-50 px-7 py-2 cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src="https://cdn.pixabay.com/photo/2022/04/12/19/35/dog-7128749_640.jpg"
                  alt="Story"
                />
              </div>
            </div>
            <div className="pl-4 w-full">
              <div className="flex justify-between items-end">
                <p className="font-semibold text-base hover:opacity-70 duration-200">
                  profilename
                </p>
              </div>
              <p className="flex font-thin text-sm opacity-80 truncate">
                muadongemve
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
                    <circle cx="12" cy="12" r="2" fill="#c7c2c2"></circle>{" "}
                  </g>
                </svg>
                Followed by ins_khang
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
