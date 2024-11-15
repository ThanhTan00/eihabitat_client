import { ModalContent, ModalOverlay, Modal } from "@chakra-ui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  authorId: string | undefined;
}
export const StoryModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  authorId,
}) => {
  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent className="">
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2023/08/07/15/18/woman-8175307_1280.jpg"
              alt="ewqeqwe"
              className="h-[90vh] w-[90vw]"
            />
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};
