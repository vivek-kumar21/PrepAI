import { useState, useEffect, useRef, useContext } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-markdown";
import { FaRegPaperPlane } from "react-icons/fa";
import bot from "../assets/bot.webp";
import bg from "../assets/bg.png";
import TypingIndicator from "./TypingIndicator";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { URL } from "../url.js";

const TextChatSection = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [userResponses, setUserResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [report, setReport] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  // const [maxQuestions, setMaxQuestions] = useState(
  //   Math.floor(Math.random() * 11) + 20
  // );

  const maxQuestions = Math.floor(Math.random() * 11) + 20;
  // const maxQuestions = 2;

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);

    setUserResponses((prevResponses) => [
      ...prevResponses,
      { message: inputValue },
    ]);

    sendMessage(inputValue);

    setInputValue("");
  };

  const sendMessage = async (input) => {
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
            parts: [{ text: input }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 300,
        },
      });

      const res = await chat.sendMessage(input);
      const botResponse = res.response.candidates[0].content.parts[0].text;

      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: "bot", message: botResponse },
      ]);

      setIsLoading(false);

      setQuestionCount((prevCount) => prevCount + 1);

      if (questionCount + 1 >= maxQuestions) {
        endInterview();
      }
    } catch (err) {
      setIsLoading(false);
      setError(true);
      console.error(err);
    }
  };

  const generateReport = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `Generate a report evaluating the following user responses. Provide feedback on areas for improvement and give a score out of 100. Responses: ${userResponses
                  .map((response, index) => `${index + 1}. ${response.message}`)
                  .join("\n")}`,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      const res = await chat.sendMessage("");
      const reportResponse = res.response.candidates[0].content.parts[0].text;

      setReport(reportResponse);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const endInterview = () => {
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      {
        type: "bot",
        message:
          "Thank you for participating in the interview. We will review your responses and get back to you soon.",
      },
    ]);
    setInterviewEnded(true);
    generateReport();
  };

  return (
    <div className="flex h-screen">
      <div className="flex-grow flex flex-col">
        <div className="flex-grow flex flex-col">
          <div className="bg-white overflow-hidden shadow-lg flex-grow flex flex-col">
            <div className="px-3 py-[10px] shadow-xl flex items-center justify-between">
              <p className="text-xl font-bold">AI Chat Interviewer</p>
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
                    <img src={bot} alt="bot-image" className="w-10 h-10" />
                  )}
                  <div
                    className={`${
                      data.type === "user"
                        ? "bg-teal-500 text-white rounded-l-lg rounded-br-lg"
                        : "bg-gray-100 rounded-r-lg rounded-bl-lg"
                    } p-2 max-w-xs break-words`}
                  >
                    <Markdown>{data.message}</Markdown>
                  </div>
                  {data.type === "user" && (
                    <div className="rounded-full bg-gray-300 text-gray-800 w-9 h-9 flex items-center justify-center border-2 ml-1">
                      {user && user.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center justify-start mb-2">
                  <img src={bot} alt="bot-image" className="w-10 h-10" />
                  <TypingIndicator />
                </div>
              )}
              {interviewEnded && report && (
                <div className="mt-4 p-4 bg-gray-200 rounded-lg">
                  <h3 className="text-lg font-bold">Performance Report</h3>
                  <Markdown>{report}</Markdown>
                </div>
              )}
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-2 px-32"
              style={{
                backgroundImage: `url(${bg})`,
              }}
            >
              <div className="flex rounded-full border shadow-xl bg-gray-200">
                <input
                  className="flex-grow px-4 py-2 bg-transparent text-md focus:outline-none"
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={interviewEnded}
                />
                <button
                  className="bg-teal-500 rounded-full px-3 py-3 m-2 text-white font-semibold focus:outline-none hover:bg-teal-600 transition-colors duration-300"
                  type="submit"
                  disabled={!inputValue.trim() || interviewEnded}
                >
                  <FaRegPaperPlane />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextChatSection;
