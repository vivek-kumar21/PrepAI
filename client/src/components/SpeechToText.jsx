import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";

const SpeechToText = () => {
    const [textToCopy, setTextToCopy] = useState("");
    const [isCopied, setCopied] = useClipboard(textToCopy);

  const startListening = SpeechRecognition.startListening({
    continuous: true,
    language: "en-IN",
  });
  const stopListening = SpeechRecognition.stopListening;
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) return null;

  return (
    <div>
      <div onClick={() => setTextToCopy(transcript)}>{transcript}</div>
      <div>
        <button onClick={setCopied}>
          {isCopied ? "Copied!" : "Copy to clipboard"}
        </button>
        <button onClick={() => startListening}>Start Listening</button>
        <button onClick={() => stopListening}>Stop Listening</button>
      </div>
    </div>
  );
};

export default SpeechToText;
