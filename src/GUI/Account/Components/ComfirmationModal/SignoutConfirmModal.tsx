import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleLogout: () => void;
}

export const SignoutConfirmModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  handleLogout,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent className="p-4 text-center">
        <div className="flex justify-around items-center w-full text-center">
          <div>
            <img
              className="w-20 h-20 rounded-full"
              src={user?.profileAvatar}
              alt=""
            />
            <p className="font-semibold">{user?.profileName}</p>
          </div>
        </div>

        <p className="mb-4 text-gray-500">
          Are you sure you want sign out this account? You can sign in again
          later
        </p>
        <div className="flex justify-center items-center space-x-6">
          <button
            type="button"
            className="w-24 py-2 px-3 text-sm font-medium bg-[#EBE4D8] hover:bg-[#D6C7AD] rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="w-24 py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Sign out
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
};
