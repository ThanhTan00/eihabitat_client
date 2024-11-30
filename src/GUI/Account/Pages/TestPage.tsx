import { useState } from "react";
import { PostCreateModal, Sidebar } from "../Components";
import { ChatPage } from "./ChatPage";

export const TestPage = () => {
  return (
    <div>
      <div className="flex">
        {/* <div className="fixed bg-white z-50 w-auto">
          <Sidebar />
        </div> */}
        <div className="absolute">
          <ChatPage />
        </div>
      </div>
    </div>
  );
};
