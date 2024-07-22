import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineAudio } from "react-icons/ai";
import { FaRegStopCircle } from "react-icons/fa";
import Markdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import userImage from "../assets/vivek.jpeg";
import botImage from "../assets/bot.webp";
import bg from "../assets/bg.png";
import TypingIndicator from "./TypingIndicator";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { URL } from "../url.js";

const SpeechChatSection = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [extractedText, setExtractedText] = useState("");

  const { user } = useContext(AuthContext);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${URL}/resume/${user._id}`);

        setExtractedText(res.data.message.extractedText);
      } catch (error) {
        console.log();
      }
    };

    getData();
  }, [user._id]);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyAVnhpfvFnkPKzOggBYSEPJMQ9KW-LVbXQ"
  );

  const { transcript, resetTranscript } = useSpeechRecognition();
  const { speak, speaking, supported } = useSpeechSynthesis();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
      handleVoiceSubmit();
    } else {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: "user", message: inputValue },
      ]);
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleVoiceSubmit = () => {
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: transcript },
    ]);
    sendMessage(transcript);
    resetTranscript();
  };

  const sendMessage = async (message) => {
    try {
      setIsLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `You are an interviewer conducting a technical and managerial interview based on the provided resume. Below is the user's resume. Your task is to formulate questions based on the user's resume, both technical and managerial, reflecting the content and skills mentioned. You should ask one question at a time and wait for the user's response before proceeding to the next question. Throughout the interaction, maintain a professional and courteous tone. Ensure the questions are relevant to the user's experience and skills as detailed in the resume, focusing on key areas such as technical skills, project experiences, managerial abilities, and any other pertinent information. Based on the user's answers, adapt your follow-up questions to dive deeper into their knowledge and experience. Avoid asking the same or very similar questions multiple times, ensuring each question adds value to the interview process. Do not explicitly mention "Technical Questions" or "Managerial Questions" in your questions. The questions should naturally flow based on the resume content and the user's responses. Do not stick to ask questions on only projects. "ask five question, one at a time". Here is user's resume "${extractedText}"`,
              },
            ],
          },
          {
            role: "model",
            parts: [{ text: message }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 300,
        },
      });

      const res = await chat.sendMessage(message);
      const botResponse = res.response.candidates[0].content.parts[0].text;

      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: "bot", message: botResponse },
      ]);

      if (supported && !speaking) {
        speak({ text: botResponse });
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
      console.error(err);
    }
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const handleToggleListening = () => {
    setIsListening(!isListening);

    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-grow flex flex-col bg-white">
        <div className="flex-grow flex flex-col">
          <div className="bg-white overflow-hidden shadow-lg flex-grow flex flex-col">
            <div className="px-4 py-4 shadow-md flex items-center justify-between">
              <p className="text-xl font-bold">AI Speech Interviewer</p>
            </div>
            <div
              ref={chatContainerRef}
              className="py-4 px-4 flex-grow overflow-y-auto"
              style={{
                maxHeight: "calc(100vh - 140px)",
                backgroundImage: `url(${bg})`,
              }}
            >
              {chatLog.map((data, i) => (
                <div
                  key={i}
                  className={`flex ${
                    data.type === "user" ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  {data.type !== "user" && (
                    <img src={botImage} alt="bot-image" className="w-10 h-10" />
                  )}
                  <div
                    className={`${
                      data.type === "user"
                        ? "bg-teal-500 text-white rounded-l-lg rounded-br-lg"
                        : "bg-gray-200 rounded-r-lg rounded-bl-lg"
                    } p-2 max-w-xs break-words`}
                  >
                    <Markdown>{data.message}</Markdown>
                  </div>
                  {data.type === "user" && (
                    <img
                      src={userImage}
                      alt="user-image"
                      className="w-8 h-8 ml-1 rounded-full"
                    />
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center justify-start mb-2">
                  <img src={botImage} alt="bot-image" className="w-10 h-10" />
                  <TypingIndicator />
                </div>
              )}
            </div>
            <div
              className="p-2 px-32"
              style={{
                backgroundImage: `url(${bg})`,
              }}
            >
              <div className="flex rounded-full border shadow-xl bg-gray-200">
                <input
                  className="flex-grow px-4 py-2 bg-transparent text-md focus:outline-none cursor-not-allowed"
                  type="text"
                  placeholder="Type your message..."
                  value={isListening ? transcript : inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={true}
                />
                <button
                  className="bg-teal-500 rounded-full px-3 py-3 m-2 text-white font-semibold focus:outline-none hover:bg-teal-600 transition-colors duration-300"
                  type="button"
                  onClick={isListening ? handleSubmit : handleToggleListening}
                >
                  {isListening ? (
                    <FaRegStopCircle className="text-xl" />
                  ) : (
                    <AiOutlineAudio className="text-xl" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechChatSection;
