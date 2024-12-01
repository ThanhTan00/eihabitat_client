import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";
import { updateUserAvatar } from "../../../../API/UserApi";
import { RootState } from "../../../../Store/store";
import { useSelector } from "react-redux";
import { showToastMessage } from "../../../../Toast/CustomToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateImageModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { token, user } = useSelector((state: RootState) => state.auth);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedImage) {
      console.log("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage); // "image" is the key expected by your API

    try {
      const response = await updateUserAvatar(token, user?.id, formData);
      if (response.code === 1000) {
        showToastMessage("Updated avatar successfully!", "success");
        setSelectedImage(null);
        onClose();
      } else {
        showToastMessage("Updated avatar failed!", "error");
        console.log(response);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent className="w-64">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-4 border rounded-md shadow-md"
        >
          <p className="block text-gray-700 text-lg font-bold mb-2">
            Upload your avatar
          </p>
          <label htmlFor="image" className="cursor-pointer">
            <p className="text-gray-500">
              <FontAwesomeIcon icon={faImages} size="2xl" className="mr-2" />
              Add image from your device
            </p>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hidden"
            />
          </label>

          {previewUrl ? (
            <div className="mt-4">
              <p className="text-gray-700 text-sm">Preview:</p>
              <img
                src={previewUrl}
                alt="Image Preview"
                className="w-full h-auto rounded-md"
              />
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-gray-700 text-sm">Preview:</p>
              <img
                src={user?.profileAvatar}
                alt="Image Preview"
                className="w-full h-auto rounded-md"
              />
            </div>
          )}

          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </ModalContent>
    </Modal>
  );
};
