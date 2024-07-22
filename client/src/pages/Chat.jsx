import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ChatSidebar from "../components/ChatSidebar";
import TextChatSection from "../components/TextChatSection";
import SpeechChatSection from "../components/SpeechChatSection";

const Chat = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <ChatSidebar />

      <div className="flex-1 h-auto md:h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/chat/text-chat" />} />
          <Route path="/text-chat" element={<TextChatSection />} />
          <Route path="/speech-chat" element={<SpeechChatSection />} />
        </Routes>
      </div>
    </div>
  );
};

export default Chat;
