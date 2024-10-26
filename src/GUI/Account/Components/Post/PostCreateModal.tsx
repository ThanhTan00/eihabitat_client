import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faLock,
  faEarth,
  faTrash,
  faClose,
  faImages
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Select, { SingleValue, GroupBase } from "react-select";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "@emoji-mart/react";
import { User } from "../../../../Model/User";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
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
  const { user } = useSelector((state: RootState) => state.auth);
  const [dragActive, setDragActive] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

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

  const handleEmojiSelect = (emoji: any) => {
    setInputText(inputText + emoji.native);
    //setShowEmojiPicker(false);
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

  const handleRemoveFile = (file: string) => {
    setImages((prevItems) => prevItems.filter((item) => item !== file));
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white rounded-lg shadow-lg min-w-[30vw] min-h-[60vh]">
            <div className="text-center p-4 border-b">
              <h2 className="text-xl font-bold">Create Post</h2>
            </div>
            <div className="p-4">
              <form className="">
                <div className="flex items-center">
                  <div className="">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={user?.profileAvatar}
                      alt="efwf"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-md">{user?.profileName}</p>
                    <p className="font-thin text-sm">{user?.firstName} {user?.lastName}</p>
                  </div>
                </div>
                <textarea
                  className="appearance-none text-sm block w-full texts-gray-500 border-none py-3 leading-tight resize-none focus:outline-none focus:border-none mt-2"
                  id="grid-address"
                  placeholder="What are you thinking?"
                  rows={1}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                ></textarea>
                <div className="relative flex items-center justify-between">
                  <Select<OptionType, false, GroupBase<OptionType>>
                    className="h-10"
                    options={options}
                    placeholder="privacy"
                    formatOptionLabel={(option: OptionType) => (
                      <span>
                        {option.value === "friends" && (
                          <FontAwesomeIcon
                            icon={faUserGroup}
                            className="mr-2"
                            size="xs"
                          />
                        )}
                        {option.value === "public" && (
                          <FontAwesomeIcon
                            icon={faEarth}
                            className="mr-2"
                            size="xs"
                          />
                        )}
                        {option.value === "private" && (
                          <FontAwesomeIcon
                            icon={faLock}
                            className="mr-2"
                            size="xs"
                          />
                        )}
                        {option.label}
                      </span>
                    )}
                    // Optional: Handle change if needed
                    onChange={(selectedOption: SingleValue<OptionType>) => {
                      console.log(selectedOption?.value); // Handle option selection
                    }}
                  />
                  <BsEmojiSmile
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="mr-3 text-2xl cursor-pointer"
                  />
                  {showEmojiPicker && (
                    <div className=" absolute top-[100%] left-[100%]">
                      <Picker onEmojiSelect={handleEmojiSelect} />
                    </div>
                  )}
                </div>
                <div className="mt-2 p-2 grid grid-cols-2 p-2 gap-2 border-2 border-dashed rounded-md h-48 mb-4 overflow-auto">
                  {images.length > 0 && (
                    <>
                      {images.map((image, index) => (
                        <div className="relative h-16 hover:opacity-80 group rounded-lg cursor-pointer">
                          <img
                            key={index}
                            src={image}
                            alt={`Uploaded ${index}`}
                            className="h-full w-full object-cover rounded-md"
                          />
                          <div
                            onClick={() => handleRemoveFile(image)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-60 bg-[#EBE4D8] rounded-md hover:text-red-500"
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              size="sm"
                              className="p-2"
                            />
                          </div>
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
                      <FontAwesomeIcon
                            icon={faImages}
                            size="2xl"
                            className="mr-2"
                          />
                          Add images
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

            <div
              className="absolute top-0 right-0 m-4 flex items-center justify-center w-6 h-6 rounded-full bg-[#E4E4E4]"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faClose} />
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
