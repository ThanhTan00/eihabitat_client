import React, { useEffect, useState } from "react";
import connectWebSocket from "../../../../API/connectWebsocket";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { useParams } from "react-router-dom";
import { timeStamp } from "console";
import { addMessage } from "../../../../API/PostApi";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Message {
  content: string;
  senderId: string;
  recipientId: string;
  timestamp: string;
}

interface ChatBoxProps {
  recipientId: string | null;
}

export const ChatBox = ({ recipientId }: ChatBoxProps) => {
  const { token, user } = useSelector((state: RootState) => state.auth);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    if (user) {
      const client = connectWebSocket(user?.id, (message: Message) => {
        setMessages((prev) => [...prev, message]);
        return () => client.deactivate();
      });
    }
  }, [user]);

  const sendMessage = async () => {
    if (token && user && recipientId) {
      const addNewMessage = await addMessage(token, {
        content: input,
        recipientId: recipientId,
        senderId: user?.id,
      });
    }
    console.log(messages);
    setInput("");
  };

  if (!recipientId) {
    return (
      <div className="absolute bg-white bg-opacity-70 z-10 w-full h-full flex items-center justify-center">
        <div className="flex items-center">
          <span className="text-2xl mr-4 font-bold text-[#083555]">
            <FontAwesomeIcon icon={faMessage} className="" size="xl" />{" "}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Chat as {user?.profileName}</h1>
      <div>
        <h2>Messages</h2>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>
              {msg.senderId} to {msg.recipientId}
            </strong>
            : {msg.content} ({new Date(msg.timestamp).toLocaleString()})
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
