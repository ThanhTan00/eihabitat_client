import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faImages, faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "@emoji-mart/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { showToastMessage } from "../../../../Toast/CustomToast";
import { uploadStory } from "../../../../API/StoryAPI";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryCreateModel: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile); // Store file for API request
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string); // Convert to base64 URL for preview
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      handleFile(event.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setDragActive(false);
    setFile(null);
    setImage(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to content height
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setInputText(inputText + emoji.native);
    //setShowEmojiPicker(false);
  };

  const uploadImage = async () => {
    if (!file) {
      showToastMessage("Please choose an image to upload", "error");
      return;
    }

    const formData = new FormData();
    formData.append("imageFile", file);
    formData.append("caption", inputText);
    formData.append("authorId", user?.id ? user.id : "");

    try {
      if (token) {
        const response = await uploadStory(token, formData);
        if (response.code === 1000) {
          showToastMessage("Story uploaded successfully!", "info");
          onClose();
        } else {
          showToastMessage(response.data, "error");
        }
      }
    } catch (error) {
      showToastMessage("There is unexpected error, try again later", "error");
    }
  };

  useEffect(() => {
    setImage(null);
    setInputText("");
    setDragActive(false);
    setShowEmojiPicker(false);
  }, [isOpen]);

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <div className="px-3 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 h-[90vh]">
          <div className="relative h-full w-full flex justify-center items-center">
            <div className="p-2 w-full absolute top-0 left-0 ">
              <FontAwesomeIcon
                icon={faArrowLeft}
                size="lg"
                className="text-white cursor-pointer hover:scale-110 duration-300"
                onClick={onClose}
              />
              <div className="text-center text-lg text-white font-bold">
                New Story
              </div>
              <div className="grid grid-cols-8 w-full cursor-pointer">
                <div className="w-8 h-8 col-span-1 place-self-start rounded-full">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={user?.profileAvatar}
                    alt="Story"
                  />
                </div>
                <div className="col-span-7 space-y-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-base hover:opacity-70 text-white cursor-pointer">
                      {user?.profileName}
                    </p>
                  </div>
                  <div className="relative flex w-full space-x-3 items-center">
                    <textarea
                      className="w-full font-thin text-white text-xs bg-[#083555] bg-opacity-50 p-2 rounded-md resize-none focus:outline-none"
                      placeholder="What are you thinking?"
                      ref={textareaRef}
                      value={inputText}
                      onChange={handleInputChange}
                      rows={1} // Minimum height
                      style={{ minHeight: "20px" }} // Prevents it from collapsing too much
                    ></textarea>
                    <BsEmojiSmile
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-white text-2xl cursor-pointer self-start"
                    />
                    {showEmojiPicker && (
                      <div className="absolute top-[100%] left-[100%]">
                        <Picker onEmojiSelect={handleEmojiSelect} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {image ? (
              <div className="relative flex justify-center w-full bg-black">
                <img
                  src={image}
                  alt="efw"
                  className="w-full max-h-[500px] object-cover transition-opacity duration-500"
                />
                <div
                  onClick={() => handleRemoveImage()}
                  className="absolute top-2 right-2 flex justify-center items-center h-8 w-8 rounded-full bg-black bg-opacity-0 hover:bg-opacity-50 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faX}
                    size="sm"
                    className="text-white px-2"
                  />
                </div>
              </div>
            ) : (
              <div
                className={`flex items-center justify-center w-full h-[50%] border-2 border-dashed p-6 mb-2 ${
                  dragActive
                    ? "border-[#083555] bg-gray-500 bg-opacity-30"
                    : "border-white"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <p className="text-white">
                    <FontAwesomeIcon
                      icon={faImages}
                      size="2xl"
                      className="mr-2 text-white"
                    />
                    Add images
                  </p>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
            <div className="absolute bottom-10 flex justify-center items-center ">
              <button
                onClick={() => uploadImage()}
                className="w-48 bg-[#EBE4D8] hover:bg-[#D6C7AD] px-5 py-3 duration-300 rounded-md text-md font-semibold"
              >
                UPLOAD
              </button>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
