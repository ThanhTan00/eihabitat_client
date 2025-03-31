import React, { useEffect, useState } from "react";
import connectWebSocket from "../../../../API/connectNotificationSocket";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { useParams } from "react-router-dom";
import { timeStamp } from "console";
import { addMessage } from "../../../../API/PostApi";
import {
  faInfoCircle,
  faMessage,
  faPhoneFlip,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getChatHistory,
  getUserDemoForChatRoom,
} from "../../../../API/UserApi";
import { Message, MessageCustom } from "../../../../Model/Message";
import { UserDemoInfo } from "../../../../Model/User";
import { useForm } from "react-hook-form";
import { showToastMessage } from "../../../../Toast/CustomToast";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "@emoji-mart/react";

interface Props {
  selectedId: string;
}
interface formFields {
  content: string;
  recipientId: string;
  senderId: string;
}

export const ChatBox = ({ selectedId }: Props) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [chatUser, setChatUser] = useState<UserDemoInfo>();
  const [messages, setMessages] = useState<MessageCustom[]>([]);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const getChatHis = async () => {
    try {
      if (token && user) {
        const chats = await getChatHistory(token, user?.id, selectedId);
        setMessages(chats);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      if (selectedId && token) {
        const userDemo = await getUserDemoForChatRoom(token, selectedId);
        if (userDemo.code === 1000) {
          setChatUser(userDemo.data);
        } else {
          console.log(userDemo);
        }
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
      if (token && user && selectedId) {
        const addNewMessage = await addMessage(token, {
          content: input,
          recipientId: selectedId,
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
    getUser();
  }, [selectedId]);

  // useEffect(() => {
  //   if (user) {
  //     const client = connectWebSocket(user?.id, (message: MessageCustom) => {
  //       setMessages((prev) => [...prev, message]);
  //       return () => client.deactivate();
  //     });
  //   }
  // }, [user]);

  return (
    <div className="w-full h-full relative z-0">
      <div className="absolute bg-white w-full z-10 top-0 flex items-center border-b border-gray-200">
        <div className="flex items-center space-x-4 px-10 py-5">
          <div className="w-14 h-14 rounded-full">
            <img
              className="w-full h-full rounded-full object-cover"
              src={chatUser?.profileAvatar}
              alt="Story"
            />
          </div>
          <div className="flex justify-between items-end">
            <p className="text-md font-semibold max-w-[600px] duration-200 truncate">
              {chatUser?.profileName}
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
      <div className="flex flex-col h-screen overflow-y-scroll px-5 py-28 space-y-4">
        <div className="text-center font-semibold">3 Nov 2024, 17:23</div>
        <div className="grid grid-cols-1 space-y-4">
          {messages &&
            messages.map((message) =>
              message.senderId === user?.id ? (
                <div className="justify-self-end space-y-1">
                  <p className="text-md text-white max-w-96 duration-200 p-2 rounded-2xl bg-[#0C5083]">
                    {message.content}
                  </p>
                </div>
              ) : (
                <div className="justify-self-start">
                  <div className="grid grid-cols-6 max-w-96">
                    <div className="w-8 h-8 col-span-1 place-self-end rounded-full mr-4">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={chatUser?.profileAvatar}
                        alt="Story"
                      />
                    </div>
                    <div className="col-span-5 space-y-1">
                      <p className="text-md max-w-96 duration-200 p-2 rounded-2xl bg-gray-100">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          {messages.length === 0 && (
            <div className="flex justify-around items-center">
              <div className="max-w-sm w-full text-gray-600 space-y-8">
                <div className="text-center">
                  <img
                    src={chatUser?.profileAvatar}
                    width={150}
                    className="mx-auto rounded-full"
                    alt=""
                  />
                  <div className="mt-5 space-y-2">
                    <p>{chatUser?.profileName}</p>
                    <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                      {chatUser?.firstName} {chatUser?.lastName}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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
