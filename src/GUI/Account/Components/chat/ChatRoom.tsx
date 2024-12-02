import { getChatHistory } from "../../../../API/UserApi";
import { ChatUser } from "../../../../Model/User";

interface Props {
  chatUser: ChatUser;
  handleChatSelete: (id: string) => void;
}

export const ChatRoom = ({ chatUser, handleChatSelete }: Props) => {
  console.log(chatUser.id);
  return (
    <div
      onClick={() => handleChatSelete(chatUser.id)}
      key={chatUser.id}
      className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4"
    >
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full">
            <img
              className="w-full h-full rounded-full object-cover"
              src={chatUser.userAvatar}
              alt="Story"
            />
          </div>
        </div>
        <div className="pl-4 space-y-2">
          <div className="flex justify-between items-end">
            <p className="text-md  max-w-[200px] duration-200 truncate">
              {chatUser.userProfileName}
            </p>
          </div>
          <p className="font-thin text-xs opacity-80">{chatUser.lastMessage}</p>
        </div>
      </div>
    </div>
  );
};
