import { useState } from "react";
import { PostCreateModal, Sidebar } from "../Components";
import { ChatPage } from "./ChatPage";

export const TestPage = () => {
  return (
    <div className="px-5 pt-12">
      <p className="text-xs pb-4">Only you can see what you've saved</p>
      <div className="grid grid-cols-3 gap-4">
        <div className="grid grid-cols-2 gap-1 rounded-md shadow-md relative">
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-tl-md" src="https://cdn.pixabay.com/photo/2021/10/08/07/13/autumn-6690466_1280.jpg" alt="" />
          </div>
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-tr-md" src="https://cdn.pixabay.com/photo/2021/01/06/21/50/couple-5895730_1280.jpg" alt="" />
          </div>
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-bl-md" src="https://cdn.pixabay.com/photo/2024/01/29/14/12/boy-8539958_1280.jpg" alt="" />
          </div>
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-br-md" src="https://cdn.pixabay.com/photo/2024/01/29/08/35/girl-8539256_1280.jpg" alt="" />
          </div>
          <div className="absolute w-full h-full bg-black top-0 text-white rounded-md opacity-40">
            All Posts
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 rounded-md shadow-md">
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-tl-md" src="https://cdn.pixabay.com/photo/2021/10/08/07/13/autumn-6690466_1280.jpg" alt="" />
          </div>
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-tr-md" src="https://cdn.pixabay.com/photo/2021/01/06/21/50/couple-5895730_1280.jpg" alt="" />
          </div>
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-bl-md" src="https://cdn.pixabay.com/photo/2024/01/29/14/12/boy-8539958_1280.jpg" alt="" />
          </div>
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-br-md" src="https://cdn.pixabay.com/photo/2024/01/29/08/35/girl-8539256_1280.jpg" alt="" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 rounded-md shadow-md">
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-tl-md" src="https://cdn.pixabay.com/photo/2021/10/08/07/13/autumn-6690466_1280.jpg" alt="" />
          </div>
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-tr-md" src="https://cdn.pixabay.com/photo/2021/01/06/21/50/couple-5895730_1280.jpg" alt="" />
          </div>
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-bl-md" src="https://cdn.pixabay.com/photo/2024/01/29/14/12/boy-8539958_1280.jpg" alt="" />
          </div>
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-br-md" src="https://cdn.pixabay.com/photo/2024/01/29/08/35/girl-8539256_1280.jpg" alt="" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 rounded-md shadow-md">
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-tl-md" src="https://cdn.pixabay.com/photo/2021/10/08/07/13/autumn-6690466_1280.jpg" alt="" />
          </div>
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-tr-md" src="https://cdn.pixabay.com/photo/2021/01/06/21/50/couple-5895730_1280.jpg" alt="" />
          </div>
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-bl-md" src="https://cdn.pixabay.com/photo/2024/01/29/14/12/boy-8539958_1280.jpg" alt="" />
          </div>
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-br-md" src="https://cdn.pixabay.com/photo/2024/01/29/08/35/girl-8539256_1280.jpg" alt="" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 rounded-md shadow-md">
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-tl-md" src="https://cdn.pixabay.com/photo/2021/10/08/07/13/autumn-6690466_1280.jpg" alt="" />
          </div>
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-tr-md" src="https://cdn.pixabay.com/photo/2021/01/06/21/50/couple-5895730_1280.jpg" alt="" />
          </div>
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-bl-md" src="https://cdn.pixabay.com/photo/2024/01/29/14/12/boy-8539958_1280.jpg" alt="" />
          </div>
          <div className="h-40 w-full">
            <img className="object-cover h-full w-full rounded-br-md" src="https://cdn.pixabay.com/photo/2024/01/29/08/35/girl-8539256_1280.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
