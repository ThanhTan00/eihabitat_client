export const Loading = () => {
  return (
    <div className="absolute bg-white bg-opacity-70 z-10 w-full h-full flex items-center justify-center">
      <div className="flex items-center">
        <span className="text-2xl mr-4 font-bold text-[#083555]">
          Loading...
        </span>

        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="h-10 w-10 rounded-full border-t-4 border-b-4 border-[#083555]"></div>
            <div className="absolute top-0 left-0 h-10 w-10 rounded-full border-t-4 border-b-4 border-[#A68655] animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
