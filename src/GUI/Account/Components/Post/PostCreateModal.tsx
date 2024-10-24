import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faHome,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Select, { SingleValue, GroupBase } from 'react-select';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface OptionType {
  value: string;
  label: string;
}

const options = [
  { value: "friends", label: "friends" },
  { value: "public", label: "public" },
  { value: "private", label: "private" },
];

export const PostCreateModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    validImages.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    validImages.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg min-w-[30vw] min-h-[60vh]">
            <div className="text-center p-4 border-b">
              <h2 className="text-xl font-bold">Create Post</h2>
            </div>
            <div className="p-4">
              <form className="">
                <div className="flex items-center">
                  <div className="">
                    <img
                      className="w-9 h-9 rounded-full"
                      src="https://cdn.pixabay.com/photo/2023/08/30/22/59/chicken-8224162_640.jpg"
                      alt="efwf"
                    />
                  </div>
                  <div className="ml-3 font-semibold text-md">
                    <p>username</p>
                  </div>
                </div>
                <textarea
                  className="appearance-none text-sm block w-full texts-gray-500 border-none py-3 leading-tight resize-none focus:outline-none focus:border-none mt-2"
                  id="grid-address"
                  placeholder="What are you thinking?"
                  rows={1}
                ></textarea>
                <div className="flex">
                  <Select<OptionType, false, GroupBase<OptionType>>
                    className="w-32 h-10"
                    options={options}
                    formatOptionLabel={(option: OptionType) => (
                      <span>
                        {option.value === "friends" && (
                          <FontAwesomeIcon icon={faUserGroup} className="mr-2" size="xs"/>
                        )}
                        {option.value === "public" && (
                          <FontAwesomeIcon icon={faCoffee} className="mr-2" size="xs"/>
                        )}
                        {option.value === "private" && (
                          <FontAwesomeIcon icon={faCoffee} className="mr-2" size="xs"/>
                        )}
                        {option.label}
                      </span>
                    )}
                    // Optional: Handle change if needed
                    onChange={(selectedOption: SingleValue<OptionType>) => {
                      console.log(selectedOption?.value); // Handle option selection
                    }}
                  />
                </div>
                <div className="mt-2 p-2 grid grid-cols-2 p-2 gap-2 border-2 border-dashed rounded-md h-48 mb-4 overflow-auto">
                  {images.length > 0 && (
                    <>
                      {images.map((image, index) => (
                        <div className="h-16 hover:border-2 hover:opacity-70 border-[#A58751] rounded-lg cursor-pointer">
                          <img
                            key={index}
                            src={image}
                            alt={`Uploaded ${index}`}
                            className="h-full w-full object-cover rounded-md"
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
                <div
                  className={`border-2 border-dashed p-6 rounded-md text-center mb-2 ${
                    dragActive
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <p className="text-gray-500">
                      Drag & drop an image here, or click to select
                    </p>
                    <input
                      id="imageUpload"
                      multiple
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <button
                  type="button"
                  className="w-full bg-purple-500 py-3 text-center text-white rounded-md"
                >
                  Upload
                </button>
              </form>
            </div>

            {/* <div className="mt-4 flex justify-end">
              <button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div> */}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
