import React, { useEffect, useState } from "react";
import connectWebSocket from "../../../../API/connectWebsocket";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/store";
import { useParams } from "react-router";
import { timeStamp } from "console";
import { addMessage } from "../../../../API/PostApi";

interface Message {
  content: string;
  senderId: string;
  recipientId: string;
  timestamp: string;
}



const ChatBox: React.FC = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  //   const { id } = useParams<{ id: string }>();
  const id = "46f15d43-b7c8-4351-932f-fea8bd2d952c";

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
    if (token && user) {
      const addNewMessage = await addMessage(token, {
        content: input,
        recipientId: id,
        senderId: user?.id,
      });
    }
    console.log(messages);
    setInput("");
  };

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
