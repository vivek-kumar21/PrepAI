import React from "react";
import { Routes, Route } from "react-router-dom";
import PdfToText from "./components/PdfToText";
import Chat from "./pages/Chat";
import TextToSpeech from "./components/TextToSpeech";
import SpeechToText from "./components/SpeechToText";
import Report from "./pages/Report";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";
import About from "./pages/About";
import Home from "./pages/Home";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/chat/*" element={<Chat />} />
        <Route path="/speech" element={<TextToSpeech />} />
        <Route path="/speechtotext" element={<SpeechToText />} />
        <Route path="/report" element={<Report />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
