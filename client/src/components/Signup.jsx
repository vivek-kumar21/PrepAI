import image from "../assets/login-bg.jpg";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useContext, useState } from "react";
import { URL } from "../url";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import Loading from "./Loading";

const Signup = ({ toggleSignup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { setIsAuth } = useContext(AuthContext);

  const handleSignup = async () => {
    setIsLoading(true);

    // const formData = new FormData();
    // formData.append("username", username);
    // formData.append("email", email);
    // formData.append("password", password);

    const data = {
        username, 
        email,
        password
    }

    try {
      const res = await axios.post(`${URL}/api/users/signup`, data, {
        withCredentials: true,
      });
      // console.log(res);

      setIsAuth(true);
      setIsLoading(false);

      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ease-in-out">
      <div className="relative w-full max-w-[400px] h-[85vh] rounded-l-xl overflow-hidden  flex flex-col">
        <img
          src={image}
          className="w-full h-full object-cover"
          alt="Login Background"
        />
      </div>
      <div className="w-full max-w-[400px] h-[85vh] rounded-r-xl bg-gray-100 flex flex-col items-center justify-between p-6 md:p-12 relative">
        <IoClose
          onClick={toggleSignup}
          className="absolute top-3 right-3 text-3xl md:text-4xl cursor-pointer"
        />
        <div className="w-full flex flex-col max-w-[400px]">
          <div className="w-full flex flex-col mb-1">
            <h3 className="text-2xl md:text-3xl font-semibold mb-1 md:mb-2">
              Sign Up
            </h3>
            {/* <p className="text-base mb-2">
              Please fill in your details to create an account
            </p> */}
          </div>

          <div className="w-full flex flex-col mb-1">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="username"
              placeholder="Username"
              className="w-full py-2 md:py-3 px-3 mb-2 md:mb-3 bg-gray-100 border border-gray-200 rounded-lg outline-none focus:outline-none text-sm md:text-base"
            />

            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full py-2 md:py-3 px-3 mb-2 md:mb-3 bg-gray-100 border border-gray-200 rounded-lg outline-none focus:outline-none text-sm md:text-base"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full py-2 md:py-3 px-3 mb-2 md:mb-3 bg-gray-100 border border-gray-200 rounded-lg outline-none focus:outline-none text-sm md:text-base"
            />
          </div>

          {error && <p className="text-sm text-red-500 -mt-3">{error}</p>}

          <div className="w-full flex items-center justify-end mb-3">
            <p className="text-xs md:text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
              Forget Password
            </p>
          </div>

          <div className="w-full flex flex-col mb-2">
            <button
              onClick={handleSignup}
              className="w-full py-1 md:py-2 px-3 text-white mb-2 md:mb-3 border bg-[#060606] hover:bg-white hover:text-black hover:border-black hover:border duration-300 rounded-md text-center flex items-center justify-center cursor-pointer text-sm md:text-base"
            >
              {isLoading ? <Loading /> : <p>Sign Up</p>}
            </button>
          </div>

          <div className="w-full flex items-center justify-center mb-5">
            <div className="w-full h-[1px] bg-black/40"></div>
            <p className="text-xs md:text-lg absolute text-black/80 bg-gray-100">
              or
            </p>
          </div>

          <div className="w-full text-[#060606] mb-3 font-semibold bg-white border border-black/40 rounded-md py-1 md:py-2 px-3 text-center flex items-center justify-center cursor-pointer text-sm md:text-base">
            <FcGoogle className="text-lg md:text-2xl mr-2" />
            Sign Up With Google
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-xs md:text-sm font-normal text-[#060606]">
            Already have an account?{" "}
            <Link
              to={"/register"}
              className="font-semibold underline underline-offset-2 cursor-pointer"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
