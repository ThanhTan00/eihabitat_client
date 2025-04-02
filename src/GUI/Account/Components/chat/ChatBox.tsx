import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { addMessage } from "../../../../API/PostApi";
import {
  faInfoCircle,
  faPhoneFlip,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Message, MessageCustom } from "../../../../Model/Message";
import { Room, UserDemoInfo } from "../../../../Model/User";
import { useForm } from "react-hook-form";
import { showToastMessage } from "../../../../Toast/CustomToast";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "@emoji-mart/react";
import { getChatHistory } from "../../../../API/ChatApi";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ChatRoom } from "./ChatRoom";
import connectChatSocket from "../../../../API/connectChatSocket";

interface Props {
  selectedRoom: Room;
}
interface formFields {
  content: string;
  recipientId: string;
  senderId: string;
}

export const ChatBox = ({ selectedRoom }: Props) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [messages, setMessages] = useState<MessageCustom[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd/mm/yyyy HH:mm"); // "20th - Mar - 2025 14:30"
  };

  const getChatHis = async () => {
    try {
      if (token && user) {
        const chats = await getChatHistory(token, selectedRoom.id);
        if (chats.code === 1000) setMessages(chats.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setInput(input + emoji.native);
    setShowEmojiPicker(false);
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>({
    mode: "all",
  });

  const onSubmit = async () => {
    try {
      if (token && user) {
        const addNewMessage = await addMessage(token, {
          content: input,
          recipientId: selectedRoom.userId,
          senderId: user?.id,
        });
      }
    } catch (error) {
      showToastMessage("Something went wrong, try again later", "error");
    } finally {
      setInput("");
    }
  };

  useEffect(() => {
    getChatHis();
  }, [selectedRoom]);

  useEffect(() => {
    const client = connectChatSocket(
      selectedRoom.id,
      (message: MessageCustom) => {
        setMessages((prev) => [message, ...prev]);
      }
    );
  }, [selectedRoom.id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-full relative z-0">
      <div className="absolute bg-white w-full z-10 top-0 flex items-center border-b border-gray-200">
        <div className="flex items-center space-x-4 px-10 py-5">
          <div className="w-14 h-14 rounded-full">
            <img
              className="w-full h-full rounded-full object-cover"
              src={selectedRoom.userAvatar}
              alt="Story"
            />
          </div>
          <div className="flex justify-between items-end">
            <p className="text-md font-semibold max-w-[600px] duration-200 truncate">
              {selectedRoom.userName}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 px-10 py-5 ml-auto">
          <FontAwesomeIcon
            icon={faPhoneFlip}
            size="xl"
            className="cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faVideoCamera}
            size="xl"
            className="cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faInfoCircle}
            size="xl"
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col h-screen overflow-y-auto px-5 py-28 space-y-4">
        <div className="flex flex-col-reverse">
          {messages.map((message) => (
            <div key={message.id}>
              {message.senderId === user?.id ? (
                <div className="justify-self-end mt-2">
                  <p className="text-md text-white max-w-96 p-2 rounded-2xl bg-[#0C5083] group relative">
                    {message.content}
                    <span className="absolute w-32 text-center px-4 text-xs text-gray-500 opacity-0 group-hover:opacity-100 right-[100%] top-[35%]">
                      {formatDateTime(message.timestamp)}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="justify-self-start">
                  <div className="flex items-center max-w-96 space-x-4">
                    <Link to={message.senderUrl}>
                      <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={message.senderAvatar}
                        alt="Sender"
                      />
                    </Link>
                    <p className="text-md max-w-96 p-2 rounded-2xl bg-gray-100 group relative">
                      {message.content}
                      <span className="absolute w-32 text-center px-4 text-xs text-gray-500 opacity-0 group-hover:opacity-100 left-[100%] top-[35%]">
                        {formatDateTime(message.timestamp)}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div ref={chatEndRef} />
      </div>
      <div className="absolute bottom-0 left-0 z-10 bg-white w-full flex items-center w-full px-6 py-6 border-t border-gray-200">
        {/* Smile icon */}
        <span className="absolute left-8 text-gray-500">
          <BsEmojiSmile
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="mr-3 text-2xl cursor-pointer"
          />
          {showEmojiPicker && (
            <div className=" absolute bottom-[100%] left-[100%]">
              <Picker onEmojiSelect={handleEmojiSelect} />
            </div>
          )}
        </span>

        {/* Input field */}
        <form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-[90%] py-2  pl-10 pr-20 text-gray-700 bg-white border rounded-full shadow-sm focus:outline-none focus:ring focus:ring-blue-200 border-gray-300"
          />
          <button
            type="submit"
            className="ml-3 min-w-28 bg-[#0C5083] hover:bg-[#143D5C] px-3 py-1 text-white p-2 duration-300 rounded-full"
          >
            Send
          </button>
        </form>
      </div>
    </div>
    // <div>
    //   <h1>Chat as {user?.profileName}</h1>
    //   <div>
    //     <h2>Messages</h2>
    //     {messages.map((msg, index) => (
    //       <div key={index}>
    //         <strong>
    //           {msg.senderId} to {msg.recipientId}
    //         </strong>
    //         : {msg.content} ({new Date(msg.timestamp).toLocaleString()})
    //       </div>
    //     ))}
    //   </div>
    //   <input
    //     type="text"
    //     value={input}
    //     onChange={(e) => setInput(e.target.value)}
    //   />
    //   <button onClick={sendMessage}>Send</button>
    // </div>
  );
};

export default ChatBox;
