import { useNavigate } from "react-router-dom";
import { Room } from "../../../../Model/User";

interface Props {
  room: Room;
  selectedRoom: (room: Room) => void;
}

export const ChatRoom = ({ room, selectedRoom }: Props) => {
  return (
    <div
      onClick={() => selectedRoom(room)}
      key={room.id}
      className="flex justify-between items-center w-full py-2 cursor-pointer hover:bg-[#DED1BF] hover:bg-opacity-50 pl-4"
    >
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full">
            <img
              className="w-full h-full rounded-full object-cover"
              src={room.userAvatar}
              alt="Story"
            />
          </div>
        </div>
        <div className="pl-4 space-y-2">
          <div className="flex justify-between items-end">
            <p className="text-md  max-w-[200px] duration-200 truncate">
              {room.userName}
            </p>
          </div>
          <p className="font-thin text-xs opacity-80">{room.lastMessage}</p>
        </div>
      </div>
    </div>
  );
};
