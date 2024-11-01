import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { useState } from "react";
import { UpdateImageModal } from "./UpdateImageModal";

export const EditAvatarPart = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isUpdateImageModalOpen, setIsUpdateImageModalOpen] =
    useState<boolean>(false);
  const openUpdateImageModal = () => {
    setIsUpdateImageModalOpen(true);
  };

  const closeUpdateImageModal = () => {
    setIsUpdateImageModalOpen(false);
  };

  return (
    <div className="w-[50%] rounded-3xl p-10 bg-[#A68655] bg-opacity-25">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <img
              className="w-24 h-24 rounded-full mx-5"
              src={user?.profileAvatar}
              alt=""
            />
          </div>

          <div>
            <p className="font-bold text-500 text-lg">{user?.profileName}</p>
            <p className="text-gray-500 cursor-pointer">{user?.lastName}</p>
          </div>
        </div>

        <div>
          <div
            onClick={openUpdateImageModal}
            className="group inline-block rounded-full bg-[#A68655] focus:outline-none focus:ring active:text-opacity-75 hover:scale-110 duration-300"
          >
            <span className="block rounded-full bg-[#083555] px-8 py-3 text-white font-medium group-hover:bg-transparent cursor-pointer hover:scale-110 duration-300">
              Change Profile Image
            </span>
          </div>
        </div>
      </div>
      <UpdateImageModal
        isOpen={isUpdateImageModalOpen}
        onClose={closeUpdateImageModal}
      />
    </div>
  );
};
