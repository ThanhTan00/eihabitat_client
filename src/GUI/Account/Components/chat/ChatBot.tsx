import {
  faInfoCircle,
  faPhoneFlip,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { BotMessagesResponse, MessageCustom } from "../../../../Model/Message";
import { getChatBotHistory, sendMessage } from "../../../../API/chatbotAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";

export const ChatBot = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [messages, setMessages] = useState<BotMessagesResponse[]>([]);
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getChatHis = async () => {
    const history = await getChatBotHistory(user?.id);
    if (history.code === 1000) {
      setMessages(history.data);
    }
  };

  const sendMessagehandler = async () => {
    const answer = await sendMessage(user?.id, { message: input });
    if (answer.code === 1000) {
      setMessages((prev) => [...prev, answer.data]);
    }
    scrollToBottom();
  };

  useEffect(() => {
    getChatHis();
    scrollToBottom();
  }, []);

  return (
    <div className="w-full h-full relative z-0">
      <div className="absolute bg-white w-full z-10 top-0 flex items-center border-b border-gray-200">
        <div className="flex items-center space-x-4 px-10 py-5">
          <div className="w-14 h-14 rounded-full">
            <img
              className="w-full h-full rounded-full object-cover"
              src="\eiuhabitat-icon.png"
              alt="Story"
            />
          </div>
          <div className="flex justify-between items-end">
            <p className="text-md font-semibold max-w-[600px] duration-200 truncate">
              EiHabitat Bot
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
          {/* <div className="justify-self-end space-y-1">
            <p className="text-md text-white max-w-96 duration-200 p-2 rounded-2xl bg-[#0C5083]">
              hihihi
            </p>
          </div> */}

          <div className="justify-self-start">
            <div className="grid grid-cols-6 max-w-96">
              <div className="w-8 h-8 col-span-1 place-self-end rounded-full mr-4">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src="\eiuhabitat-icon.png"
                  alt="Story"
                />
              </div>
              <div className="col-span-5 space-y-1">
                <p className="text-md max-w-96 duration-200 p-2 rounded-2xl bg-gray-100">
                  Hello I'm EIU ChatBot! What can I help you
                </p>
              </div>
            </div>
          </div>

          {messages.map((message) => (
            <>
              <div className="justify-self-end space-y-1">
                <p className="text-md text-white max-w-96 duration-200 p-2 rounded-2xl bg-[#0C5083]">
                  {message.message}
                </p>
              </div>

              <div className="justify-self-start">
                <div className="grid grid-cols-6 max-w-96">
                  <div className="w-8 h-8 col-span-1 place-self-end rounded-full mr-4">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src="\eiuhabitat-icon.png"
                      alt="Story"
                    />
                  </div>
                  <div className="col-span-5 space-y-1">
                    <p className="text-md max-w-96 duration-200 p-2 rounded-2xl bg-gray-100">
                      {message.response}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ))}
          <div ref={endOfMessagesRef}></div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 z-10 bg-white w-full flex items-center w-full px-6 py-6">
        {/* Smile icon */}
        <span className="absolute left-8 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.75 9.75l-.004.001m-5.496 0L9.25 9.75m2.5 5.25a3.75 3.75 0 003.75-3.75m-7.5 0a3.75 3.75 0 017.5 0m-7.5 0A3.75 3.75 0 0112 15a3.75 3.75 0 01-7.5 0z"
            />
          </svg>
        </span>

        {/* Input field */}
        <input
          type="text"
          placeholder="Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full py-2 pl-8 pr-20 text-gray-700 bg-white border rounded-full shadow-sm focus:outline-none focus:ring focus:ring-blue-200 border-gray-300"
        />
        <button
          className="ml-3 min-w-28 bg-[#0C5083] hover:bg-[#143D5C] px-3 py-1 text-white p-2 duration-300 rounded-full"
          onClick={sendMessagehandler}
        >
          Send
        </button>
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

export default ChatBot;
