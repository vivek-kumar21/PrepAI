import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Report = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
        <div className="flex-grow container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="w-full md:w-56 h-52 mx-auto bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <CircularProgressbar value={45} text={"45/100"} />
              <p className="mt-4 text-center font-semibold">
                Vocabulary
              </p>
            </div>
            <div className="w-full md:w-56 h-52 mx-auto bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <CircularProgressbar value={45} text={"45/100"} />
              <p className="mt-4 text-center font-semibold">
                Technical Knowledge
              </p>
            </div>
            <div className="w-full md:w-56 h-52 mx-auto bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <CircularProgressbar value={45} text={"45/100"} />
              <p className="mt-4 text-center font-semibold">
                Problem-Solving Ability
              </p>
            </div>
            <div className="w-full md:w-56 h-52 mx-auto bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <CircularProgressbar value={45} text={"45/100"} />
              <p className="mt-4 text-center font-semibold">
                Behavioral Competencies
              </p>
            </div>
          </div>
          {/* Additional content like bar graphs can be added here */}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Report;
