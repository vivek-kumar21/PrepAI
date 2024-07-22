import { GiArtificialIntelligence } from "react-icons/gi";
import { MdFeedback } from "react-icons/md";
import { FaBrain } from "react-icons/fa";
import { MdOutlineInterpreterMode } from "react-icons/md";

const WhyChooseUs = () => {
  return (
    <section className="">
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl text-teal-600 font-extrabold mx-auto md:text-6xl lg:text-5xl">
              Why choose us!
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-base text-gray-400 leading-relaxed md:text-2xl">
              Our AI interview solution will help you analyze your interview
              skills
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500">
                    <GiArtificialIntelligence className="text-5xl" />
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    Cutting-Edge AI Technology
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Our platform leverages state-of-the-art AI technology to
                  provide personalized interview experiences. The AI analyzes
                  your resume in-depth, ensuring that each question is relevant
                  to your skills and experiences.
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500">
                    <MdOutlineInterpreterMode className="text-5xl" />
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    Two Modes of Interview
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {" "}
                  We offer two modes of interview to cater to your preferences:
                  <br />
                  1. Text-to-Text <br />
                  2. Speech-to-Speech
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 ">
                    <MdFeedback className="text-5xl" />
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    Personalized Feedback
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {" "}
                  Receive instant, detailed feedback on your responses. Our AI
                  evaluates your answers and provides constructive insights to
                  help you improve and prepare effectively for real interviews.
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500">
                    <FaBrain className="text-5xl" />
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    Improve Your Skills
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {" "}
                  Our platform is designed to help you enhance your interview
                  skills, including articulation, clarity, and coherence. Use
                  our AI’s feedback to identify areas for improvement and track
                  your progress over time.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
