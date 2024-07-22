import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import Navbar from "./Navbar";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const { speak, cancel, speaking, supported } = useSpeechSynthesis();

  const handleSpeak = () => {
    if (supported) {
      speak({ text });
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };

  const handleCancel = () => {
    cancel();
  };

  return (
    <>
      <Navbar />

      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Text to Speech</h1>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="block w-full text-sm py-2 px-3 border border-gray-300 rounded-lg cursor-text bg-gray-50 focus:outline-none focus:border-blue-500"
          rows={4}
          placeholder="Enter text to speak..."
        ></textarea>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSpeak}
            className={`bg-blue-500 text-white py-2 px-4 rounded-lg mr-2 focus:outline-none ${
              speaking ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={speaking || !supported}
          >
            Speak
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none"
            disabled={!speaking}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default TextToSpeech;
