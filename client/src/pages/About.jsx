import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const About = () => {
  return (
    <div>
      <Navbar />

      <div className="h-screen bg-gray-100 flex items-center justify-center -mt-10 -mb-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            About Us
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Welcome to our innovative interview preparation platform! Our
            website allows users to upload their resumes and engage in
            interactive interviews conducted by a bot. The bot is designed to
            ask relevant questions based on the resume provided, offering both
            text-to-text and speech-to-speech interview options. Our goal is to
            provide a realistic and practical interview experience, helping you
            to refine your skills and boost your confidence.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Whether you're a job seeker looking to practice or a professional
            aiming to improve your interviewing techniques, our platform offers
            a comprehensive solution. Join us and take your interview
            preparation to the next level.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About