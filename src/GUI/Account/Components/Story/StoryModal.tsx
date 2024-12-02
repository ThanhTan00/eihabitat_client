import { ModalContent, ModalOverlay, Modal } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  authorId: string | undefined;
}

const stories = [
  {
    id: 1,
    image:
      "https://cdn.pixabay.com/photo/2023/02/08/06/29/fashion-7775824_640.jpg",
    title: "Story 1",
  },
  {
    id: 2,
    image:
      "https://cdn.pixabay.com/photo/2024/11/05/20/59/artistic-9176859_640.jpg",
    title: "Story 2",
  },
  {
    id: 3,
    image:
      "https://cdn.pixabay.com/photo/2022/01/20/15/34/monkey-6952630_640.jpg",
    title: "Story 3",
  },
];
export const StoryModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  authorId,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset progress on story change
    setProgress(0);

    // Increment progress over 20 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 0.5));
    }, 100); // Update progress every 100ms

    // Change story when progress completes
    if (progress >= 100) {
      setCurrentIndex((prevIndex) =>
        prevIndex === stories.length - 1 ? 0 : prevIndex + 1
      );
    }

    return () => clearInterval(progressInterval); // Cleanup interval
  }, [progress, stories.length]);

  if (stories.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800 text-white">
        <p>No stories available.</p>
      </div>
    );
  }

  const { image, title } = stories[currentIndex];
  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent className="">
          <div className="flex justify-around items-center">
            <div className="relative h-[90vh] bg-black">
              {/* Story Image */}
              <img
                src={image}
                alt={title}
                className="h-full w-auto object-contain"
              />

              {/* Overlay for content */}
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex flex-col justify-between p-4 text-white">
                <div>
                  <div className="flex space-x-2 mb-4">
                    {stories.map((_, index) => (
                      <div
                        key={index}
                        className="relative flex-1 h-1 bg-white bg-opacity-50 rounded"
                      >
                        <div
                          className={`absolute top-0 left-0 h-1 bg-white rounded ${
                            currentIndex === index
                              ? "transition-all duration-[20s]"
                              : ""
                          }`}
                          style={{
                            width:
                              currentIndex === index
                                ? `${progress}%`
                                : currentIndex > index
                                ? "100%"
                                : "0%",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  {/* Title */}
                  <div className="grid grid-cols-8 w-full">
                    <div className="w-8 h-8 col-span-1 place-self-start rounded-full mr-4">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src="https://cdn.pixabay.com/photo/2022/12/20/12/10/santa-7667744_640.jpg"
                        alt="Story"
                      />
                    </div>
                    <div className="col-span-7 space-y-1">
                      <p className="font-semibold text-base hover:opacity-70 duration-200">
                        Lnt.Tan00
                      </p>
                      <p className="font-thin text-xs opacity-80">
                        You can also use variant modifiers to target media
                        queries like responsive breakpoints, dark mode,
                        prefers-reduced-motion, and more. For example, use
                        md:justify-self-end to apply the justify-self-end
                        utility at only medium screen sizes and above.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center space-x-2">
                  {stories.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 rounded-full ${
                        currentIndex === index
                          ? "bg-white"
                          : "bg-white bg-opacity-50"
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};
