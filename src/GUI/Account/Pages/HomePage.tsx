import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import { HomeRight, NewsFeed, StoryCircle, StoryModal } from "../Components";
import { useEffect, useRef, useState } from "react";
import { getAllFollowings } from "../../../API/UserApi";
import { Follower } from "../../../Model/User";
import "./Style.css";

export const HomePage = () => {
  const [selectedStory, setSelectedStory] = useState<string | undefined>(
    undefined
  );
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [followings, setFollowings] = useState<Follower[] | null>(null);
  const { token, user } = useSelector((state: RootState) => state.auth);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollAmount = 400;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const openStoryModal = (authorId: string | undefined) => {
    setSelectedStory(authorId);
    setIsStoryModalOpen(true);
  };

  const closeStoryModal = () => {
    setIsStoryModalOpen(false);
    setSelectedStory(undefined);
  };

  const getFollowings = async () => {
    try {
      if (token && user) {
        const followings = await getAllFollowings(
          token,
          user?.profileName,
          user?.id
        );
        console.log(followings.data);
        setFollowings(followings.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFollowings();
  }, []);

  return (
    <div className="relative ml-96">
      <div className="mt-5 flex w-[70%]">
        <div className="flex justify-center ">
          <div className="container mx-auto">
            <div className="flex justify-center items-center w-full">
              <div className="relative w-[80%] flex items-center">
                <button
                  onClick={scrollLeft}
                  className="absolute left-2 bottom-9 h-6 w-6 rounded-full flex text-black bg-white items-center justify-around duration-200 shadow-md"
                >
                  &#10094;
                </button>
                <div
                  ref={scrollRef}
                  className="w-full overflow-x-auto whitespace-nowrap story-part"
                >
                  <div className="flex space-x-4">
                    <StoryCircle
                      key={user?.id}
                      userId={user?.id}
                      userProfileName={user?.profileName}
                      userAvatar={user?.profileAvatar}
                      openStoryModal={openStoryModal}
                    />
                    {followings?.map((following) => (
                      <StoryCircle
                        key={following.id}
                        userId={following.id}
                        userProfileName={following.profileName}
                        userAvatar={following.profileAvatar}
                        openStoryModal={openStoryModal}
                      />
                    ))}
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={scrollRight}
                  className="absolute right-2 bottom-9 h-6 w-6 rounded-full flex text-black bg-white items-center justify-around duration-200 shadow-md"
                >
                  &#10095;
                </button>
              </div>
            </div>

            <NewsFeed />
          </div>
        </div>
        <div className="w-[30%]">
          <HomeRight />
        </div>
      </div>

      {/* <div className="sticky absolute bottom-0 right-0 rounded-full h-52 w-52 bg-black"></div> */}
      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={closeStoryModal}
        authorId={selectedStory}
      />
    </div>
  );
};
