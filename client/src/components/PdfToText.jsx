import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.min";
import { useNavigate } from "react-router-dom";
import FilePreview from "./FilePreview";
import bg from "../assets/home-bg.png";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { URL } from "../url.js";

const PdfToText = () => {
  const [pdfInput, setPdfInput] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // console.log(user._id);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

    if (file && file.type === "application/pdf") {
      setPdfInput(file);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handleUpload = async () => {
    if (!pdfInput) {
      alert("Please select a PDF file.");
      return;
    }

    const arrayBuffer = await pdfInput.arrayBuffer();
    try {
      setLoading(true);

      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      let extractedText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const textItems = textContent.items.map((item) => item.str);
        extractedText += textItems.join(" ") + "\n";
      }

      setLoading(false);
      setExtractedText(extractedText.trim());
      // redirectToChat();
    } catch (error) {
      setLoading(false);
      alert("Error while processing PDF:", error.message);
    }
  };

  const uploadResume = async () => {
    try {
      const res = await axios.post(`${URL}/resume/${user._id}`, {
        extractedText: extractedText,
      });
      // console.log(res); 

      navigate("/chat/text-chat");
    } catch (error) {
      console.log(error);
    }
  };

  // const redirectToChat = () => {
  //   navigate("/chat/text-chat", { state: { extractedText: extractedText } });
  // };

  return (
    <>
      <div
        className="min-h-screen flex flex-col justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="md:mx-56 mx-6 -mt-20 sm:rounded-lg bg-opacity-80 p-8">
          <div className="mb-4">
            <h3 className="text-3xl font-bold text-center mb-4">
              Upload your <strong className="text-teal-600">resume</strong> and
              start <strong className="text-teal-600">interview</strong>.
            </h3>

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-teal-300 border-dashed rounded-lg cursor-pointer bg-teal-50 hover:bg-teal-100 dark:border-teal-600 dark:hover:border-teal-500"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-teal-500 dark:text-teal-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 md:text-2xl text-md text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or{" "}
                    <strong className="text-teal-500">drag</strong> and{" "}
                    <strong className="text-teal-500">drop</strong>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF (Max Size: 5MB)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  onChange={handleFileChange}
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {file ? (
            <FilePreview file={file} removeFile={() => setFile(null)} />
          ) : null}

          <div className="text-center">
            <button
              onClick={extractedText ? uploadResume : handleUpload}
              className="group relative inline-flex items-center overflow-hidden mt-4 rounded bg-teal-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-teal-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
              disabled={!file}
            >
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                  className="size-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>

              <span className="text-sm font-medium transition-all group-hover:me-4">
                {extractedText ? "Start Interview" : "Upload Resume"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfToText;
