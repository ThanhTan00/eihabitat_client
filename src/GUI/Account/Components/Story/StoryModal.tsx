import { ModalContent, ModalOverlay, Modal } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Story } from "../../../../Model/Story";
import { getUserStories, seenStory } from "../../../../API/StoryAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { formatDistanceToNow } from "date-fns";

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
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [stories, setStories] = useState<Story[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [key, setKey] = useState(0); // Key to reset progress animation

  const getStories = async () => {
    try {
      if (token) {
        const result = await getUserStories(token, authorId);
        if (result.code === 1000) {
          setStories(result.data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const seenStoryHandler = (storyId: string) => {
    if (token) {
      seenStory(token, user?.id, storyId);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getStories();
      setCurrentIndex(0);
      setKey((prevKey) => prevKey + 1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || stories.length === 0) return;
    seenStoryHandler(stories[0].id);
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen, currentIndex, stories]);

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      seenStoryHandler(stories[currentIndex + 1].id);
      setKey((prevKey) => prevKey + 1);
    } else {
      onClose();
    }
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
    setKey((prevKey) => prevKey + 1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 h-[90vh]">
            <div className="relative h-full w-full flex justify-center items-center">
              {/* Progress Bars */}
              {isLoading ? (
                <></>
              ) : (
                <>
                  <div className="px-2 w-full absolute top-0 left-0">
                    <div className="w-full flex gap-1 py-3">
                      {stories.map((_, index) => (
                        <div
                          key={index}
                          className="flex-1 h-1 bg-gray-600 rounded"
                        >
                          <motion.div
                            key={key + index} // Unique key to restart animation
                            initial={{ width: 0 }}
                            animate={{
                              width:
                                index === currentIndex
                                  ? "100%"
                                  : index < currentIndex
                                  ? "100%"
                                  : "0%",
                            }}
                            transition={{
                              duration: index === currentIndex ? 5 : 0,
                              ease: "linear",
                            }}
                            className="h-full bg-white rounded"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-8 w-full cursor-pointer">
                      <div className="w-8 h-8 col-span-1 place-self-start rounded-full">
                        <img
                          className="w-full h-full rounded-full object-cover"
                          src={stories[currentIndex].authorAvatar}
                          alt="Story"
                        />
                      </div>
                      <div className="col-span-7 space-y-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-base hover:opacity-70 text-white cursor-pointer">
                            {stories[currentIndex].authorName}
                          </p>
                          <p className="text-sm text-gray-300 font-light">
                            {formatDate(stories[currentIndex].createdAt)}
                          </p>
                        </div>

                        <p className="font-thin text-white text-xs opacity-80 bg-gray-500 bg-opacity-50 p-2 rounded-md hover:bg-opacity-100">
                          {stories[currentIndex].caption}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <img
                    src={stories[currentIndex].imageUrl}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full max-h-[500px] object-cover transition-opacity duration-500"
                  />
                </>
              )}

              <div className="absolute flex w-full px-2 justify-between items-center">
                <button
                  onClick={goToPrev}
                  className="h-10 w-10 left-4 text-white px-3 py-2 rounded-full bg-gray-200 opacity-50 bg-opacity-0 hover:bg-opacity-30 hover:opacity-100 duration-200"
                >
                  &#10094;
                </button>
                <button
                  onClick={goToNext}
                  className="h-10 w-10 left-4 text-white px-3 py-2 rounded-full bg-gray-200 opacity-50 bg-opacity-0 hover:bg-opacity-30 hover:opacity-100 duration-200"
                >
                  &#10095;
                </button>
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};
