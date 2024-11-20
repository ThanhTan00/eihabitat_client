import { act } from "react";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineSearch,
  AiOutlineCompass,
  AiFillCompass,
  AiOutlineMessage,
  AiFillMessage,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlinePlusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";

export const mainu = [
  {
    title: "Home",
    icon: <AiOutlineHome className="text-3xl mr-5" />,
    activeIcon: <AiFillHome className="text-3xl mr-5" />,
  },
  {
    title: "Search",
    icon: <AiOutlineSearch className="text-3xl mr-5" />,
    activeIcon: <AiOutlineSearch className="text-3xl mr-5" />,
  },
  {
    title: "Explore",
    icon: <AiOutlineCompass className="text-3xl mr-5" />,
    activeIcon: <AiFillCompass className="text-3xl mr-5" />,
  },
  {
    title: "Reels",
    icon: <RiVideoLine className="text-3xl mr-5" />,
    activeIcon: <RiVideoFill className="text-3xl mr-5" />,
  },
  // {
  //   title: "Message",
  //   icon: <AiOutlineMessage className="text-3xl mr-5" />,
  //   activeIcon: <AiFillMessage className="text-3xl mr-5" />,
  // },
  // {
  //   title: "Notification",
  //   icon: <AiOutlineHeart className="text-3xl mr-5" />,
  //   activeIcon: <AiFillHeart className="text-3xl mr-5" />,
  // }
];
