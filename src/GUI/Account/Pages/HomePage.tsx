import { HomeRight, PostCard, StoryCircle } from "../Components";

export const HomePage = () => {
  return (
    <div>
      <div className="mt-10 flex w-[100%]">
        <div className="w-[60%] px-10">
          <div className="container mx-auto">
            <div className="storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full">
              {[1, 1, 1, 1].map((item) => (
                <StoryCircle />
              ))}
            </div>
            <div className="container space-y-3 mx-auto w-[60%] mt-10">
              {[1, 1, 1].map((item) => (
                <PostCard />
              ))}
            </div>
          </div>
        </div>
        <div>
          <HomeRight />
        </div>
      </div>
    </div>
  );
};
