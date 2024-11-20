import { ChatBox, Sidebar } from "../Components";
import { useParams } from "react-router-dom";


export const ChatPage = () => {
    const { id } = useParams<{ id: string | undefined }>();

  return (
    <div>
      <div className="flex">
        <div className="w-[20%] border border-l-slate-500">
          <Sidebar />
        </div>
        <div className="w-full">
          <ChatBox recipientId={id? id : ""} />
        </div>
      </div>
    </div>
  );
};
