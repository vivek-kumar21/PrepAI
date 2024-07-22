import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo-white.webp";
import image from "../assets/vivek.jpeg";
import { MdOutlineTextsms } from "react-icons/md";
import { MdMicNone } from "react-icons/md";

const ChatSidebar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-between h-screen w-64 bg-gray-900 p-4 shadow-md">
      <div className="flex flex-col space-y-2">
        <Link to="/" className="mb-4">
          <img className="md:w-24 w-26 ml-4 mt-2" src={logo} alt="logo" />
        </Link>
        <Link
          to="/chat/text-chat"
          className={`flex items-center gap-2 text-white text-md px-4 py-2 hover:bg-gray-700 rounded-md ${
            location.pathname.includes("/chat/text-chat") ? "bg-gray-700" : ""
          }`}
        >
          <MdOutlineTextsms className="text-lg" /> Text
        </Link>
        <Link
          to="/chat/speech-chat"
          className={`flex items-center gap-2 text-white text-md px-4 py-2 hover:bg-gray-700 rounded-md ${
            location.pathname.includes("/chat/speech-chat") ? "bg-gray-700" : ""
          }`}
        >
          <MdMicNone className="text-lg" /> Speech
        </Link>
      </div>
      <div className="flex items-center justify-left gap-2">
        <div>
          <img src={image} alt="Profile" className="w-10 h-10 rounded-full" />
        </div>
        <div>
          <p className="text-white text-md">Vivek Kumar</p>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
